[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

The √ Connect Button is a framework agnostic web component to help developers connect users and their Radix Wallet to their dApps.

It appears as a consistent, Radix-branded UI element that helps users identify your dApp website as a Radix dApp. When used with [Radix dApp Toolkit](https://github.com/radixdlt/radix-dapp-toolkit) it is compatible with the Radix Wallet – and it automatically provides a consistent user experience for users to connect with their wallet and see the current status of the connection between dApp and Radix Wallet.

- [Installation](#installation)
- [Usage](#usage)
  - [Getting started](#getting-started)
    - [Properties](#properties)
    - [Events](#events)

# Installation

**Using NPM**

```bash
npm install @radixdlt/connect-button
```

**Using Yarn**

```bash
yarn add @radixdlt/connect-button
```

# Usage

## Getting started

Add the `<radix-connect-button />` element in your HTML code and call the configuration function.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="module" src="/bundle.js"></script>
  </head>
  <body>
    <radix-connect-button />
  </body>
</html>
```

### Properties

```typescript
const radixConnectButton = document.querySelector('radix-connect-button')!

const handleConnect = () => {
  radixConnectButton.loading = true
  radixConnectButton.connecting = true
}

radixConnectButton.addEventListener('onConnect', handleConnect)
```

```typescript
type ConnectButtonProperties = {
  personaLabel: string
  dAppName: string
  loading: boolean
  connected: boolean
  connecting: boolean
  showPopover: boolean
  showNotification: boolean
  requestItems: RequestItem[]
  accounts: Account[]
  personaData: PersonaData[]
}
```

- personaLabel - label of the connected persona
- dAppName - name of the dApp
- loading - set loading state
- connected - set connected state
- connecting - set connecting state
- showPopover - display connect button popover
- showNotification - display an icon that indicates that a request item has been updated
- requestItems - displays a list of maximum 3 request items in the popover
- accounts - displays a list of connected accounts

### Events

```typescript
type ConnectButtonEvents = {
  onConnect: () => void
  onDisconnect: () => void
  onCancelRequestItem: (event: CustomEvent<{ id: string }>) => void
  onDestroy: () => void
  onShowPopover: () => void
  onUpdateSharedData: () => void
}
```

- onConnect - triggers when user clicks connect now button
- onDisconnect - triggers when user clicks disconnect wallet button
- onCancel - triggers when user cancels connect request
- onDestroy - triggers when button is removed from the DOM. Useful for cleaning up registered event listeners and subscriptions.
