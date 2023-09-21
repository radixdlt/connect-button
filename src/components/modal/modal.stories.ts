import { Meta, StoryObj } from '@storybook/web-components'
import './modal'
import './modal-button'
import './modal-close-button'
import '../link/link'
import '../checkbox/checkbox'
import '../../styles/fonts.css'
import '../../styles/variables.css'
import { html } from 'lit'

const meta: Meta = {
  title: 'Components / Modal',
}
export default meta

type Story = StoryObj

export const Primary: Story = {
  render: (args) =>
    html`
      <radix-modal ?show=${args.show}>
        <radix-modal-close-button
          style="position: absolute; right: 1rem;"
        ></radix-modal-close-button>
        <div style="font-size: 18px; font-weight: 600; margin-bottom: 1rem;">
          EULA License
        </div>
        <div style="font-size: 16px; margin-bottom: 1rem;">
          You must accept the terms of the End-User Licence Agreement (EULA)
        </div>
        <radix-checkbox id="eula-agreement" style="display: flex;"
          >I agree with
          <radix-link
            displayText="EULA agreement"
            style="align-self: flex-end; margin-left: 0.2rem;"
          ></radix-link
        ></radix-checkbox>
        <div style="width: 180px; align-self: flex-end;">
          <radix-modal-button ?disabled=${args.buttonDisabled}
            >I agree</radix-modal-button
          >
        </div>
      </radix-modal>
    `,
  argTypes: {
    mode: {
      options: ['light', 'dark'],
      control: 'select',
    },
  },
  args: {
    show: true,
    showCloseButton: true,
    buttonDisabled: true,
  },
}
