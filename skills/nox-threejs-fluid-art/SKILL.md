---
name: nox-threejs-fluid-art
description: Design and integrate Three.js fluid, soft-body, cloth, and smoke effects for NOX art and architecture websites. Use for threejs-particle-fluids, liquid sculpture, splashes, floating objects, fabric reveals, or volumetric smoke, including mobile fallback and scroll choreography. Do not trigger for every 3D website or ordinary static water.
---

# NOX 3D 流體與材質動態

Build one purposeful material interaction supporting the artwork, building, or product. Preserve generous spacing, restrained typography, clear focal hierarchy, and smooth camera movement. Change the visual concept between new projects unless the user specifies continuity. Treat the library as a dependency; this skill supplies a workflow, not an installed runtime or a guarantee of tested performance.

## Choose the implementation

1. Read [upstream.md](references/upstream.md). Recheck current requirements and the project's lockfile; recorded versions are a dated baseline.
2. Distinguish responsive physical interaction from repeatable choreography. Use simulation for splashes, deformation, and collisions. Prefer authored shaders, baked animation, or video for ambient water and precisely reversible cinematic sequences.
3. Inspect the renderer, Three.js version, frame loop, postprocessing, and target devices. Do not assume compatibility with an existing WebGL/R3F canvas or silently upgrade the entire site. Prototype an isolated effect; explain migration costs when relevant.
4. Plan capable-device simulation and an independently implemented lightweight fallback. Match framing, palette, and focal subject. Keep content and navigation usable in both.

## Integrate deliberately

- Gate on secure context and actual renderer initialization, not device names or `navigator.gpu` alone. Catch unavailable GPU limits, initialization failure, and later device loss. Transition to fallback without blank frames or restart loops.
- Use high-level `Simulation` for bounded scenes. Consult the low-level API and matching example when pouring, moving containers, custom forces, or high-level restrictions matter. Verify exact signatures before coding.
- Give rendering one frame-loop owner. Await simulation work before rendering; prevent overlapping async frames. Pause offscreen and hidden-tab work; dispose resources on teardown.
- Separate scroll-driven camera progress from physical time. Do not feed wheel deltas or reverse time into the solver. Choose replay, checkpoints, or baked animation when reverse scrolling must reproduce earlier states. Check continuity explicitly.
- Hold the opening cover until the first composed frame is ready. Preserve camera aspect during resize, orientation changes, and mobile browser-bar movement. Avoid layout shifts when loading.

## Set a measured quality budget

Start with a restrained scene. Budget particle count, pixel ratio, and interacting materials independently. Measure frame-time percentiles and visible stutter on target hardware. Acceptance targets are product choices, not upstream guarantees. Simplify pixel cost and interactions or switch fallback; use hysteresis to avoid quality oscillation. Rebuild safely when changing construction-time settings.

For trails or watery distortion during camera motion, isolate postprocessing, temporal history, refraction, and screen-space rendering through controlled comparisons. Do not hide defects with extra blur. Inspect fast/slow rotation, silhouettes, overlapping objects, and screen edges.

Validate cold load, unsupported GPU, route teardown/re-entry, touch drag versus page scroll, orientation change, background/resume, and sustained motion. Respect reduced-motion preferences. Report tested devices and paths precisely; desktop emulation does not establish iPhone/iPad GPU behavior.

## Choose a starting example

| Request | Preset |
| --- | --- |
| Water splash | Water Drop / Dam Break |
| Liquid sculpture | Liquid Marble |
| Viscous coating | Honey Bunny; inspect low-level emission |
| Floating objects | Buoyancy |
| Soft sculpture | Bunny Lineup / Soft Body Squeeze |
| Fabric unveiling | Velvet Curtain / Velvet Drape |
| Atmospheric smoke | Vortex Plume |

Keep attribution and inspect asset notices before reusing models. Use effects for presentation, not engineering predictions.

For the screenshot's Codex configuration advice, read [codex-config.md](references/codex-config.md). Do not apply configuration changes merely because this visual-effects skill is active.
