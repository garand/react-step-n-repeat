# react-step-n-repeat

A React component that repeats a child element across the available area with optional staggered rows, horizontal animation, and rotation.

## Install

```bash
pnpm add react-step-n-repeat
```

Import the stylesheet explicitly:

```tsx
import 'react-step-n-repeat/styles.css'
import { StepAndRepeat } from 'react-step-n-repeat'
```

## Basic Usage

```tsx
import 'react-step-n-repeat/styles.css'
import { StepAndRepeat } from 'react-step-n-repeat'

export function Example() {
  return (
    <div style={{ width: 480, height: 280 }}>
      <StepAndRepeat gap={16}>
        <div className="tile">Logo</div>
      </StepAndRepeat>
    </div>
  )
}
```

## Animated Usage

```tsx
<StepAndRepeat animate speed={8} alternateDirection gap={20}>
  <div className="tile">Logo</div>
</StepAndRepeat>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `children` | `ReactElement` | required | The tile to repeat. |
| `gap` | `number` | `24` | Spacing between tiles in both axes. |
| `animate` | `boolean` | `false` | Enables infinite horizontal scrolling per row. |
| `alternateDirection` | `boolean` | `false` | Reverses odd animated rows when row speeds are not explicitly provided. |
| `speed` | `number` | `8` | Shared default row speed in px/sec. Negative values move left, positive values move right. |
| `evenRowSpeed` | `number` | derived from `speed` | Overrides even row speed. |
| `oddRowSpeed` | `number` | derived from `speed` and `alternateDirection` | Overrides odd row speed. |
| `rotation` | `number` | `0` | Rotates the repeated field in degrees while expanding coverage to fill corners. |
| `className` | `string` | - | Applied to the root container. |
| `style` | `CSSProperties` | - | Applied to the root container. |

## Behavior Notes

- Alternating rows are offset by half of the child width on the x axis.
- Animated mode only renders enough tiles to cover the viewport plus loop padding.
- A row speed of `0` pauses that row.
- Interactive children are supported, but repeating interactive controls may not be desirable for every UX.

## Development

Use Storybook for local component development:

```bash
pnpm storybook
```

The repo also includes the original Vite demo app:

```bash
pnpm dev
```

## Release Automation

This repo uses a single GitHub Action: `publish.yml`.

It is manually triggered, bumps the version, creates the tag, pushes it, creates the GitHub release, and publishes the package to npm.

Repository setup required:

- Configure npm Trusted Publishing for this repository/workflow/environment.
- Keep the `Production` GitHub environment available for the publish workflow.

## Versioning Best Practice

The idiomatic npm + GitHub workflow is:

1. `package.json` is the source of truth for the package version.
2. The Git tag matches that version exactly, typically as `vX.Y.Z`.
3. The GitHub release is created from that matching tag.
4. CI publishes that exact tagged version to npm.

For this repo, the publish workflow validates that:

- the version bump was applied to `package.json`
- the resulting npm version is still unpublished
- npm does not already have that version published

### Recommended Release Flow

Run the `Publish Package` workflow from GitHub Actions and choose one of:

- `patch`
- `minor`
- `major`

That workflow will:

- a version bump in `package.json`
- a Git commit on `main`
- a matching Git tag like `v0.1.3`
- a GitHub release from that tag
- publish the package to npm

### Why this is better

- no manual tag creation
- no manual GitHub release creation
- `package.json` remains the version source of truth
- npm publishes only from a real released tag
- the published npm version always matches the GitHub release version

### Important

Do not create manual GitHub releases for arbitrary version tags.
Use the `Publish Package` workflow so the version bump, tag, GitHub release, and npm publish stay aligned.
