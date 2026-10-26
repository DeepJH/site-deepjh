# 0006 Static Bilingual Routing and Digital Garden Syndication

## Context and Decision
The engineering platform must cater to both global and domestic audiences while keeping the editorial and maintenance footprint lean. We decided to implement **Static Pre-rendered Bilingual Routes (`/` for default English and `/zh/` for Chinese)** powered by Astro's zero-runtime routing and an instant capsule language switcher in the header. Content-wise, rather than maintaining sprawling mock posts, we consolidate technical writing into a single flagship reflection with prominent syndication links to DeepJH's external **Digital Garden (`DeepJH/text-note`)**, while curating exactly 4 flagship projects (`aitopschool-downloader`, `good-bye-othello`, `brief-clock`, `State_Tuning_Tutorial_For_RWKV`) in a balanced 2x2 grid. All avatar representations replace prior abstract blue dots, and the homepage title is canonically established as `Hello, Im DeepJH.`.

## Status
Accepted

## Considered Options
- **Heavy Client-Side i18n Libraries (i18next / react-intl)**: Adds client hydration, runtime dictionary downloads, and potential translation flicker.
- **Single Monolingual Site**: Limits international or local audience reach and accessibility.
- **Static Pre-rendered Bilingual Routes with External Digital Garden Syndication**: Zero client JS runtime, instantaneous navigation, search engine indexable, and seamlessly channels readers into live notebooks on GitHub.
