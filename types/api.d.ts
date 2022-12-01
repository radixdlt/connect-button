import WalletSdk from '@radixdlt/wallet-sdk';
import { Subject } from 'rxjs';
export declare const onConnectSubject: Subject<void>;
export declare const onDestroySubject: Subject<void>;
export declare const configure: (input: Parameters<typeof WalletSdk>[0] & {
    onConnect: () => void;
    onDestroy?: () => void;
}) => {
    getWalletData: <Input extends Partial<{
        oneTimeAccountsWithoutProofOfOwnership: {
            numberOfAddresses?: number | undefined;
        };
        oneTimeAccountsWithProofOfOwnership: {
            numberOfAddresses?: number | undefined;
        };
        ongoingAccountsWithoutProofOfOwnership: {
            numberOfAddresses?: number | undefined;
        };
        ongoingAccountsWithProofOfOwnership: {
            numberOfAddresses?: number | undefined;
        };
        usePersona: {
            id: string;
        };
        loginWithoutChallenge: {};
        loginWithChallenge: {
            challenge: string;
        };
        oneTimePersonaData: {
            fields: string[];
        };
        ongoingPersonaData: {
            fields: string[];
        };
    }>, Output extends keyof Input extends "loginWithoutChallenge" | "loginWithChallenge" | "oneTimeAccountsWithProofOfOwnership" | "oneTimeAccountsWithoutProofOfOwnership" | "ongoingAccountsWithProofOfOwnership" | "usePersona" | "ongoingAccountsWithoutProofOfOwnership" | "oneTimePersonaData" | "ongoingPersonaData" ? { [Key in keyof Input]: (x: {
        loginWithoutChallenge: {
            login: {
                personaId: string;
            };
        };
        loginWithChallenge: {
            login: {
                personaId: string;
            };
        };
        oneTimeAccountsWithProofOfOwnership: {
            oneTimeAccounts: {
                account: {
                    address: string;
                    label: string;
                    appearanceId: number;
                };
                challenge: string;
                signature: string;
            }[];
        };
        oneTimeAccountsWithoutProofOfOwnership: {
            oneTimeAccounts: {
                address: string;
                label: string;
                appearanceId: number;
            }[];
        };
        ongoingAccountsWithProofOfOwnership: {
            ongoingAccounts: {
                account: {
                    address: string;
                    label: string;
                    appearanceId: number;
                };
                challenge: string;
                signature: string;
            }[];
        };
        usePersona: {
            persona: {
                id: string;
            };
        };
        ongoingAccountsWithoutProofOfOwnership: {
            ongoingAccounts: {
                address: string;
                label: string;
                appearanceId: number;
            }[];
        };
        oneTimePersonaData: {
            oneTimePersonaData: {
                value: string;
                field: string;
            }[];
        };
        ongoingPersonaData: {
            ongoingPersonaData: {
                value: string;
                field: string;
            }[];
        };
    }[Key]) => void; }[keyof Input] extends (x: infer T) => void ? T : never : never>(input: Input, eventCallback?: ((messageEvent: "receivedByExtension") => void) | undefined) => import("neverthrow").ResultAsync<Output, import("@radixdlt/wallet-sdk/dist/helpers/error").SdkError>;
    sendTransaction: (input: {
        transactionManifest: string;
        version: number;
        blobs?: string[] | undefined;
        message?: string | undefined;
    }, eventCallback?: ((messageEvent: "receivedByExtension") => void) | undefined) => import("neverthrow").ResultAsync<{
        transactionIntentHash: string;
    }, import("@radixdlt/wallet-sdk/dist/helpers/error").SdkError>;
    destroy: () => void;
    onConnect$: import("rxjs").Observable<void>;
};
export declare const getMethods: () => {
    getWalletData: <Input extends Partial<{
        oneTimeAccountsWithoutProofOfOwnership: {
            numberOfAddresses?: number | undefined;
        };
        oneTimeAccountsWithProofOfOwnership: {
            numberOfAddresses?: number | undefined;
        };
        ongoingAccountsWithoutProofOfOwnership: {
            numberOfAddresses?: number | undefined;
        };
        ongoingAccountsWithProofOfOwnership: {
            numberOfAddresses?: number | undefined;
        };
        usePersona: {
            id: string;
        };
        loginWithoutChallenge: {};
        loginWithChallenge: {
            challenge: string;
        };
        oneTimePersonaData: {
            fields: string[];
        };
        ongoingPersonaData: {
            fields: string[];
        };
    }>, Output extends keyof Input extends "loginWithoutChallenge" | "loginWithChallenge" | "oneTimeAccountsWithProofOfOwnership" | "oneTimeAccountsWithoutProofOfOwnership" | "ongoingAccountsWithProofOfOwnership" | "usePersona" | "ongoingAccountsWithoutProofOfOwnership" | "oneTimePersonaData" | "ongoingPersonaData" ? { [Key in keyof Input]: (x: {
        loginWithoutChallenge: {
            login: {
                personaId: string;
            };
        };
        loginWithChallenge: {
            login: {
                personaId: string;
            };
        };
        oneTimeAccountsWithProofOfOwnership: {
            oneTimeAccounts: {
                account: {
                    address: string;
                    label: string;
                    appearanceId: number;
                };
                challenge: string;
                signature: string;
            }[];
        };
        oneTimeAccountsWithoutProofOfOwnership: {
            oneTimeAccounts: {
                address: string;
                label: string;
                appearanceId: number;
            }[];
        };
        ongoingAccountsWithProofOfOwnership: {
            ongoingAccounts: {
                account: {
                    address: string;
                    label: string;
                    appearanceId: number;
                };
                challenge: string;
                signature: string;
            }[];
        };
        usePersona: {
            persona: {
                id: string;
            };
        };
        ongoingAccountsWithoutProofOfOwnership: {
            ongoingAccounts: {
                address: string;
                label: string;
                appearanceId: number;
            }[];
        };
        oneTimePersonaData: {
            oneTimePersonaData: {
                value: string;
                field: string;
            }[];
        };
        ongoingPersonaData: {
            ongoingPersonaData: {
                value: string;
                field: string;
            }[];
        };
    }[Key]) => void; }[keyof Input] extends (x: infer T) => void ? T : never : never>(input: Input, eventCallback?: ((messageEvent: "receivedByExtension") => void) | undefined) => import("neverthrow").ResultAsync<Output, import("@radixdlt/wallet-sdk/dist/helpers/error").SdkError>;
    sendTransaction: (input: {
        transactionManifest: string;
        version: number;
        blobs?: string[] | undefined;
        message?: string | undefined;
    }, eventCallback?: ((messageEvent: "receivedByExtension") => void) | undefined) => import("neverthrow").ResultAsync<{
        transactionIntentHash: string;
    }, import("@radixdlt/wallet-sdk/dist/helpers/error").SdkError>;
    destroy: () => void;
    onConnect$: import("rxjs").Observable<void>;
};
export declare const setState: ({ connected, loading, }: {
    connected: boolean;
    loading: boolean;
}) => void;
