import { AxiosInstance } from "axios";
import { RNG as RNGClass } from "../index.js";

export declare interface IRNGParams {
  network: 0 | 1;
  blockfrostApiKey: string;
  walletSeed: string;
  oracleCBOR: string;
  rngCBOR: string;
  ogmiosURL: string;
  rngAPIURL: string;
  rngfid?: string;
  rngOutputLen?: number;
}

export interface IMintData {
  txHash: string;
  oracleDIDUnit: string;
}
export interface IRegisterData {
  txHash: string;
  oracleDIDUnit: string;
  rngOutput: string;
}
export interface IUpdateData {
  txHash: string;
  oracleDIDUnit: string;
  rngOutput: string;
}
export interface IQueryData {
  rngOutput: string;
}
export interface IInitData {
  txHash: string;
  datum: string;
  rngfid: string;
  rnlen: number;
}

export declare interface IOracle {
  mint: (
    this: RNGClass,
    oracleDIDName: string
  ) => Promise<{
    data: IMintData | undefined;
    success: boolean;
    error?: any;
  }>;

  register: (
    this: RNGClass,
    {
      initRNGTx,
      oracleDIDUnit,
    }: {
      oracleDIDUnit: string;
      initRNGTx: string;
    }
  ) => Promise<{
    data: IRegisterData | undefined;
    success: boolean;
    error: any;
  }>;

  update: (
    this: RNGClass,
    {
      initRNGTx,
      oracleDIDUnit,
      currUpdatedOracleDIDTx,
    }: {
      oracleDIDUnit: string;
      initRNGTx: string;
      currUpdatedOracleDIDTx: string;
    }
  ) => Promise<{
    data: IUpdateData | undefined;
    success: boolean;
    error: any;
  }>;

  query: (
    this: RNGClass,
    currUpdatedOracleDIDTx: string
  ) => Promise<{
    data: IQueryData | undefined;
    success: boolean;
    error: any;
  }>;
}

export declare class RNG {
  network: 0 | 1;
  blockfrostApiKey: string;
  walletSeed: string;
  oracleCBOR: string;
  rngCBOR: string;
  ogmiosURL: string;
  rngfid: string | undefined;
  rngOutputLen: number | undefined;

  instance: AxiosInstance;

  oracle: {
    /**
     * Mint Oracle DID function.
     *
     * @param oracleDIDName - Name of the Oracle DID (UTF-8 encoded)
     * @returns txHash - Transaction hash of Mint
     * @returns oracleDIDUnit - Unit ID of Oracle DID
     */
    mint: IOracle["mint"];

    /**
     * Register Oracle DID function.
     *
     * @param initRNGTx - Transaction hash of initiated RNG ID
     * @param oracleDIDUnit - Unit ID of Oracle DID
     * @returns txHash: Transaction hash of regitered Oracle DID
     * @returns oracleDIDUnit: Unit ID of Oracle DID
     * @returns rngOutput: Random number from the Oracle
     */
    register: IOracle["register"];

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
    update: IOracle["update"];

    /**
     * Query Oracle DID function.
     *
     * @param currUpdatedOracleDIDTx - Latest Oracle DID transaction hash for UTXO reference in the contract
     * @returns rngOutput: Random number from the Oracle
     */
    query: IOracle["query"];
  };

  constructor(props: IRNGParams);

  /**
   * Initiate RNG DID function.
   *
   * @returns txHash: Transaction hash of initiated RNG ID
   * @returns datum: Datum Hash
   * @returns rngfid: RNG ID
   * @returns rnlen: Random Number Length
   */
  init(this: RNG): Promise<{
    data: IInitData | undefined;
    success: boolean;
    error?: any;
  }>;

  /**
   * Generate random ID for RNG ID
   *
   * @returns RNG ID
   */
  getRandomID(): string;

  /**
   * Update key values in the class
   *
   */
  updateConfig<T extends keyof RNG>(key: T, value: RNG[T]): void;
}
