# Integration prompt — Spline Hero Section (corrected)

You are given a task to integrate an existing React component into the codebase.

The codebase already supports shadcn project structure, Tailwind CSS, and TypeScript. Components live in `/components/ui`.

## Step 1 — Install NPM dependencies

```bash
@splinetool/runtime @splinetool/react-spline
```

(Do NOT install framer-motion for this task — it is not used by any file below.)

## Step 2 — Create `/components/ui/spline.tsx`

```tsx
'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-700 border-t-neutral-200" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
```

Note: the fallback uses Tailwind's `animate-spin` directly — no custom `.loader` CSS class is needed.

## Step 3 — Create `/components/ui/spotlight.tsx`

Use ONLY this version (aceternity). Do not create any other component named Spotlight.

```tsx
import React from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({ className, fill }: SpotlightProps) => {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "white"}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
};
```

## Step 4 — REQUIRED: add the spotlight animation to Tailwind config

The Spotlight component starts at `opacity-0` and is revealed only by this animation. Without it the spotlight is permanently invisible. Add to `tailwind.config.ts` under `theme.extend`:

```ts
animation: {
  spotlight: "spotlight 2s ease .75s 1 forwards",
},
keyframes: {
  spotlight: {
    "0%": {
      opacity: "0",
      transform: "translate(-72%, -62%) scale(0.5)",
    },
    "100%": {
      opacity: "1",
      transform: "translate(-50%, -40%) scale(1)",
    },
  },
},
```

## Step 5 — Use the existing shadcn Card

The standard shadcn `Card` from `/components/ui/card` is used as-is. If it does not exist yet, add it via `npx shadcn@latest add card`.

## Step 6 — Create the demo section `/components/spline-scene-basic.tsx`

```tsx
'use client'

import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Interactive 3D
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg">
            Bring your UI to life with beautiful 3D scenes. Create immersive experiences
            that capture attention and enhance your design.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative min-h-[240px]">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
```

## Implementation notes

1. Import paths: the Spline wrapper is `@/components/ui/spline` (not "splite").
2. Responsive: the layout stacks vertically below `md`; the 3D pane keeps a minimum height of 240px so the scene never collapses on mobile.
3. The Spline runtime is heavy (>1MB gzipped). Keep the `lazy` + `Suspense` pattern; do not convert it to a static import.
4. No image assets or lucide-react icons are required for this component.
5. After integration, verify: (a) the spotlight beam fades in within ~3 seconds of page load, (b) the spinner shows while the Spline scene loads, (c) the 3D robot responds to cursor movement.
