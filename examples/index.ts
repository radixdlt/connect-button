import './style.css'
import { configure, getMethods } from '../src'

configure({
  dAppId: 'dashboard',
  logLevel: 'DEBUG',
  onConnect: ({ setState, getWalletData }) => {
    setState({ loading: true, connected: false })
    getWalletData({
      oneTimeAccountsWithoutProofOfOwnership: {},
    })
      .map(({ oneTimeAccounts }) => {
        setState({ loading: false, connected: true })
        return oneTimeAccounts[0].address
      })
      .andThen(sendTx)
  },
})

const sendTx = (address: string) =>
  getMethods().sendTransaction({
    version: 1,
    transactionManifest: `
      CREATE_RESOURCE Enum("Fungible", 18u8) Map<String, String>("description", "Dedo test token", "name", "Dedo", "symbol", "DEDO") Map<Enum, Tuple>() Some(Enum("Fungible", Decimal("15000")));
      CALL_METHOD ComponentAddress("${address}") "deposit_batch" Expression("ENTIRE_WORKTOP");`,
  })
