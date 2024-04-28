export interface ConstructorParams {
  network: 0 | 1;
  blockfrostApiKey: string;
  walletSeed: string;
  CBORhex: string;
  rngfid: string;
  rnlen: number;
  ogmiosUrl: string;
}

export interface InitiateResponse {
  txId: string;
  datum: string;
  rngfid: string;
  rnlen: number;
}

export interface DidRegisterParams {
  initiator: string;
  seedtxid: string;
  oracleDid: string;
}

export interface UpdateOracleParams {
  lastUpdatedTx: string;
  oracleDid: string;
  seedtxid: string;
  initiator: string;
}

export interface MintOracleDidResponse {
  Tx_ID: string;
  assetName: string;
}

export interface DidRegisterResponse {
  txId: string;
  datum: string;
  initiator: string;
  rngfid: string;
  seedtxid: string;
  rnlen: number;
  oracleDid: string;
}

export interface UpdateOracleResponse {
  txId: string;
  datum: string;
  initiator: string;
  rngfid: string;
  seedtxid: string;
  rnlen: number;
  lastUpdatedTx: string;
  oracleDid: string;
}
