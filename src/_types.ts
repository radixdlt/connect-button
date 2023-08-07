export type Account = { label: string; address: string; appearanceId: number }

export const RadixButtonStatus = {
  pending: 'pending',
  success: 'success',
  error: 'error',
  default: 'default',
} as const

export type RadixButtonStatus = keyof typeof RadixButtonStatus

export const RadixButtonTheme = {
  'radix-blue': 'radix-blue',
  black: 'black',
  'white-with-outline': 'white-with-outline',
  white: 'white',
} as const

export type RadixButtonTheme = keyof typeof RadixButtonTheme

export const RadixButtonMode = {
  light: 'light',
  dark: 'dark',
} as const

export type RadixButtonMode = keyof typeof RadixButtonMode

export type PersonaData = { field: string; value: string }

export const RequestStatus = {
  pending: 'pending',
  success: 'success',
  fail: 'fail',
  cancelled: 'cancelled',
} as const

export const RequestItemType = {
  loginRequest: 'loginRequest',
  dataRequest: 'dataRequest',
  sendTransaction: 'sendTransaction',
} as const

export type RequestItemType = typeof RequestItemType

export type RequestItemTypes = keyof typeof RequestItemType

export type RequestStatusTypes = keyof typeof RequestStatus

export type WalletRequest<
  RequestType extends RequestItemTypes,
  Status extends RequestStatusTypes,
  T = {}
> = {
  type: RequestType
  status: Status
  id: string
  timestamp: number
  showCancel?: boolean
  transactionIntentHash?: string
} & T

type WalletFailRequest<RequestType extends RequestItemTypes> = WalletRequest<
  RequestType,
  'fail',
  { error: string }
>

export type RequestItem =
  | WalletRequest<'loginRequest', 'pending'>
  | WalletRequest<'loginRequest', 'success'>
  | WalletFailRequest<'loginRequest'>
  | WalletRequest<'dataRequest', 'pending'>
  | WalletRequest<'dataRequest', 'success'>
  | WalletFailRequest<'dataRequest'>
  | WalletRequest<'sendTransaction', 'pending'>
  | WalletRequest<'sendTransaction', 'success'>
  | WalletFailRequest<'sendTransaction'>
