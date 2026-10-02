# Verified upstream baseline

Checked 2026-10-02. Recheck before installing; main can change. Documentation was inspected; no runtime or device benchmark was executed during skill creation.

## Sources

- Repository/presets: https://github.com/dgreenheck/threejs-particle-fluids
- Guide: https://github.com/dgreenheck/threejs-particle-fluids/blob/main/docs/guide.md
- Constraints: https://github.com/dgreenheck/threejs-particle-fluids/blob/main/docs/limitations.md
- API: https://github.com/dgreenheck/threejs-particle-fluids/blob/main/docs/api/simulation.md
- Versions: https://github.com/dgreenheck/threejs-particle-fluids/blob/main/package.json
- Asset notices: https://github.com/dgreenheck/threejs-particle-fluids/blob/main/THIRD_PARTY_NOTICES.md
- Gallery: https://dgreenheck.github.io/threejs-particle-fluids/

## Dependencies and startup

The inspected package declares version 0.2.0, Node >=22.12.0, and Three.js peers >=0.184.0 <0.185.0. TypeScript types use the same range. This does not establish the newest npm release. Pin verified dependencies and keep a lockfile.

The guide requires WebGPU and HTTPS or localhost; no WebGL implementation exists. Begin around 5,000 particles and measure the slowest target device. Supply environment lighting. Volume sampling needs closed meshes; thin or disconnected parts can disappear.

Use `await createParticleRenderer(...)`; it requests these solver limits: 1,024 compute invocations/workgroup, workgroup X size 1,024, and 10 storage buffers/shader stage. WebGPU presence alone does not prove these limits are available. Inspect initialization errors and current API requirements.

## Timing

Call `await sim.step()` before rendering. Default stepping accumulates fixed 1/60-second steps, at most four per frame. Explicit `sim.step(1 / 60)` supports controlled recording/testing; do not pass variable elapsed time. Pauses beyond 250 ms resume without replaying the full gap. Paint the loading cover before initialization, then render a valid frame before revealing.

## Constraints and performance

High-level scene membership and liquid quantity are fixed after startup. Particle size is shared, the container is stationary, and cloth is rectangular. Smoke needs a separate simulation with one source. Consult low-level APIs for other structures, recognizing that buffers and assembled solvers also have construction-time constraints.

Particle count, substeps, and pixel count affect cost. Liquid touching moving cloth/soft bodies is expensive. Mesh preparation can block startup. Avoid per-frame CPU readback. Even laptop GPUs can struggle at 10,000 particles. Fast/thin colliders can leak particles; thicker/slower obstacles may help before increasing solver cost. The pre-1.0 API can change. These are visual solvers, not engineering simulation tools.

The library is labeled MIT; demo assets have separate provenance. Check their notices instead of assuming a single license covers every model identically.
