import './style.css'
import {
  configure,
  getMethods,
  requestBuilder,
  requestItem,
  RadixConnectButtonApi,
} from '../src'

window.radixConnectButtonApi = configure({
  initialState: {
    connected: false,
    loading: false,
  },
  dAppId: 'dashboard',
  networkId: 11,
  logLevel: 'DEBUG',
  onConnect: ({ setState, getWalletData }) => {
    getWalletData(
      requestBuilder(requestItem.oneTimeAccounts.withoutProofOfOwnership(1))
    )
      .map(({ oneTimeAccounts }) => {
        setState({ connected: true })
        return oneTimeAccounts[0].address
      })
      .andThen(sendTx)
      .map(() => setState({ loading: false }))
      .mapErr(() => setState({ loading: false }))
  },
  onDisconnect: ({ setState }) => {
    setState({ connected: false })
  },
})

const sendTx = (address: string) => {
  const faucet =
    'component_tdx_b_1qftacppvmr9ezmekxqpq58en0nk954x0a7jv2zz0hc7qdxyth4'
  return getMethods().sendTransaction({
    version: 1,
    transactionManifest: `
      CALL_METHOD ComponentAddress("${faucet}") "free";
      CALL_METHOD ComponentAddress("${address}") "deposit_batch" Expression("ENTIRE_WORKTOP");`,
  })
}

declare global {
  interface Window {
    radixConnectButtonApi: RadixConnectButtonApi
  }
}
