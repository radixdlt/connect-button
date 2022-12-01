import { configure, setState, getMethods } from '../src'

const { getWalletData, sendTransaction, destroy } = configure({
  dAppId: 'dashboard',
  logLevel: 'DEBUG',
  onConnect: async () => {
    setState({ loading: true, connected: false })
    await getWalletData({
      oneTimeAccountsWithoutProofOfOwnership: {},
    })
      .map((response) => {
        setState({ loading: false, connected: true })
        return response
      })
      .andThen(({ oneTimeAccounts }) =>
        sendTransaction({
          version: 1,
          transactionManifest: `
          CREATE_RESOURCE Enum("Fungible", 18u8) Map<String, String>("description", "Dedo test token", "name", "Dedo", "symbol", "DEDO") Map<Enum, Tuple>() Some(Enum("Fungible", Decimal("15000")));
          CALL_METHOD ComponentAddress("${oneTimeAccounts[0].address}") "deposit_batch" Expression("ENTIRE_WORKTOP");`,
        }).andThen(sendTx)
      )
  },
  onDestroy: () => {
    destroy()
  },
})

const sendTx = () => {
  return getMethods()
    .getWalletData({
      oneTimeAccountsWithoutProofOfOwnership: {},
    })
    .andThen(({ oneTimeAccounts }) =>
      sendTransaction({
        version: 1,
        transactionManifest: `
        CREATE_RESOURCE Enum("Fungible", 18u8) Map<String, String>("description", "Dedo test token", "name", "Dedo", "symbol", "DEDO") Map<Enum, Tuple>() Some(Enum("Fungible", Decimal("15000")));
        CALL_METHOD ComponentAddress("${oneTimeAccounts[0].address}") "deposit_batch" Expression("ENTIRE_WORKTOP");`,
      })
    )
}
