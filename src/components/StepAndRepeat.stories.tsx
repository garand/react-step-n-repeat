import type { Meta, StoryObj } from '@storybook/react-vite'
import { StepAndRepeat } from './StepAndRepeat'

type SurfaceProps = {
  children: React.ReactNode
  background: string
  accent: string
}

type EmojiTileProps = {
  emoji: string
  label: string
  tint: string
  glow: string
  rotate?: number
}

function Surface({ children, background, accent }: SurfaceProps) {
  return (
    <div
      style={{
        width: 760,
        height: 440,
        padding: 24,
        borderRadius: 32,
        border: `1px solid ${accent}`,
        background,
        boxShadow: `0 24px 80px color-mix(in srgb, ${accent} 18%, transparent)`,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

function EmojiTile({ emoji, label, tint, glow, rotate = 0 }: EmojiTileProps) {
  return (
    <div
      style={{
        display: 'grid',
        gap: 8,
        justifyItems: 'center',
        minWidth: 108,
        padding: '0.9rem 1rem 0.8rem',
        borderRadius: 22,
        border: `1px solid color-mix(in srgb, ${tint} 34%, white 10%)`,
        background: `linear-gradient(180deg, color-mix(in srgb, ${tint} 16%, rgba(15, 23, 42, 0.92)), rgba(15, 23, 42, 0.88))`,
        color: '#f8fafc',
        boxShadow: `0 18px 40px ${glow}, inset 0 1px 0 rgba(255, 255, 255, 0.12)`,
        backdropFilter: 'blur(12px)',
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          fontSize: 28,
          lineHeight: 1,
          filter: `drop-shadow(0 0 18px ${glow})`,
        }}
      >
        {emoji}
      </span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  )
}

const meta = {
  title: 'Components/StepAndRepeat',
  component: StepAndRepeat,
  tags: ['autodocs'],
  args: {
    gap: 20,
    animate: false,
    alternateDirection: false,
    speed: 8,
    rotation: 0,
  },
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof StepAndRepeat>

export default meta

type Story = StoryObj<typeof meta>

export const Static: Story = {
  render: (args) => (
    <Surface
      accent="rgba(250, 204, 21, 0.22)"
      background="radial-gradient(circle at top left, rgba(250, 204, 21, 0.16), transparent 34%), linear-gradient(135deg, #0f172a, #111827 52%, #1f2937)"
    >
      <StepAndRepeat {...args}>
        <EmojiTile
          emoji="✨"
          label="Static Spark"
          tint="#f59e0b"
          glow="rgba(245, 158, 11, 0.32)"
        />
      </StepAndRepeat>
    </Surface>
  ),
}

export const Animated: Story = {
  args: {
    animate: true,
    speed: 7,
  },
  render: (args) => (
    <Surface
      accent="rgba(56, 189, 248, 0.24)"
      background="radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 32%), radial-gradient(circle at bottom right, rgba(167, 139, 250, 0.18), transparent 26%), linear-gradient(180deg, #020617, #0f172a 40%, #1e293b)"
    >
      <StepAndRepeat {...args}>
        <EmojiTile
          emoji="🌊"
          label="Night Drift"
          tint="#38bdf8"
          glow="rgba(56, 189, 248, 0.28)"
        />
      </StepAndRepeat>
    </Surface>
  ),
}

export const AlternatingRows: Story = {
  args: {
    animate: true,
    alternateDirection: true,
    speed: 9,
  },
  render: (args) => (
    <Surface
      accent="rgba(244, 114, 182, 0.24)"
      background="radial-gradient(circle at 20% 10%, rgba(244, 114, 182, 0.2), transparent 28%), radial-gradient(circle at 85% 85%, rgba(192, 132, 252, 0.16), transparent 22%), linear-gradient(160deg, #1f1024, #140f2d 48%, #0f172a)"
    >
      <StepAndRepeat {...args}>
        <EmojiTile
          emoji="🎀"
          label="Ribbon Rush"
          tint="#f472b6"
          glow="rgba(244, 114, 182, 0.26)"
          rotate={-2}
        />
      </StepAndRepeat>
    </Surface>
  ),
}

export const Rotated: Story = {
  args: {
    animate: true,
    alternateDirection: true,
    speed: 6,
    gap: 24,
    rotation: -15,
  },
  render: (args) => (
    <Surface
      accent="rgba(74, 222, 128, 0.22)"
      background="radial-gradient(circle at top right, rgba(74, 222, 128, 0.18), transparent 28%), linear-gradient(125deg, #052e16, #0f172a 52%, #1f2937)"
    >
      <StepAndRepeat {...args}>
        <EmojiTile
          emoji="🪩"
          label="Tilt Parade"
          tint="#4ade80"
          glow="rgba(74, 222, 128, 0.28)"
          rotate={4}
        />
      </StepAndRepeat>
    </Surface>
  ),
}

export const RowOverrides: Story = {
  args: {
    animate: true,
    gap: 18,
    evenRowSpeed: -14,
    oddRowSpeed: 5,
  },
  render: (args) => (
    <Surface
      accent="rgba(251, 146, 60, 0.22)"
      background="radial-gradient(circle at left, rgba(251, 146, 60, 0.18), transparent 24%), radial-gradient(circle at right, rgba(239, 68, 68, 0.16), transparent 20%), linear-gradient(135deg, #3b0a0a, #1f2937 58%, #111827)"
    >
      <StepAndRepeat {...args}>
        <EmojiTile
          emoji="🔥"
          label="Heat Check"
          tint="#fb923c"
          glow="rgba(251, 146, 60, 0.28)"
        />
      </StepAndRepeat>
    </Surface>
  ),
}

export const PlayfulIcons: Story = {
  args: {
    animate: true,
    alternateDirection: true,
    speed: 10,
    gap: 16,
  },
  render: (args) => (
    <Surface
      accent="rgba(34, 197, 94, 0.2)"
      background="radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.16), transparent 28%), radial-gradient(circle at 0% 100%, rgba(250, 204, 21, 0.14), transparent 22%), linear-gradient(180deg, #07111f, #101827 44%, #0f172a)"
    >
      <StepAndRepeat {...args}>
        <EmojiTile
          emoji="🍕"
          label="Party Slice"
          tint="#22c55e"
          glow="rgba(34, 197, 94, 0.24)"
          rotate={-3}
        />
      </StepAndRepeat>
    </Surface>
  ),
}
