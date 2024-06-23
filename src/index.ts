import { getInstance, getRandomID } from "utils";
import { init } from "./endpoints/init";
import type { IRNGParams, IOracle } from "./@types/types";
import { AxiosInstance } from "axios";
import { mint } from "endpoints/oracle/mint";
import { register } from "endpoints/oracle/register";
import { update } from "endpoints/oracle/update";
import { query } from "endpoints/oracle/query";

export class RNG {
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
    mint: IOracle["mint"];
    register: IOracle["register"];
    update: IOracle["update"];
    query: IOracle["query"];
  };

  constructor(props: IRNGParams) {
    const {
      ogmiosURL,
      oracleCBOR,
      rngAPIURL,
      rngCBOR,
      rngOutputLen,
      blockfrostApiKey,
      network,
      rngfid,
      walletSeed,
    } = props;

    this.network = network;
    this.blockfrostApiKey = blockfrostApiKey;
    this.walletSeed = walletSeed;
    this.oracleCBOR = oracleCBOR;
    this.rngCBOR = rngCBOR;
    this.ogmiosURL = ogmiosURL;
    this.rngfid = rngfid ?? this.getRandomID();
    this.rngOutputLen = rngOutputLen ?? 4;

    this.instance = getInstance({ apiURL: rngAPIURL });

    this.mint = this.mint.bind(this);
    this.register = this.register.bind(this);
    this.update = this.update.bind(this);
    this.query = this.query.bind(this);

    this.oracle = {
      mint: this.mint,
      register: this.register,
      update: this.update,
      query: this.query,
    };
  }

  /* RNG Actions */
  init = init;
  getRandomID = getRandomID;

  /* Oracle Actions */
  mint = mint;
  register = register;
  update = update;
  query = query;

  updateConfig<T extends keyof RNG>(key: T, value: RNG[T]) {
    const isKeyExists = this.hasOwnProperty(key);

    if (!isKeyExists) throw new Error(`'${key}' does not exist`);
    
    (this as RNG)[key] = value;
  }
}
