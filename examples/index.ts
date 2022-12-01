console.log('heya!')
import '../src/connect-button'
import { configure, setState } from '../src/connect-button'

const { getWalletData } = configure({
  dAppId: 'dashboard',
  logLevel: 'DEBUG',
  onConnect: () => {
    setState({ loading: true, connected: false })
    getWalletData({
      oneTimeAccountsWithoutProofOfOwnership: {},
    }).map((result) => {
      setState({ loading: false, connected: true })
    })
  },
})
