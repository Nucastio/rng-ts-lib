import { RNG } from "../../index";
import { getErrorMessage } from "../../utils";

/**
 * Update Oracle DID function.
 *
 * @param initRNGTx - Transaction hash of initiated RNG ID
 * @param oracleDIDUnit - Unit ID of Oracle DID
 * @param currUpdatedOracleDIDTx - Latest Oracle DID transaction hash for UTXO reference in the contract
 * @returns txHash: Transaction hash of updated Oracle DID
 * @returns oracleDIDUnit: Unit ID of Oracle DID
 * @returns rngOutput: Random number from the Oracle
 */
export async function update(
  this: RNG,
  {
    initRNGTx,
    oracleDIDUnit,
    currUpdatedOracleDIDTx,
  }: {
    oracleDIDUnit: string;
    initRNGTx: string;
    currUpdatedOracleDIDTx: string;
  }
) {
  try {
    const { data } = await this.instance.post("/api/oracle/update", {
      network: this.network,
      blockfrostApiKey: this.blockfrostApiKey,
      ogmiosUrl: this.ogmiosURL,
      walletSeed: this.walletSeed,
      CBORhex: this.oracleCBOR,
      rngfid: this.rngfid,
      rnlen: this.rngOutputLen,
      initRNGTx: initRNGTx,
      oracleDIDUnit: oracleDIDUnit,
      currUpdatedOracleDIDTx: currUpdatedOracleDIDTx,
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
