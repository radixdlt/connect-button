import { Meta, StoryObj } from '@storybook/web-components'
import './card'
import './persona-card'
import '../../styles/fonts.css'
import '../../styles/variables.css'
import { html } from 'lit'

const meta: Meta = {
  title: 'Components / Card',
  component: 'radix-card',
}
export default meta

type Story = StoryObj

export const Onboarding: Story = {
  render: (args) =>
    html`
      <style>
        .cards {
          margin: 10px 0px 10px;
        }
        radix-card {
          margin-bottom: 10px;
        }
        .subtitle {
          color: ${args.mode === 'light' ? '#8a8fa4' : '#CED0D6'};
          font-size: 16px;
          margin-top: 5px;
          display: block;
        }
      </style>
      <radix-popover mode=${args.mode}>
        <div class="cards">
          <radix-card
            mode=${args.mode}
            header="Radix Wallet mobile app"
            icon="checked"
          ></radix-card>
          <radix-card
            mode=${args.mode}
            header="Radix Connector browser extension"
            icon="unchecked"
            ><span class="subtitle"
              >Get and link the Radix Connector browser extension to your Radix
              Wallet to connect securely to dApp websites.</span
            ></radix-card
          >
        </div>
      </radix-popover>
    `,
  argTypes: {
    mode: {
      options: ['light', 'dark'],
      control: 'select',
    },
  },
  args: {
    mode: 'light',
    icon: 'unchecked',
  },
}

const personaData = [
  'Alex Stelea',
  'alex.stelea@van.damme',
  '+42084652103',
  '45 Avebury Drive, Duncan Road, Elshewhere, NY 98827',
  'Passport: 78668279872HS',
  'Lorem ipsum',
  'dolor sit amet',
  'consectetur adipiscing elit',
  'Aenean',
  'ultrices sodales',
  'ex, vitae fringilla',
]

export const PersonaCard: Story = {
  render: (args) =>
    html`
      <style>
        radix-tabs {
          margin-bottom: 20px;
        }
      </style>
      <radix-popover mode=${args.mode} connected>
        <radix-tabs mode=${args.mode}></radix-tabs>
        <radix-persona-card
          avatarUrl=${args.avatarUrl}
          mode=${args.mode}
          persona=${args.persona}
          .personaData=${personaData.slice(0, args.personaDataRows)}
        />
      </radix-popover>
    `,
  argTypes: {
    mode: {
      options: ['light', 'dark'],
      control: 'select',
    },
  },
  args: {
    mode: 'light',
    avatarUrl: 'https://picsum.photos/200',
    personaDataRows: 2,
    persona: 'VanDammeStelea',
  },
}
