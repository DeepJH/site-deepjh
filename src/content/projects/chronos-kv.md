---
title: "ChronosKV: Low-Latency Distributed LSM-Tree Storage Engine"
description: "A crash-resilient distributed key-value store engineered in Rust with custom io_uring WAL logging, lock-free memtable skips, and Raft consensus."
coverImage: "/images/projects/chronos-kv.png"
tags:
  - Rust
  - Distributed Systems
  - Storage Engine
  - io_uring
  - Raft
repoUrl: "https://github.com/DeepJH/chronos-kv"
demoUrl: "https://chronos-bench.deepjh.com"
role: "Storage Engine Architect"
timeline: "2025 - 2026"
metrics:
  - label: "p99 Write Latency"
    value: "< 1.2ms"
  - label: "Write Throughput"
    value: "380k ops/s"
  - label: "Memory Footprint"
    value: "42MB Base"
  - label: "Recovery Time"
    value: "< 180ms"
featured: true
publishDate: 2026-03-15
---

## Architectural Objectives & Bottlenecks

Traditional embedded storage engines such as RocksDB and LevelDB provide exceptional general-purpose storage primitives, but their reliance on standard POSIX filesystem calls (`pwrite` / `fsync`) introduces severe latency spikes under high write pressure due to kernel context switches and page cache locks.

In designing **ChronosKV**, the primary design constraints were:
1. **Sub-millisecond p99 write latency** under concurrent 100,000 IOPS write bursts.
2. **Deterministic crash consistency** guaranteeing zero journal corruption without redundant double-write overhead.
3. **Linear horizontal scale** utilizing pipelined Raft log replication over zero-copy TCP buffers.

```
       +-------------------------------------------------+
       |               Client Requests (gRPC)            |
       +-------------------------------------------------+
                                |
                                v
       +-------------------------------------------------+
       |            Lock-Free MemTable (SkipList)        |
       +-------------------------------------------------+
               |                                 |
        (Async Append)                     (Flush Buffer)
               v                                 v
   +-----------------------+           +--------------------+
   |   io_uring Async WAL  |           | L0 SSTable Builder |
   |  (Ring Buffer Write)  |           | (Block Compression)|
   +-----------------------+           +--------------------+
```

## System Implementation Details

### Lock-Free MemTable & Crossbeam Epoch Reclamation
Instead of guarding the in-memory write buffer with reader-writer mutexes, ChronosKV incorporates an epoch-based lock-free skiplist. Reader threads execute reads with non-blocking atomics while background flush workers atomically snapshot immutable references without stalling concurrent write pipelines.

```rust
pub struct MemTable<K: Ord + Clone, V: Clone> {
    skiplist: Arc<SkipList<K, V>>,
    size_bytes: AtomicUsize,
    epoch_guard: Guard,
}

impl<K: Ord + Clone, V: Clone> MemTable<K, V> {
    pub fn insert(&self, key: K, val: V, size_delta: usize) -> Result<(), StorageError> {
        self.skiplist.insert(key, val);
        self.size_bytes.fetch_add(size_delta, Ordering::Relaxed);
        Ok(())
    }
}
```

### Direct Linux `io_uring` Asynchronous Write-Ahead Log
To eliminate standard blocking `fsync` kernel roundtrips, the Write-Ahead Log operates entirely on `io_uring` submission and completion queues with `O_DIRECT`. Batched transactions submit SQEs (Submission Queue Entries) directly to the storage controller ring buffer, notifying awaiting consensus threads in batches.

## Empirical Benchmark Results

Benchmarked on AMD EPYC 7763 64-Core nodes with NVMe Samsung PM9A3 SSDs over 10GbE network interconnects:

| Metric | RocksDB Baseline | ChronosKV (v1.2) | Improvement |
| :--- | :--- | :--- | :--- |
| **Random Write (p99)** | 4.82 ms | 1.14 ms | **-76.3%** |
| **Sustained Write Throughput** | 125,000 ops/s | 382,000 ops/s | **+205.6%** |
| **Crash Recovery Time** | 3.42 s | 0.17 s | **-95.0%** |
| **Resident Memory** | 185 MB | 42 MB | **-77.3%** |

## Trade-offs and Lessons Learned

1. **Direct I/O Alignment Strictness**: `io_uring` with `O_DIRECT` mandates 4096-byte boundary memory alignment for all write payloads. A custom bump-allocator with aligned block padding was necessary to prevent kernel fallback faults.
2. **Raft Pipeline Batching**: Pipelining Raft entries ahead of local disk sync drastically improved replication throughput, but required careful quorum rollback boundaries on power outage simulation tests.
