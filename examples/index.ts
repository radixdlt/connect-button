import './style.css'
import { configure, getMethods, requestBuilder, requestItem } from '../src'

configure({
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
  },
  onDisconnect: ({ setState }) => {
    setState({ connected: false })
  },
})

const sendTx = (address: string) =>
  getMethods().sendTransaction({
    version: 1,
    transactionManifest: `
      CREATE_RESOURCE Enum("Fungible", 18u8) Map<String, String>("description", "Dedo test token", "name", "Dedo", "symbol", "DEDO") Map<Enum, Tuple>() Some(Enum("Fungible", Decimal("15000")));
      CALL_METHOD ComponentAddress("${address}") "deposit_batch" Expression("ENTIRE_WORKTOP");`,
  })
