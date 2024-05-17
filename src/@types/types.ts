export declare interface ConstructorParams {
  network: 0 | 1;
  blockfrostApiKey: string;
  walletSeed: string;
  CBORhex: string;
  rngfid: string;
  rnlen: number;
  ogmiosUrl: string;
  RNG_API_URL: string;
}

export declare interface DidRegisterParams {
  initiator: string;
  seedtxid: string;
  oracleDid: string;
}

export declare interface DidRegisterResponse {
  txId: string;
  datum: string;
  initiator: string;
  rngfid: string;
  seedtxid: string;
  rnlen: number;
  oracleDid: string;
}

export declare interface InitiateResponse {
  txId: string;
  datum: string;
  rngfid: string;
  rnlen: number;
}

export declare interface MintOracleDidResponse {
  Tx_ID: string;
  assetName: string;
}

export declare interface UpdateOracleParams {
  lastUpdatedTx: string;
  oracleDid: string;
  seedtxid: string;
  initiator: string;
}

export declare interface UpdateOracleResponse {
  txId: string;
  datum: string;
  initiator: string;
  rngfid: string;
  seedtxid: string;
  rnlen: number;
  lastUpdatedTx: string;
  oracleDid: string;
}

export declare class RNG {
  constructor(options: ConstructorParams);

  initiate(): Promise<{
    txId: string;
    datum: string;
    rngfid: string;
    rnlen: number;
  }>;
  didRegister(params: {
    initiator: string;
    seedtxid: string;
    oracleDid: string;
  }): Promise<{
    txId: string;
    datum: string;
    initiator: string;
    rngfid: string;
    seedtxid: string;
    rnlen: number;
    oracleDid: string;
  }>;
  updateOracle(params: {
    lastUpdatedTx: string;
    oracleDid: string;
    seedtxid: string;
    initiator: string;
  }): Promise<{
    txId: string;
    datum: string;
    initiator: string;
    rngfid: string;
    seedtxid: string;
    rnlen: number;
    lastUpdatedTx: string;
    oracleDid: string;
  }>;
  mintOracleDid(assetName: string): Promise<{
    Tx_ID: string;
    assetName: string;
  }>;
}
