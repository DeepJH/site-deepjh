---
title: "good-bye-othello: High-Performance AI Game Engine"
description: "A fast, deterministic Othello/Reversi AI engine powered by 64-bit bitboard representations, Negascout tree search, dynamic move ordering, and heuristic pattern tables."
tags:
  - Game Theory
  - Bitboards
  - Alpha-Beta Search
  - Negascout
  - Performance Engineering
repoUrl: "https://github.com/DeepJH/good-bye-othello"
role: "Engine Architect & Algorithm Developer"
timeline: "2024"
metrics:
  - label: "Search Depth"
    value: "18+ Plies"
  - label: "Throughput"
    value: "1.2M nodes/s"
  - label: "Bitboard Ops"
    value: "Single-Cycle"
  - label: "Win Rate"
    value: "96.4%"
featured: true
publishDate: 2024-08-20
---

## Game Theoretical Challenges

In Reversi/Othello, game-tree complexity reaches approximately $10^{28}$ distinct states. Computing optimal moves in sub-second tournament limits requires drastic tree pruning and cache-friendly evaluation routines.

Naive 2D array matrix representations incur heavy memory traversal overhead and branching penalties during validity checks. **good-bye-othello** tackles these computational bottlenecks by encoding the entire 8×8 board state into dual 64-bit unsigned integers (`uint64_t`).

---

## Engine Architecture

```
 ┌────────────────────────────────────────────────────────┐
 │            Bitboard Board State Representation          │
 │       player_bits: uint64      opponent_bits: uint64   │
 └───────────────────────────┬────────────────────────────┘
                             │
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │           Parallel Ray-Casting Legal Move Gen           │
 │       Shift Operations in 8 Cardinal Directions        │
 └───────────────────────────┬────────────────────────────┘
                             │
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │           Negascout Search with Transposition Table    │
 │       - Principal Variation Search (PVS)               │
 │       - History Heuristic & Move Ordering              │
 │       - Quiescence Search at Leaf Nodes                │
 └───────────────────────────┬────────────────────────────┘
                             │
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │         Pattern Heuristic & Mobility Evaluation         │
 │     Corner Stability + Frontier Discs + Parity Tables  │
 └────────────────────────────────────────────────────────┘
```

1. **Bitboard Parallelism**: Computes flips and legal candidate moves across all 8 cardinal directions simultaneously via SIMD-like bit shift masks.
2. **Negascout & PVS**: Employs narrow-window alpha-beta search (`[α, α+1]`) to prove non-optimal branches rapidly, achieving up to a 60% reduction in evaluated nodes.
3. **Dynamic Transposition Table**: Zobrist hashing indexes evaluated subtrees to prevent recalculating symmetrical positions.
4. **Endgame Exact Solver**: Switches dynamically to exhaustive minimax depth search in the final 14-16 plies for absolute precision.
