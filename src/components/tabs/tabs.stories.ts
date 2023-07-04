import { Meta, StoryObj } from '@storybook/web-components'
import './tabs'
import '../../styles/fonts.css'
import '../../styles/variables.css'
import { html } from 'lit'

const meta: Meta = {
  title: 'Components / Tabs',
  component: 'radix-tabs',
}
export default meta

type Story = StoryObj

export const Primary: Story = {
  render: (args) =>
    html`
      <radix-tabs
        mode=${args.mode}
        active=${args.activeTab}
        @onClick=${(ev: CustomEvent) => {
          console.log(`clicked: ${ev.detail.value}`)
        }}
      ></radix-tabs>
    `,
  argTypes: {
    mode: {
      options: ['light', 'dark'],
      control: 'select',
    },
    activeTab: {
      options: ['sharing', 'requests'],
      control: 'select',
    },
  },
  args: {
    mode: 'light',
    activeTab: 'sharing',
  },
}
