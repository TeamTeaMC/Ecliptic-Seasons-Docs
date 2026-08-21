# Version support and maintenance scope

Ecliptic Seasons is both an environmental simulation mod and a seasonal foundation that other projects can integrate with. Minecraft versions differ substantially in mod-loader APIs, rendering architecture, and ecosystem maturity, so features and compatibility are not guaranteed to remain identical across every supported version.

## Current policy

| Minecraft version | Role | Main maintenance scope |
| --- | --- | --- |
| 1.20.1 | Current LTS | Crashes, world safety, severe regressions, and widely used integrations |
| 1.21.1 | Transitional stable release | General fixes and low-cost backports; gradually feature-frozen |
| 26.1.2 | Next-LTS candidate | Feature completeness, public APIs, data-driven support, and key integrations |
| 26.2 | New-architecture port | Core logic first, followed by rendering and complex integrations in stages |
| Development snapshots | Testing only | Latest snapshot startup, build, and basic-runtime verification |

!!! note "LTS does not mean every new feature"
    The purpose of an LTS release is to keep existing worlds, modpacks, and public APIs stable. It is not intended to remain feature-identical to the newest release.

## What is prioritized?

- Failure to launch, open a world, or join a server.
- Possible world, configuration, or datapack corruption.
- Core regressions such as seasons no longer progressing.
- Incorrect behavior in an already published public API.
- Compatibility problems affecting a large portion of users or major modpacks.

## What is normally not backported?

- New gameplay, blocks, items, or configuration-screen redesigns.
- Complex integrations for narrowly used mods.
- Features that require a separate legacy implementation.
- Features specific to a newer rendering architecture.

To help with legacy support, provide stable reproduction steps, a complete log, or a focused low-risk pull request. Read [Troubleshooting](troubleshooting.md) before opening an issue.
