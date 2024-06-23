import { RNG } from "../../index";
import { getErrorMessage } from "../../utils";

/**
 * Register Oracle DID function.
 *
 * @param initRNGTx - Transaction hash of initiated RNG ID
 * @param oracleDIDUnit - Unit ID of Oracle DID
 * @returns txHash: Transaction hash of regitered Oracle DID
 * @returns oracleDIDUnit: Unit ID of Oracle DID
 * @returns rngOutput: Random number from the Oracle
 */
export async function register(
  this: RNG,
  { initRNGTx, oracleDIDUnit }: { oracleDIDUnit: string; initRNGTx: string }
) {
  try {
    const { data } = await this.instance.post("/api/oracle/register", {
      network: this.network,
      blockfrostApiKey: this.blockfrostApiKey,
      ogmiosUrl: this.ogmiosURL,
      walletSeed: this.walletSeed,
      CBORhex: this.oracleCBOR,
      rngfid: this.rngfid,
      rnlen: this.rngOutputLen,
      initRNGTx: initRNGTx,
      oracleDIDUnit: oracleDIDUnit,
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
