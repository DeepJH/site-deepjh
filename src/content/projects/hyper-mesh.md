---
title: "HyperMesh: Zero-Copy eBPF Service Mesh Data Plane"
description: "High-throughput sidecarless network proxy leveraging Linux eBPF sockops to bypass kernel TCP stacks for intra-node microservice communications."
coverImage: "/images/projects/hyper-mesh.svg"
tags:
  - eBPF
  - C
  - Kubernetes
  - Networking
  - Linux Kernel
repoUrl: "https://github.com/DeepJH/hyper-mesh"
role: "Kernel Network Engineer"
timeline: "2026"
metrics:
  - label: "Latency Overhead"
    value: "-68% vs Envoy"
  - label: "Intra-Host Throughput"
    value: "82 Gbps"
  - label: "CPU Utilization"
    value: "-45%"
featured: true
publishDate: 2026-06-20
---

## Problem Statement

Traditional microservice mesh proxies (such as Envoy and Istio sidecars) inject significant network and latency penalties. For services co-located on the same Kubernetes worker node, traffic traverses the TCP network stack twice: once from the source container to the sidecar, and once across loopback to the target container.

Each hop involves:
- Socket buffer allocation and copying (`sk_buff`)
- TCP sequence tracking and ACK handshake overhead
- Repeated user-space / kernel-space context switching

## Solution: Kernel Socket Redirection via `BPF_PROG_TYPE_SOCK_OPS`

**HyperMesh** hooks into Linux kernel socket operations using eBPF programs attached to `cgroup2` hierarchies. By intercepting TCP handshake events (`BPF_SOCK_OPS_ACTIVE_ESTABLISHED_CB`), HyperMesh extracts socket cookies and populates a high-performance BPF `SOCKHASH` map.

When packets flow between local containers, a `sk_msg` program short-circuits the entire TCP stack, redirecting payloads directly into the destination socket's receive buffer via `bpf_msg_redirect_hash`.

```c
SEC("sk_msg")
int bpf_tcp_redirect(struct sk_msg_md *msg)
{
    struct sock_key key = {};
    extract_key_from_msg(msg, &key);

    /* Direct zero-copy shortcut to peer socket queue */
    return bpf_msg_redirect_hash(msg, &sock_map, &key, BPF_F_INGRESS);
}
```

## Quantified Performance Results

Evaluated across high-concurrency gRPC microservice pipelines sending 4KB payloads on Linux kernel 6.8:

| Metric | Traditional Envoy Sidecar | HyperMesh eBPF Data Plane | Delta |
| :--- | :--- | :--- | :--- |
| **Roundtrip Latency (p50)** | 1.84 ms | 0.58 ms | **-68.5%** |
| **Roundtrip Latency (p99)** | 7.21 ms | 2.12 ms | **-70.6%** |
| **Data Throughput** | 26.4 Gbps | 82.1 Gbps | **+210.9%** |
| **Node CPU Cost** | 18.2 cores | 9.9 cores | **-45.6%** |

## Key Architectural Insights

- **Zero Envoy Pods**: Eliminating sidecar containers saves up to 120MB memory per microservice replica.
- **Graceful Connection Fallback**: When communication traverses inter-node boundaries, packets smoothly fall back to wire encryption without crashing active connection streams.
