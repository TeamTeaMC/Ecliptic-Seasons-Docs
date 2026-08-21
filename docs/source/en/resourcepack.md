# Resource-pack authoring

| Priority | Goal | Page |
|---|---|---|
| Most common | Change seasonal foliage or grass colors | [Seasonal visuals](custom/visuals.md) |
| Common | Add snow or seasonal textures to another mod's blocks | [Seasonal visuals](custom/visuals.md) |
| Common | Customize fallen-leaf particles | [Seasonal visuals](custom/visuals.md) |
| Optional ambience | Add seasonal ambience or background music | [Ambient sounds and music](custom/audio.md) |

Client rules use `assets/<your_namespace>/eclipticseasons/<type>/<name>.json`. Rules targeting the `minecraft` texture namespace belong under `assets/minecraft/eclipticseasons/`; your own assets remain in your namespace.

Test one biome or block before expanding to tags. Snow changes that affect server behavior also require the corresponding data-pack entry.
