export class RNG {
  network: number;
  blockfrostApiKey: string;
  walletSeed: string;
  CBORhex: string;
  rngfid: string;
  rnlen: number;
  ogmiosUrl: string;

  constructor({
    network,
    blockfrostApiKey,
    walletSeed,
    CBORhex,
    rngfid,
    rnlen,
    ogmiosUrl,
  }: ConstructorParams & { RNG_API_URL?: string });

  initiate(): Promise<InitiateResponse>;
  didRegister(params: DidRegisterParams): Promise<DidRegisterResponse>;
  updateOracle(params: UpdateOracleParams): Promise<UpdateOracleResponse>;
  mintOracleDid(assetName: string): Promise<MintOracleDidResponse>;
}

interface ConstructorParams {
  network: number;
  blockfrostApiKey: string;
  walletSeed: string;
  CBORhex: string;
  rngfid: string;
  rnlen: number;
  ogmiosUrl: string;
}

interface InitiateResponse {
  txId: string;
  datum: string;
  rngfid: string;
  rnlen: number;
}

interface DidRegisterParams {
  initiator: string;
  seedtxid: string;
  oracleDid: string;
}

interface UpdateOracleParams {
  lastUpdatedTx: string;
  oracleDid: string;
  seedtxid: string;
  initiator: string;
}

interface MintOracleDidResponse {
  Tx_ID: string;
  assetName: string;
}

interface DidRegisterResponse {
  txId: string;
  datum: string;
  initiator: string;
  rngfid: string;
  seedtxid: string;
  rnlen: number;
  oracleDid: string;
}

interface UpdateOracleResponse {
  txId: string;
  datum: string;
  initiator: string;
  rngfid: string;
  seedtxid: string;
  rnlen: number;
  lastUpdatedTx: string;
  oracleDid: string;
}
