[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

The √ Connect Button is a framework agnostic web component to help developers connect users and their Radix Wallet to their dApps.

It appears as a consistent, Radix-branded UI element that helps users identify your dApp website as a Radix dApp and compatible with the Radix Wallet – and it automatically provides a consistent user experience for users to connect with their wallet and see the current status of the connection between dApp and Radix Wallet.

The √ Connect Button API acts as a wrapper to the [Wallet SDK](https://github.com/radixdlt/wallet-sdk) and exposes its methods while adding additional methods.


- [Installation](#installation)
- [Usage](#usage)
  - [Getting started](#getting-started)
    - [Configuration](#configuration)
    - [API](#api)
  - [Examples](#examples)

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

### Configuration

The connect button needs to be configured before use.

`configure(input: ConfigurationInput) => RadixConnectButtonApi`

```typescript
import {
  configure,
  requestBuilder,
  requestItem,
} from '@radixdlt/connect-button'

configure({
  dAppId: 'dashboard',
  networkId: 0x01,
  onConnect: ({ setState, getWalletData }) => {
    getWalletData(
      requestBuilder(requestItem.oneTimeAccounts.withoutProofOfOwnership(1))
    ).map(({ oneTimeAccounts }) => {
      setState({ connected: true })
    })
  },
  onDisconnect: ({ setState }) => {
    setState({ connected: false })
  },
})
```

```typescript
type ConfigurationInput = {
  dAppId: string
  networkId?: number
  initialState?: Partial<ButtonState>
  onConnect: (api: RadixConnectButtonApi) => void
  onDisconnect: (api: RadixConnectButtonApi) => void
  onCancel?: () => void
  onDestroy?: () => void
}
```

- **requires** dAppId - Specifies the dApp that is interacting with the wallet. Used in dApp verification process on the wallet side.
- **optional** networkId - Specifies which network to use, defaults to mainnet (0x01)
- **optional** initialState - Forces initial connected and / or loading state for button
- **requires** onConnect - Callback that triggers when user clicks connect now button
- **requires** onDisconnect - Callback that triggers when user clicks disconnect wallet button
- **optional** onCancel - Callback that triggers when user cancels connect request
- **optional** onDestroy - Callback that triggers when button is removed from the DOM. Useful for cleaning up registered event listeners and subscriptions.

### API

```typescript
type RadixConnectButtonApi = {
  getWalletData: WalletSdkType['request']
  sendTransaction: WalletSdkType['sendTransaction']
  setState: (
    input: Partial<{
      connected: boolean
      loading: boolean
    }>
  ) => void
  destroy: () => void
  onConnect$: Observable<void>
}
```

- getWalletData – uses [wallet SDK request method](https://github.com/radixdlt/wallet-sdk#get-wallet-data)
- sendTransaction – uses [wallet SDK sendTransaction method](https://github.com/radixdlt/wallet-sdk#send-transaction)
- setState – Sets the state of the button
- destroy – Cleanup function to destroy the configuration instance
- onConnect$ – Observable that emits when the user clicks on the connect button

## Examples

- Vue 3 - [@radixdlt/vue-connect-button](https://github.com/radixdlt/vue-connect-button)
- Angular 15 - [@radixdlt/angular-connect-button](https://github.com/radixdlt/angular-connect-button)
- React 18 - [@radixdlt/react-connect-button](https://github.com/radixdlt/react-connect-button)
