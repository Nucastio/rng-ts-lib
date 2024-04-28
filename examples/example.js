const { RNG } = require("rng-lib");

// Initialize the RNG class object with provided parameters for rest of the functions
const rng = new RNG({
  network: 0, // Specify network: 0 for preprod, 1 for mainnet
  blockfrostApiKey: "YOUR_BLOCKFROST_API_KEY", // Your Blockfrost API key
  walletSeed: "YOUR_WALLET_SEED", // Your wallet seed
  CBORhex: "YOUR_CBOR_HEX", // CBOR hex value
  rngfid: "YOUR_RNGFID", // RNG file ID
  rnlen: 8, // Length of the random number
  ogmiosUrl: "YOUR_OGMIOS_URL", // Ogmios URL
});

rng
  .initiate()
  .then((responseData) => {
    console.log("Initiate response: ", responseData);
  })
  .catch((error) => {
    console.error("Error during initialization: ", error);
  });

// Mint an Oracle DID
rng
  .mintOracleDid("YOUR_ASSET_NAME") // Name of the asset
  .then((mintResponse) => {
    console.log("Minting response:", mintResponse);
  })
  .catch((error) => {
    console.error("Error during minting:", error.message);
  });

// Register the RNG DID
rng
  .didRegister({
    initiator: "INITIATOR_ADDRESS", // Address of the initiator
    seedtxid: "SEED_TRANSACTION_ID", // Seed transaction ID
    oracleDid: "ORACLE_DID", // Oracle DID (Decentralized Identifier)
  })
  .then((registerResponse) => {
    console.log("Registration response: ", registerResponse);
  })
  .catch((error) => {
    console.error("Error during registration:", error.message);
  });

// Update the Oracle
rng
  .updateOracle({
    initiator: "INITIATOR_ADDRESS", // Address of the initiator
    lastUpdatedTx: "LAST_UPDATED_TRANSACTION_ID", // Last updated transaction ID
    oracleDid: "ORACLE_DID", // Oracle DID (Decentralized Identifier)
    seedtxid: "SEED_TRANSACTION_ID", // Seed transaction ID
  })
  .then((updateResponse) => {
    console.log("Update response:", updateResponse);
  })
  .catch((error) => {
    console.error("Error during update:", error.message);
  });
