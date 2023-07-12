import { Meta, StoryObj } from '@storybook/web-components'
import './tabs-menu'
import '../../styles/fonts.css'
import '../../styles/variables.css'
import { html } from 'lit'

const meta: Meta = {
  title: 'Components / Tabs menu',
}
export default meta

type Story = StoryObj

export const Primary: Story = {
  render: (args) =>
    html`
      <radix-tabs-menu
        mode=${args.mode}
        active=${args.activeTab}
        @onClick=${(ev: CustomEvent) => {
          console.log(`clicked: ${ev.detail.value}`)
        }}
      />
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
