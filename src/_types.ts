export type Account = { label: string; address: string; appearanceId: number }

export const personaDataField = {
  givenName: 'givenName',
  familyName: 'familyName',
  emailAddress: 'emailAddress',
  phoneNumber: 'phoneNumber',
} as const

export type ExplorerConfig = {
  baseUrl: string
  accountsPath: string
  transactionPath: string
}

export type PersonaDataField = keyof typeof personaDataField

export type PersonaData = { field: PersonaDataField; value: string }

export const RequestStatus = {
  pending: 'pending',
  success: 'success',
  fail: 'fail',
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
  showCancel?: boolean
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
  | WalletRequest<
      'sendTransaction',
      'success',
      { transactionIntentHash: string }
    >
  | WalletFailRequest<'sendTransaction'>
