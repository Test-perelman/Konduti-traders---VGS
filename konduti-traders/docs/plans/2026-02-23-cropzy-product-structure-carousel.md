# Cropzy Product Structure + 3D Carousel Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace product data with Cropzy's exact 6-category/27-product structure (keeping existing card design), then integrate a 3D carousel on the homepage.

**Architecture:** Data-only swap in `src/types/index.ts` and `src/data/products.ts`. Update one validation list in `ProductGrid.tsx`. Add `3d-carousel.tsx` to `src/components/ui/`, wrap it in `FeaturedCarousel.tsx`, and insert it between `ProductCategories` and `WhyChooseUs` on the homepage.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS v3, Framer Motion (already installed)

---

## No test infrastructure in this project — verification is: `tsc --noEmit` (type check) + `npm run build` (full build). Run from `d:/konduti Traders - Demo - VGS/konduti-traders/`.

---

### Task 1: Update IProduct types

**Files:**
- Modify: `src/types/index.ts`

**Step 1: Replace the category union and ProductCategory type**

Open `src/types/index.ts`. The current `IProduct.category` union is `'fruits' | 'vegetables' | 'exotic' | 'leafy' | 'seasonal'` and `ProductCategory` is `'all' | 'fruits' | ...`.

Replace those two lines with:

```ts
// In IProduct interface — line 6:
category: 'spices-herbs' | 'grains-pulses' | 'nuts-seeds' | 'fruits-vegetables' | 'beverages' | 'dehydrated'

// At bottom of file — line 62:
export type ProductCategory = 'all' | 'spices-herbs' | 'grains-pulses' | 'nuts-seeds' | 'fruits-vegetables' | 'beverages' | 'dehydrated'
```

**Step 2: Type-check**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && npx tsc --noEmit 2>&1 | head -30
```

Expected: errors about `products.ts` still using old slugs (that's fine — next task fixes that). No errors about `types/index.ts` itself.

**Step 3: Commit**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && git add src/types/index.ts && git commit -m "refactor: update IProduct category union to Cropzy 6-category structure"
```

---

### Task 2: Rewrite products.ts with all 27 Cropzy-aligned products

**Files:**
- Modify: `src/data/products.ts`

**Step 1: Replace the entire file content**

```ts
import type { IProduct } from '@/types'

export const products: IProduct[] = [
  // ── Spices & Herbs ───────────────────────────────────────
  {
    id: 'sh-001',
    name: 'Dry Red Chilli',
    slug: 'dry-red-chilli',
    category: 'spices-herbs',
    description: 'Teja, Byadgi, and Guntur varieties sourced from Andhra Pradesh and Karnataka. High SHU, deep red colour, consistent moisture level. Preferred by spice processors, masala manufacturers, and bulk exporters.',
    availability: 'year-round',
    image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 50 kg bag',
    minOrder: '100 kg',
    tags: ['Guntur', 'Spice grade', 'Export quality'],
  },
  {
    id: 'sh-002',
    name: 'Turmeric',
    slug: 'turmeric',
    category: 'spices-herbs',
    description: 'Erode and Salem turmeric fingers and powder — India\'s highest-curcumin varieties. Vibrant colour, low moisture, ideal for pharmaceutical, food processing, and nutraceutical buyers.',
    availability: 'seasonal',
    season: 'Jan – Mar',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 50 kg bag',
    minOrder: '100 kg',
    tags: ['Erode', 'High curcumin', 'Pharma grade'],
  },
  {
    id: 'sh-003',
    name: 'Cumin',
    slug: 'cumin',
    category: 'spices-herbs',
    description: 'Rajasthan and Gujarat cumin (jeera) — machine-cleaned, bold seed size. Consistent volatile oil content, low foreign matter. Supplied to spice brands, food manufacturers, and HoReCa processors.',
    availability: 'seasonal',
    season: 'Feb – Apr',
    image: 'https://images.unsplash.com/photo-1612363148914-32c8a16b9ee1?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 25 kg bag',
    minOrder: '50 kg',
    tags: ['Rajasthan', 'Bold grade', 'Machine-cleaned'],
  },
  {
    id: 'sh-004',
    name: 'Coriander',
    slug: 'coriander',
    category: 'spices-herbs',
    description: 'Eagle and Badami coriander seeds from Rajasthan and MP. Consistent oil content, low impurity. Available whole or split. Widely used by spice processors, food brands, and Ayurvedic manufacturers.',
    availability: 'seasonal',
    season: 'Feb – May',
    image: 'https://images.unsplash.com/photo-1600320254374-ce2d293c324e?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 50 kg bag',
    minOrder: '100 kg',
    tags: ['Rajasthan', 'Eagle grade', 'Split available'],
  },
  {
    id: 'sh-005',
    name: 'Black Pepper',
    slug: 'black-pepper',
    category: 'spices-herbs',
    description: 'Malabar and Tellicherry black pepper from Kerala. Bold, heavy berries with 4–5% piperine. Sorted and cleaned. Supplied to spice exporters, seasoning manufacturers, and premium food brands.',
    availability: 'seasonal',
    season: 'Nov – Feb',
    image: 'https://images.unsplash.com/photo-1568040158958-8c4bfb4f7e4b?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 25 kg bag',
    minOrder: '25 kg',
    tags: ['Tellicherry', 'Kerala', 'Export grade'],
  },
  {
    id: 'sh-006',
    name: 'Cardamom',
    slug: 'cardamom',
    category: 'spices-herbs',
    description: 'Green cardamom from Idukki, Kerala — India\'s premium cardamom belt. Bold and extra-bold grades. High volatile oil, intense aroma. Ideal for confectionery, masala blends, and premium tea manufacturers.',
    availability: 'seasonal',
    season: 'Sep – Nov',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 10 kg carton',
    minOrder: '10 kg',
    tags: ['Idukki', 'Bold grade', 'Premium aroma'],
  },

  // ── Grains & Pulses ──────────────────────────────────────
  {
    id: 'gp-001',
    name: 'Maize',
    slug: 'maize',
    category: 'grains-pulses',
    description: 'Yellow and white maize from Karnataka, Andhra Pradesh, and Maharashtra. High starch content, low aflatoxin, machine-dried. Supplied to poultry feed manufacturers, starch processors, and food industries.',
    availability: 'seasonal',
    season: 'Oct – Dec',
    image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per MT',
    minOrder: '1 MT',
    tags: ['Karnataka', 'Feed grade', 'Low aflatoxin'],
  },
  {
    id: 'gp-002',
    name: 'Rice',
    slug: 'rice',
    category: 'grains-pulses',
    description: 'Basmati and non-Basmati rice from Punjab, Haryana, and Andhra Pradesh. Multiple grades available: raw, parboiled, sella. Supplied to rice mills, distributors, exporters, and institutional buyers.',
    availability: 'year-round',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 25 kg bag',
    minOrder: '500 kg',
    tags: ['Basmati', 'Punjab', 'Multi-grade'],
  },
  {
    id: 'gp-003',
    name: 'Wheat',
    slug: 'wheat',
    category: 'grains-pulses',
    description: 'Hard red and soft wheat from Madhya Pradesh, Punjab, and Rajasthan. Consistent protein content, low moisture, machine-sorted. Ideal for flour mills, atta brands, bakeries, and commodity traders.',
    availability: 'seasonal',
    season: 'Apr – Jun',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per MT',
    minOrder: '1 MT',
    tags: ['MP', 'Milling grade', 'Low moisture'],
  },
  {
    id: 'gp-004',
    name: 'Millets',
    slug: 'millets',
    category: 'grains-pulses',
    description: 'Pearl millet (bajra), finger millet (ragi), sorghum (jowar), and foxtail millet from Rajasthan and Karnataka. Gluten-free, high fibre. Supplied to health food brands, processors, and nutraceutical companies.',
    availability: 'seasonal',
    season: 'Sep – Nov',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 50 kg bag',
    minOrder: '200 kg',
    tags: ['Rajasthan', 'Gluten-free', 'Health food'],
  },
  {
    id: 'gp-005',
    name: 'Tur Dal',
    slug: 'tur-dal',
    category: 'grains-pulses',
    description: 'Red lentil (tur/arhar) from Maharashtra, Karnataka, and Andhra Pradesh. Bold-sized, machine-polished, consistent split ratio. Supplied to dal mills, FMCG brands, institutional kitchens, and commodity traders.',
    availability: 'seasonal',
    season: 'Nov – Feb',
    image: 'https://images.unsplash.com/photo-1585671775520-6a57d3e90c36?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 50 kg bag',
    minOrder: '500 kg',
    tags: ['Maharashtra', 'Bold grade', 'Machine-polished'],
  },
  {
    id: 'gp-006',
    name: 'Chana Dal',
    slug: 'chana-dal',
    category: 'grains-pulses',
    description: 'Split Bengal gram (chana dal) from Madhya Pradesh and Rajasthan. Uniform split, low moisture, bright yellow colour. Preferred by dal mills, snack manufacturers, flour processors, and HoReCa buyers.',
    availability: 'seasonal',
    season: 'Mar – Jun',
    image: 'https://images.unsplash.com/photo-1599578707499-1d5e3f0cb9a8?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 50 kg bag',
    minOrder: '500 kg',
    tags: ['MP', 'Uniform split', 'Bright yellow'],
  },

  // ── Nuts & Seeds ─────────────────────────────────────────
  {
    id: 'ns-001',
    name: 'Peanuts',
    slug: 'peanuts',
    category: 'nuts-seeds',
    description: 'Bold and Java peanuts from Gujarat and Andhra Pradesh. High oil content (48–52%), low moisture, aflatoxin-tested. Supplied to edible oil mills, peanut butter manufacturers, snack brands, and exporters.',
    availability: 'seasonal',
    season: 'Nov – Feb',
    image: 'https://images.unsplash.com/photo-1567892320421-3b8694dd5ca3?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 50 kg bag',
    minOrder: '500 kg',
    tags: ['Gujarat', 'Bold grade', 'Aflatoxin-tested'],
  },
  {
    id: 'ns-002',
    name: 'Cashew Nuts',
    slug: 'cashew-nuts',
    category: 'nuts-seeds',
    description: 'W180, W240, and W320 cashew grades from Goa, Kerala, and Odisha. Machine-processed, graded by size and colour. Supplied to confectionery brands, premium retailers, exports, and hospitality buyers.',
    availability: 'seasonal',
    season: 'Mar – Jun',
    image: 'https://images.unsplash.com/photo-1598497819201-af22a8e6b10d?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 10 kg carton',
    minOrder: '50 kg',
    tags: ['Goa', 'W240 grade', 'Export quality'],
  },
  {
    id: 'ns-003',
    name: 'Sesame Seeds',
    slug: 'sesame-seeds',
    category: 'nuts-seeds',
    description: 'Natural white, hulled, and black sesame from Gujarat and Rajasthan. High sesamin content, low moisture (≤5%). Supplied to tahini manufacturers, confectionery brands, bakeries, and edible oil processors.',
    availability: 'seasonal',
    season: 'Oct – Dec',
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 25 kg bag',
    minOrder: '100 kg',
    tags: ['Gujarat', 'Hulled available', 'Low moisture'],
  },
  {
    id: 'ns-004',
    name: 'Sunflower Seeds',
    slug: 'sunflower-seeds',
    category: 'nuts-seeds',
    description: 'Confectionery and oil-type sunflower seeds from Karnataka and Andhra Pradesh. Machine-cleaned, graded by size. Supplied to edible oil mills, snack brands, health food manufacturers, and bird feed processors.',
    availability: 'seasonal',
    season: 'Oct – Dec',
    image: 'https://images.unsplash.com/photo-1548094878-84ced0f35b3c?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 50 kg bag',
    minOrder: '200 kg',
    tags: ['Karnataka', 'Oil type', 'Machine-graded'],
  },
  {
    id: 'ns-005',
    name: 'Chia Seeds',
    slug: 'chia-seeds',
    category: 'nuts-seeds',
    description: 'Premium chia seeds with high omega-3 and fibre content. Lab-tested, food-grade, available in black and white varieties. Preferred by health food brands, functional beverage companies, and nutraceutical manufacturers.',
    availability: 'year-round',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 25 kg bag',
    minOrder: '50 kg',
    tags: ['Lab-tested', 'Food grade', 'Health food'],
  },
  {
    id: 'ns-006',
    name: 'Basil Seeds',
    slug: 'basil-seeds',
    category: 'nuts-seeds',
    description: 'Sabja (sweet basil) seeds sourced from Karnataka. High gel-forming capacity, food-safe. Widely used by beverage brands (falooda, sharbat), health drink manufacturers, and nutraceutical processors.',
    availability: 'year-round',
    image: 'https://images.unsplash.com/photo-1618897996318-5a901fa696ca?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 25 kg bag',
    minOrder: '50 kg',
    tags: ['Karnataka', 'Beverage grade', 'Sabja'],
  },

  // ── Fruits & Vegetables ──────────────────────────────────
  {
    id: 'fv-001',
    name: 'Seasonal Fruits',
    slug: 'seasonal-fruits',
    category: 'fruits-vegetables',
    description: 'Curated seasonal fruit procurement across all major Indian growing regions — mangoes, pomegranates, citrus, grapes, and more. Graded and packed to B2B specification. Volume supply contracts available.',
    availability: 'seasonal',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per crate',
    minOrder: '200 kg',
    tags: ['Pan-India', 'Contract supply', 'B2B graded'],
  },
  {
    id: 'fv-002',
    name: 'Imported Fruits',
    slug: 'imported-fruits',
    category: 'fruits-vegetables',
    description: 'Washington apples, South African oranges, Chilean grapes, and other imported fruits. Customs-cleared, cold-chain delivered. Supplied to premium retail chains, luxury hotels, and upscale supermarkets.',
    availability: 'year-round',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per carton',
    minOrder: '100 kg',
    tags: ['Imported', 'Premium retail', 'Cold-chain'],
  },
  {
    id: 'fv-003',
    name: 'Fresh Vegetables',
    slug: 'fresh-vegetables',
    category: 'fruits-vegetables',
    description: 'Full-range fresh vegetable procurement — onions, potatoes, tomatoes, capsicum, leafy greens, and exotics. Farm-direct sourcing, consistent grading. Flexible SKUs for supermarkets, QSRs, and food processors.',
    availability: 'year-round',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per crate',
    minOrder: '200 kg',
    tags: ['Pan-India', 'Year-round', 'Full range'],
  },

  // ── Beverages ────────────────────────────────────────────
  {
    id: 'bv-001',
    name: 'Coffee',
    slug: 'coffee',
    category: 'beverages',
    description: 'Arabica and Robusta green coffee beans from Coorg and Chikmagalur, Karnataka. Washed and natural process available. Consistent screen size, low defect count. Supplied to coffee roasters, blenders, and exporters.',
    availability: 'seasonal',
    season: 'Nov – Feb',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 60 kg bag',
    minOrder: '60 kg',
    tags: ['Coorg', 'Arabica', 'Green beans'],
  },
  {
    id: 'bv-002',
    name: 'Tea Leaves',
    slug: 'tea-leaves',
    category: 'beverages',
    description: 'CTC and orthodox tea from Darjeeling, Assam, and Nilgiris. Multiple grades: BOPF, BOP, CTC. Strong liquor, uniform leaf size. Supplied to tea packers, brands, institutional buyers, and commodity traders.',
    availability: 'seasonal',
    season: 'Apr – Nov',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 50 kg chest',
    minOrder: '50 kg',
    tags: ['Assam', 'CTC grade', 'Strong liquor'],
  },
  {
    id: 'bv-003',
    name: 'Herbal Infusions',
    slug: 'herbal-infusions',
    category: 'beverages',
    description: 'Dried herbs for infusion — tulsi, ginger, lemongrass, moringa, and ashwagandha. Cleaned, graded, and packaged for functional beverage brands, Ayurvedic companies, and wellness product manufacturers.',
    availability: 'year-round',
    image: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 25 kg bag',
    minOrder: '25 kg',
    tags: ['Ayurvedic', 'Wellness', 'Functional beverages'],
  },

  // ── Dehydrated Vegetables ────────────────────────────────
  {
    id: 'dv-001',
    name: 'Dehydrated Onion',
    slug: 'dehydrated-onion',
    category: 'dehydrated',
    description: 'White and pink dehydrated onion flakes, minced, granules, and powder from Mahuva, Gujarat. Moisture ≤5%, rehydration ratio 1:6. Supplied to soup manufacturers, spice blenders, instant food brands, and exporters.',
    availability: 'year-round',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 25 kg bag',
    minOrder: '100 kg',
    tags: ['Mahuva', 'Flakes & powder', 'Export quality'],
  },
  {
    id: 'dv-002',
    name: 'Dehydrated Garlic',
    slug: 'dehydrated-garlic',
    category: 'dehydrated',
    description: 'Dehydrated garlic flakes, minced, granules, and powder from Gujarat. High allicin content, low moisture (≤5%), pungent aroma. Preferred by spice brands, sauce manufacturers, seasoning processors, and exporters.',
    availability: 'year-round',
    image: 'https://images.unsplash.com/photo-1615485296764-e53fa4b8c19a?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 25 kg bag',
    minOrder: '100 kg',
    tags: ['Gujarat', 'High allicin', 'Granules & powder'],
  },
  {
    id: 'dv-003',
    name: 'Dehydrated Fruits',
    slug: 'dehydrated-fruits',
    category: 'dehydrated',
    description: 'Dehydrated mango, papaya, pineapple, and banana from Maharashtra and Karnataka. Consistent moisture (≤8%), vibrant colour, natural sweetness retained. Supplied to snack brands, confectionery companies, and health food manufacturers.',
    availability: 'year-round',
    image: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?w=600&q=80&auto=format&fit=crop',
    unit: 'per kg / per 25 kg bag',
    minOrder: '100 kg',
    tags: ['Maharashtra', 'Natural process', 'Snack grade'],
  },
]

export const productCategories = [
  { id: 'all', label: 'All Products', count: products.length },
  { id: 'spices-herbs', label: 'Spices & Herbs', count: products.filter(p => p.category === 'spices-herbs').length },
  { id: 'grains-pulses', label: 'Grains & Pulses', count: products.filter(p => p.category === 'grains-pulses').length },
  { id: 'nuts-seeds', label: 'Nuts & Seeds', count: products.filter(p => p.category === 'nuts-seeds').length },
  { id: 'fruits-vegetables', label: 'Fruits & Vegetables', count: products.filter(p => p.category === 'fruits-vegetables').length },
  { id: 'beverages', label: 'Beverages', count: products.filter(p => p.category === 'beverages').length },
  { id: 'dehydrated', label: 'Dehydrated Vegetables', count: products.filter(p => p.category === 'dehydrated').length },
]
```

**Step 2: Type-check**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && npx tsc --noEmit 2>&1 | head -30
```

Expected: errors about `ProductGrid.tsx` still validating old slugs (next task). No errors from `products.ts`.

**Step 3: Commit**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && git add src/data/products.ts && git commit -m "feat: replace product data with Cropzy 6-category/27-product structure"
```

---

### Task 3: Update ProductGrid category validation

**Files:**
- Modify: `src/components/products/ProductGrid.tsx` (line 20)

**Step 1: Update the valid-category guard**

Line 20 currently reads:
```ts
if (cat && ['fruits', 'vegetables', 'exotic', 'leafy', 'seasonal'].includes(cat)) {
```

Replace with:
```ts
if (cat && ['spices-herbs', 'grains-pulses', 'nuts-seeds', 'fruits-vegetables', 'beverages', 'dehydrated'].includes(cat)) {
```

**Step 2: Type-check**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && npx tsc --noEmit 2>&1 | head -30
```

Expected: zero errors.

**Step 3: Build**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && npm run build 2>&1 | tail -20
```

Expected: build succeeds, all pages generated.

**Step 4: Commit**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && git add src/components/products/ProductGrid.tsx && git commit -m "fix: update ProductGrid category validation to new slugs"
```

---

### Task 4: Add 3d-carousel.tsx to /components/ui

**Files:**
- Create: `src/components/ui/3d-carousel.tsx`

**Step 1: Create the file**

Create `src/components/ui/3d-carousel.tsx` with this content (adapted from reference: `bg-mauve-dark-2` → `bg-teal-dark`, `picsum` images replaced with 14 curated Unsplash agriculture/produce images):

```tsx
"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()
    matchMedia.addEventListener("change", handleChange)
    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

// 14 curated Unsplash images — spices, grains, nuts, produce
const productImages = [
  "https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=400&q=80&auto=format&fit=crop", // red chilli
  "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80&auto=format&fit=crop", // turmeric
  "https://images.unsplash.com/photo-1612363148914-32c8a16b9ee1?w=400&q=80&auto=format&fit=crop", // cumin
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80&auto=format&fit=crop", // cardamom
  "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80&auto=format&fit=crop", // rice
  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80&auto=format&fit=crop", // wheat
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80&auto=format&fit=crop", // millets
  "https://images.unsplash.com/photo-1598497819201-af22a8e6b10d?w=400&q=80&auto=format&fit=crop", // cashew
  "https://images.unsplash.com/photo-1548094878-84ced0f35b3c?w=400&q=80&auto=format&fit=crop", // sunflower seeds
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80&auto=format&fit=crop", // coffee
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop", // tea
  "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80&auto=format&fit=crop", // fruits
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80&auto=format&fit=crop", // vegetables
  "https://images.unsplash.com/photo-1584473457406-6240486418e9?w=400&q=80&auto=format&fit=crop", // dehydrated fruits
]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string, index: number) => void
    controls: ReturnType<typeof useAnimation>
    cards: string[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center bg-teal-dark"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`key-${imgUrl}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-teal-dark p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl, i)}
            >
              <motion.img
                src={imgUrl}
                alt={`Product image ${i + 1}`}
                layoutId={`img-${imgUrl}`}
                className="pointer-events-none w-full rounded-xl object-cover aspect-square"
                initial={{ filter: "blur(4px)" }}
                layout="position"
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)
Carousel.displayName = "Carousel"

function ThreeDPhotoCarousel() {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()
  const cards = useMemo(() => productImages, [])

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              alt="Product close-up"
              className="max-w-full max-h-full rounded-lg shadow-lg"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel }
```

**Step 2: Type-check**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && npx tsc --noEmit 2>&1 | head -30
```

Expected: zero errors.

**Step 3: Commit**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && git add src/components/ui/3d-carousel.tsx && git commit -m "feat: add 3D carousel component with product imagery"
```

---

### Task 5: Create FeaturedCarousel homepage section

**Files:**
- Create: `src/components/home/FeaturedCarousel.tsx`

**Step 1: Create the wrapper component**

```tsx
import { ThreeDPhotoCarousel } from '@/components/ui/3d-carousel'

export default function FeaturedCarousel() {
  return (
    <section className="py-20 bg-teal-dark overflow-hidden" aria-labelledby="carousel-heading">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="eyebrow-light block mb-4">Our Range</span>
          <h2
            id="carousel-heading"
            className="font-display font-light text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.03em', lineHeight: '1.05' }}
          >
            Explore the full catalogue
          </h2>
          <p className="font-body text-white/50 mt-4 max-w-md mx-auto" style={{ fontSize: '0.88rem', lineHeight: '1.75' }}>
            Drag to spin. Click any item to expand. Spices, grains, nuts, produce — all in one place.
          </p>
        </div>

        {/* 3D Carousel */}
        <ThreeDPhotoCarousel />
      </div>
    </section>
  )
}
```

**Step 2: Type-check**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && npx tsc --noEmit 2>&1 | head -30
```

Expected: zero errors.

**Step 3: Commit**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && git add src/components/home/FeaturedCarousel.tsx && git commit -m "feat: add FeaturedCarousel homepage section wrapper"
```

---

### Task 6: Insert FeaturedCarousel into homepage

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add the import and insert between ProductCategories and WhyChooseUs**

Current order in `src/app/page.tsx`:
```tsx
import ProductCategories from '@/components/home/ProductCategories'
import WhyChooseUs from '@/components/home/WhyChooseUs'
// ...
<ProductCategories />
<WhyChooseUs />
```

Add import after the `ProductCategories` import line:
```tsx
import FeaturedCarousel from '@/components/home/FeaturedCarousel'
```

Add JSX between `<ProductCategories />` and `<WhyChooseUs />`:
```tsx
<ProductCategories />
<FeaturedCarousel />
<WhyChooseUs />
```

**Step 2: Full build**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && npm run build 2>&1 | tail -20
```

Expected: all pages built successfully, zero errors.

**Step 3: Commit**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && git add src/app/page.tsx && git commit -m "feat: integrate FeaturedCarousel into homepage between ProductCategories and WhyChooseUs"
```

---

### Task 7: Final verification + push

**Step 1: Clean build**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && rm -rf .next && npm run build 2>&1 | tail -30
```

Expected: 16+ static pages generated, zero errors, zero warnings about missing modules.

**Step 2: Push to GitHub main**

```bash
cd "d:/konduti Traders - Demo - VGS/konduti-traders" && git log --oneline -6
git push origin main
```

---

## Summary of changes

| File | Action |
|------|--------|
| `src/types/index.ts` | Update category union + ProductCategory type |
| `src/data/products.ts` | Full rewrite — 27 products across 6 Cropzy categories |
| `src/components/products/ProductGrid.tsx` | Update valid-category guard (1 line) |
| `src/components/ui/3d-carousel.tsx` | New — adapted carousel with product images |
| `src/components/home/FeaturedCarousel.tsx` | New — section wrapper |
| `src/app/page.tsx` | Insert FeaturedCarousel between ProductCategories and WhyChooseUs |

**Untouched:** ProductCard, CategorySidebar, all other pages/components.
