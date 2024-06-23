import { RNG } from "../../index";
import { getErrorMessage } from "../../utils";

/**
 * Query Oracle DID function.
 *
 * @param currUpdatedOracleDIDTx - Latest Oracle DID transaction hash for UTXO reference in the contract
 * @returns rngOutput: Random number from the Oracle
 */
export async function query(this: RNG, currUpdatedOracleDIDTx: string) {
  try {
    const { data } = await this.instance.post("/api/oracle/query", {
      network: this.network,
      blockfrostApiKey: this.blockfrostApiKey,
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
