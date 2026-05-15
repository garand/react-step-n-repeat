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
