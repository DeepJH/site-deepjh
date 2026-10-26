---
title: "Demystifying io_uring for High-Throughput Storage Engines"
description: "A deep dive into asynchronous disk I/O, submission/completion rings, memory barriers, and building non-blocking storage in Rust."
publishDate: 2026-05-18
tags:
  - Rust
  - Linux
  - Storage
  - io_uring
  - Concurrency
draft: false
readingTime: "15 min read"
---

## Why POSIX AIO and Threads Fall Short

For decades, systems engineers attempting high-concurrency disk I/O on Linux were forced into a painful trade-off:

1. **Thread Pools (`pwrite` / `fsync`)**: High context-switching overhead, memory usage from large thread stacks, and thread scheduler contention under thousands of concurrent I/O operations.
2. **POSIX AIO (`aio_read` / `aio_write`)**: Historically infamous for silently degrading into blocking kernel threads whenever file metadata updates or filesystem journaling were involved.
3. **Linux `io_submit` (`libaio`)**: Only functioned asynchronously with `O_DIRECT`, did not support buffered I/O, and required two syscalls (`io_submit` and `io_getevents`) per batch.

Enter **`io_uring`**, introduced by Jens Axboe in Linux 5.1.

## The Dual-Ring Architecture

At the heart of `io_uring` are two lock-free ring buffers shared directly between user space and the kernel:

- **Submission Queue (SQ)**: The application produces Submission Queue Entries (SQEs) describing operations to execute (reads, writes, fsync, splice).
- **Completion Queue (CQ)**: The kernel produces Completion Queue Entries (CQEs) indicating operation results and error statuses.

Because these ring buffers reside in shared memory established via `mmap(2)`, enqueueing requests and collecting completions requires **zero system calls** in polling mode (`IORING_SETUP_SQPOLL`).

```rust
use io_uring::{opcode, IoUring};
use std::fs::File;
use std::os::unix::io::AsRawFd;

fn submit_async_write(ring: &mut IoUring, file: &File, buf: &[u8], offset: u64) -> Result<(), Box<dyn std::error::Error>> {
    let fd = io_uring::types::Fd(file.as_raw_fd());
    let write_op = opcode::Write::new(fd, buf.as_ptr(), buf.len() as u32)
        .offset(offset)
        .build()
        .user_data(0x42);

    unsafe {
        ring.submission()
            .push(&write_op)
            .map_err(|_| "Submission queue is full")?;
    }

    ring.submit()?;
    Ok(())
}
```

## Eliminating `fsync` Tail Latency

By chaining an `IORING_OP_FSYNC` entry with the `IOSQE_IO_LINK` flag, an application instructs the kernel to execute `fsync` strictly after the preceding write completion—without yielding control back to user space in between.

This eliminates roundtrip latency jitter caused by thread wake-ups and CPU scheduler preemption.

## Key Operational Guidelines

- **Buffer Registration (`IORING_REGISTER_BUFFERS`)**: Pin memory pages up front to eliminate kernel page-table lookups on every I/O transaction.
- **Fixed File Descriptors (`IORING_REGISTER_FILES`)**: Pre-register file descriptors to avoid `fget()` atomic reference count bumps in the kernel VFS layer.
- **Graceful Error Recovery**: Always check the `cqe.result` code. A negative integer indicates an inverted `-errno` (e.g. `-EAGAIN`, `-ENOSPC`).
