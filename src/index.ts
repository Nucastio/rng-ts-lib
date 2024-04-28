import type {
  ConstructorParams,
  DidRegisterParams,
  DidRegisterResponse,
  InitiateResponse,
  MintOracleDidResponse,
  UpdateOracleParams,
  UpdateOracleResponse,
} from "./@types/types";

export class RNG {
  network: 0 | 1;
  blockfrostApiKey: string;
  walletSeed: string;
  CBORhex: string;
  rngfid: string;
  rnlen: number;
  ogmiosUrl: string;
  RNG_API_URL: string;

  constructor({
    network,
    blockfrostApiKey,
    walletSeed,
    CBORhex,
    rngfid,
    rnlen,
    ogmiosUrl,
    RNG_API_URL,
  }: ConstructorParams & { RNG_API_URL?: string }) {
    this.network = network;
    this.blockfrostApiKey = blockfrostApiKey;
    this.walletSeed = walletSeed;
    this.CBORhex = CBORhex;
    this.rngfid = rngfid;
    this.rnlen = rnlen;
    this.ogmiosUrl = ogmiosUrl;
    this.RNG_API_URL = RNG_API_URL || "";
  }
  async initiate() {
    try {
      const response = await fetch(this.RNG_API_URL + "/api/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          network: this.network,
          blockfrostApiKey: this.blockfrostApiKey,
          walletSeed: this.walletSeed,
          CBORhex: this.CBORhex,
          rngfid: this.rngfid,
          rnlen: this.rnlen,
        }),
      });

      if (!response.ok) {
        const resJson = await response.json();
        console.log(resJson);
        throw new Error(`Failed to initiate RNG: ${response.statusText}`);
      }

      const responseData = (await response.json()) as InitiateResponse;
      return responseData;
    } catch (error) {
      throw new Error(`Error initializing RNG: ${error}`);
    }
  }
  async didRegister({ initiator, seedtxid, oracleDid }: DidRegisterParams) {
    try {
      const response = await fetch(this.RNG_API_URL + "/api/did-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          network: this.network,
          blockfrostApiKey: this.blockfrostApiKey,
          ogmiosUrl: this.ogmiosUrl,
          walletSeed: this.walletSeed,
          CBORhex: this.CBORhex,
          initiator,
          rngfid: this.rngfid,
          seedtxid,
          rnlen: this.rnlen,
          oracleDid,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to register`);
      }

      const responseData = (await response.json()) as DidRegisterResponse;
      return responseData;
    } catch (error) {
      throw new Error(`Error registering`);
    }
  }
  async updateOracle({
    lastUpdatedTx,
    oracleDid,
    seedtxid,
    initiator,
  }: UpdateOracleParams) {
    try {
      const response = await fetch(this.RNG_API_URL + "/api/update-oracle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          network: this.network,
          blockfrostApiKey: this.blockfrostApiKey,
          ogmiosUrl: this.ogmiosUrl,
          walletSeed: this.walletSeed,
          CBORhex: this.CBORhex,
          initiator,
          rngfid: this.rngfid,
          seedtxid,
          rnlen: this.rnlen,
          lastUpdatedTx,
          oracleDid,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update oracle");
      }

      const responseData = (await response.json()) as UpdateOracleResponse;
      return responseData;
    } catch (error) {
      throw new Error(`Error updating oracle`);
    }
  }
  async mintOracleDid(assetName: string) {
    try {
      const response = await fetch(this.RNG_API_URL + "/api/mint-oracle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          network: this.network,
          blockfrostApiKey: this.blockfrostApiKey,
          walletSeed: this.walletSeed,
          assetName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to mint oracle DID`);
      }

      const responseData = (await response.json()) as MintOracleDidResponse;
      return responseData;
    } catch (error) {
      throw new Error(`Error minting oracle DID`);
    }
  }
}
