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
      <radix-popover
        mode=${args.mode}
        ?connected=${args.connected}
      ></radix-popover>
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

export const WithBackground: Story = {
  render: (args) =>
    html`
      <style>
        .wrapper {
          background-image: repeating-linear-gradient(
            -45deg,
            transparent 0 20px,
            black 20px 40px
          );
          width: 100%;
          padding: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>
      <div class="wrapper">
        <radix-popover
          mode=${args.mode}
          ?connected=${args.connected}
        ></radix-popover>
      </div>
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
