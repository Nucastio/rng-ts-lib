# RNG TS Lib

## Installation

To install the library:

```sh
npm install rng-ts-lib
```

## Usage

### Importing the Library

```ts
import { RNG } from "rng-ts-lib";
```

### Initialization

To initialize the RNG library, you need to provide the following parameters:

- `network`: The network to use (0 for testnet, 1 for mainnet).
- `blockfrostApiKey`: Your Blockfrost API key.
- `walletSeed`: The seed phrase for your wallet.
- `oracleCBOR`: Oracle Contract CBOR-encoded hexadecimal string.
- `rngCBOR`: RNG Contract CBOR-encoded hexadecimal string.
- `ogmiosURL`: The URL of the Ogmios server.
- `rngAPIURL`: The URL of the RNG API.
- `rngfid` (optional): The identifier for the RNG.
- `rngOutputLen` (optional): The length of the random number (default is 4).

Example:

```ts
const rng = new RNG({
  network: 0,
  blockfrostApiKey: "your-blockfrost-api-key",
  walletSeed: "your-wallet-seed",
  oracleCBOR: "oracle-cbor",
  rngCBOR: "rng-cbor",
  ogmiosURL: "https://ogmios-url",
  rngAPIURL: "https://rng-api-url",
});
```

### Methods

#### `init()`

Initiates an RNG DID.

- **Returns**:
  - `txHash`: Transaction hash of initiated RNG ID.
  - `datum`: Datum Hash.
  - `rngfid`: RNG ID.
  - `rnlen`: Random Number Length.

Example:

```ts
const initResult = await rng.init();
console.log(initResult);
```

#### `getRandomID()`

Generates a random ID for RNG ID.

- **Returns**: RNG ID.

Example:

```ts
const randomID = rng.getRandomID();
console.log(randomID);
```

#### `updateConfig()`

Updates key values in the class.

- **Parameters**:
  - `key`: The key to update.
  - `value`: The new value.

Example:

```ts
rng.updateConfig("network", 1);
```

### Oracle Functions

#### `mint(oracleDIDName: string)`

Mints an Oracle DID to the wallet.

- **Parameters**:

  - `oracleDIDName`: Name of the Oracle DID (UTF-8 encoded).

- **Returns**:
  - `txHash`: Transaction hash of Mint.
  - `oracleDIDUnit`: Unit ID of Oracle DID.

Example:

```ts
const mintResult = await rng.oracle.mint("my-oracle-did");
console.log(mintResult);
```

#### `register(initRNGTx: string, oracleDIDUnit: string)`

Registers the Oracle DID to the contract.

- **Parameters**:

  - `initRNGTx`: Transaction hash of initiated RNG ID.
  - `oracleDIDUnit`: Unit ID of Oracle DID.

- **Returns**:
  - `txHash`: Transaction hash of registered Oracle DID.
  - `oracleDIDUnit`: Unit ID of Oracle DID.
  - `rngOutput`: Random number from the Oracle.

Example:

```ts
const registerResult = await rng.oracle.register({
  initRNGTx: "init-rng-tx-hash",
  oracleDIDUnit: "oracle-did-unit",
});
console.log(registerResult);
```

#### `update(initRNGTx: string, oracleDIDUnit: string, currUpdatedOracleDIDTx: string)`

Updates the data to Oracle DID.

- **Parameters**:

  - `initRNGTx`: Transaction hash of initiated RNG ID.
  - `oracleDIDUnit`: Unit ID of Oracle DID.
  - `currUpdatedOracleDIDTx`: Latest Oracle DID transaction hash for UTXO reference in the contract.

- **Returns**:
  - `txHash`: Transaction hash of updated Oracle DID.
  - `oracleDIDUnit`: Unit ID of Oracle DID.
  - `rngOutput`: Random number from the Oracle.

Example:

```ts
const updateResult = await rng.oracle.update({
  initRNGTx: "init-rng-tx-hash",
  oracleDIDUnit: "oracle-did-unit",
  currUpdatedOracleDIDTx: "current-updated-oracle-did-tx",
});
console.log(updateResult);
```

#### `query(currUpdatedOracleDIDTx: string)`

Queries the RNG data of Oracle DID.

- **Parameters**:

  - `currUpdatedOracleDIDTx`: Latest Oracle DID transaction hash for UTXO reference in the contract.

- **Returns**:
  - `rngOutput`: Random number from the Oracle.

Example:

```ts
const queryResult = await rng.oracle.query("current-updated-oracle-did-tx");
console.log(queryResult);
```

### CLI App

For integrating this library, you can refer to this [repository](https://github.com/Nucastio/rng-ts-cli).
