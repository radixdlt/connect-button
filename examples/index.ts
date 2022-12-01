import '../src/connect-button'
import { configure, setState } from '../src/connect-button'

const { getWalletData, destroy } = configure({
  dAppId: 'dashboard',
  logLevel: 'DEBUG',
  onConnect: async () => {
    setState({ loading: true, connected: false })
    const result = await getWalletData({
      oneTimeAccountsWithoutProofOfOwnership: {},
    })
    setState({ loading: false, connected: true })
  },
  onDestroy: () => {
    destroy()
  },
})
