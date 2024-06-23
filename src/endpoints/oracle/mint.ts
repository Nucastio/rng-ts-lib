import { RNG } from "../../index";
import { getErrorMessage } from "../../utils";

/**
 * Mint Oracle DID function.
 *
 * @param oracleDIDName - Name of the Oracle DID (UTF-8 encoded)
 * @returns txHash - Transaction hash of Mint
 * @returns oracleDIDUnit - Unit ID of Oracle DID
 */
export async function mint(this: RNG, oracleDIDName: string) {
  try {
    const { data } = await this.instance.post("/api/oracle/mint", {
      network: this.network,
      blockfrostApiKey: this.blockfrostApiKey,
      walletSeed: this.walletSeed,
      oracleDIDName: oracleDIDName,
    });

    return data;
  } catch (error) {
    return {
      data: undefined,
      error: getErrorMessage(error),
      success: false,
    };
  }
}
