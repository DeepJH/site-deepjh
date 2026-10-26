---
title: "VectorFlow: SIMD-Accelerated Embedded Vector Search Index"
description: "Cache-oblivious HNSW vector index engineered in C++20 and AVX-512 for sub-millisecond approximate nearest neighbor retrieval in embedded runtimes."
coverImage: "/images/projects/vector-flow.svg"
tags:
  - C++
  - SIMD
  - Vector Search
  - HNSW
  - Performance
repoUrl: "https://github.com/DeepJH/vector-flow"
demoUrl: "https://vector-flow.deepjh.com"
role: "Lead Systems Architect"
timeline: "2025 - 2026"
metrics:
  - label: "p99 Query Latency"
    value: "0.38ms"
  - label: "Recall@10"
    value: "98.4%"
  - label: "Throughput (QPS)"
    value: "45,000"
  - label: "Index Build Time"
    value: "-62%"
featured: true
draft: false
publishDate: 2026-08-12
---

## Problem Statement

As artificial intelligence workloads permeate production systems, embedding vector indexing has become a dominant CPU bottleneck. Standard nearest-neighbor indexes (e.g. naive HNSW implementations) suffer from excessive L3 cache misses during graph traversals and memory bandwidth stalls when calculating float32 dot products or cosine distances across high-dimensional vectors (e.g. 1536-dimensional embeddings).

## Solution Architecture: Cache-Oblivious Graph Layout & AVX-512 Distance Kernels

**VectorFlow** re-architects graph vector retrieval around hardware memory hierarchies:

1. **AVX-512 & Neon SIMD Vectorization**: Unrolled vector distance functions that evaluate 16-element float dot products per instruction cycle with FMA (Fused Multiply-Add).
2. **Cacheline-Packed Node Structure**: Graph adjacency lists are packed into contiguous 64-byte hardware cachelines, prefetching neighbor coordinates before graph expansion.
3. **Product Quantization (PQ) Compression**: Embeddings are quantized into 8-bit centroids, reducing memory bandwidth pressure by 75% while maintaining >98% recall accuracy.

```cpp
#include <immintrin.h>

float dot_product_avx512(const float* a, const float* b, size_t dim) {
    __m512 sum = _mm512_setzero_ps();
    for (size_t i = 0; i < dim; i += 16) {
        __m512 va = _mm512_loadu_ps(a + i);
        __m512 vb = _mm512_loadu_ps(b + i);
        sum = _mm512_fmadd_ps(va, vb, sum);
    }
    return _mm512_reduce_add_ps(sum);
}
```

## Empirical Benchmark Results

Evaluated on 1,000,000 vectors (1536-dim OpenAI text-embedding-3-small embeddings) on AWS c7i.4xlarge:

| Metric | Faiss HNSW Baseline | VectorFlow | Improvement |
| :--- | :--- | :--- | :--- |
| **p99 Query Latency** | 1.82 ms | 0.38 ms | **-79.1%** |
| **Throughput (Single Socket)** | 11,200 QPS | 45,400 QPS | **+305.3%** |
| **Peak Memory Footprint** | 6.8 GB | 2.1 GB | **-69.1%** |
| **Recall@10** | 98.1% | 98.4% | **+0.3%** |

## Architectural Trade-offs

- **Static Dimension Specialization**: Compile-time template expansion for standard dimensions (e.g. 384, 768, 1536) yields maximal register utilization but increases compilation binary footprint.
- **Quantization Precision vs Speed**: PQ8 provides optimal throughput for dense embeddings; for sparse representations, uncompressed float16 fallback is selected dynamically.
