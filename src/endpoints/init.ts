import { RNG } from "../index";
import { getErrorMessage } from "../utils";

/**
 * Initiate RNG DID function.
 *
 * @returns txHash: Transaction hash of initiated RNG ID
 * @returns datum: Datum Hash
 * @returns rngfid: RNG ID
 * @returns rnlen: Random Number Length
 */
export async function init(this: RNG) {
  try {
    const { data } = await this.instance.post<{
      data:
        | {
            txHash: string;
            datum: string;
            rngfid: string;
            rnlen: number;
          }
        | undefined;
      success: boolean;
      error?: any;
    }>("/api/rng/generate", {
      network: this.network,
      blockfrostApiKey: this.blockfrostApiKey,
      walletSeed: this.walletSeed,
      CBORhex: this.rngCBOR,
      rngfid: this.rngfid,
      rnlen: this.rngOutputLen,
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
