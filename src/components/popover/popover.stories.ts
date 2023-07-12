import { Meta, StoryObj } from '@storybook/web-components'
import './popover'
import '../tabs-menu/tabs-menu'
import '../../styles/fonts.css'
import '../../styles/variables.css'
import { html } from 'lit'

const meta: Meta = {
  title: 'Components / Popover',
  component: 'radix-popover',
}
export default meta

type Story = StoryObj

export const Primary: Story = {
  render: (args) =>
    html`
      <radix-popover mode=${args.mode} ?connected=${args.connected}
        ><radix-tabs mode=${args.mode}
      /></radix-popover>
    `,
  argTypes: {
    mode: {
      options: ['light', 'dark'],
      control: 'select',
    },
  },
  args: {
    mode: 'light',
    connected: true,
  },
}
