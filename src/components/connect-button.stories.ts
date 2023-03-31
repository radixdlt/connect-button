import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import { Account, PersonaData, RequestItem } from '../_types'
import './connect-button'
import { ConnectButton } from './connect-button'
import './connect-button.stories.css'

export default {
  title: 'Radix/Connect button states',
} as Meta

const getConnectButton: () => ConnectButton = () =>
  document.querySelector('radix-connect-button')!

const Button = (args: any) => {
  if (args.render)
    return html`
      <div class="connect-button-wrapper">
        <radix-connect-button
          personaLabel=${args.personaLabel}
          dAppName="Radiswap"
          ?loading=${args.loading}
          ?connected=${args.connected}
          ?connecting=${args.connecting}
          ?showPopover=${args.showPopover}
          ?showNotification=${args.showNotification}
          .requestItems=${args.requestItems}
          .accounts=${args.accounts}
          .personaData=${args.personaData}
          @onCancelRequestItem=${(event: CustomEvent<{ id: string }>) => {
            const connectButton = getConnectButton()
            connectButton.requestItems = connectButton.requestItems.map(
              (item: RequestItem) =>
                item.id === event.detail.id
                  ? { ...item, status: 'fail', error: 'canceledByUser' }
                  : item
            )
            connectButton.loading = false
            connectButton.connecting = false
          }}
          @onDisconnect=${() => {
            getConnectButton().connected = false
            getConnectButton().loading = false
            getConnectButton().requestItems = []
          }}
          @onDestroy=${() => {}}
          @onConnect=${() => {
            getConnectButton().connected = true
            getConnectButton().loading = false
            getConnectButton().requestItems = [
              {
                id: crypto.randomUUID(),
                type: 'loginRequest',
                status: 'success',
              },
              ...getConnectButton().requestItems,
            ]
          }}
          @onShowPopover=${() => {
            getConnectButton().showNotification = false
          }}
        >
        </radix-connect-button>
      </div>
    `
  return ''
}

const Template: Story<Partial<any>> = (args) => Button(args)

const accounts: Account[] = [
  {
    label: 'main',
    address:
      'account_tdx_b_1qlxj68pketfcx8a6wrrqyvjfzdr7caw08j22gm6d26hq3g6x5m',
    appearanceId: 1,
  },
  {
    label: 'beta',
    address:
      'account_tdx_b_1queslxclg3ya6tyqqgs2ase7wgst2cvpwqq96ptkqj6qaefsgy',
    appearanceId: 2,
  },
]

const personaData: PersonaData[] = [
  {
    field: 'givenName',
    value: 'Matthew',
  },
  {
    field: 'familyName',
    value: 'Hines',
  },
  {
    field: 'emailAddress',
    value: 'matt@radmatt.io',
  },
  {
    field: 'phoneNumber',
    value: '123 123 1234',
  },
]

export const initial = Template.bind({})
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
initial.args = {
  loading: false,
  showPopover: false,
  connected: false,
  connecting: false,
  showNotification: false,
  requestItems: [],
  accounts,
  personaLabel: '',
  render: true,
}

export const Connecting = Template.bind({})
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
Connecting.args = {
  loading: true,
  showPopover: true,
  connected: false,
  connecting: true,
  showNotification: false,
  requestItems: [
    {
      id: crypto.randomUUID(),
      type: 'loginRequest',
      status: 'pending',
    },
  ],
  accounts,
  personaLabel: 'RadMatt',
  render: true,
}

export const connected = Template.bind({})
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
connected.args = {
  loading: false,
  showPopover: true,
  connected: true,
  connecting: false,
  showNotification: false,
  requestItems: [
    {
      id: crypto.randomUUID(),
      type: 'loginRequest',
      status: 'success',
    },
  ],
  accounts,
  personaData,
  personaLabel: 'RadMatt',
  render: true,
}

export const notification = Template.bind({})
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
notification.args = {
  loading: false,
  showPopover: false,
  connected: true,
  connecting: false,
  showNotification: true,
  requestItems: [
    {
      id: crypto.randomUUID(),
      type: 'sendTransaction',
      status: 'fail',
      error: 'rejectedByUser',
    },
    {
      id: crypto.randomUUID(),
      type: 'loginRequest',
      status: 'success',
    },
  ],
  accounts: [],
  personaLabel: 'RadMatt',
  render: true,
}

export const oneTimeRequest = Template.bind({})
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
oneTimeRequest.args = {
  loading: true,
  showPopover: false,
  connected: false,
  connecting: false,
  showNotification: false,
  requestItems: [
    {
      id: crypto.randomUUID(),
      type: 'dataRequest',
      status: 'pending',
    },
  ],
  accounts,
  personaLabel: '',
  render: true,
}

export const manyRequests = Template.bind({})
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args
manyRequests.args = {
  loading: true,
  showPopover: true,
  connected: false,
  connecting: false,
  showNotification: false,
  requestItems: [
    {
      id: crypto.randomUUID(),
      type: 'dataRequest',
      status: 'failed',
      error: 'rejected',
    },
    {
      id: crypto.randomUUID(),
      type: 'sendTransaction',
      status: 'success',
      transactionIntentHash: '123',
    },
    {
      id: crypto.randomUUID(),
      type: 'dataRequest',
      status: 'pending',
    },
    {
      id: crypto.randomUUID(),
      type: 'sendTransaction',
      status: 'pending',
    },
  ],
  accounts,
  personaLabel: '',
  render: true,
}
