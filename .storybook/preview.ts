import type { Preview } from '@storybook/react-vite'
import '../src/components/StepAndRepeat.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
    },
  },
}

export default preview
