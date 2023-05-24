# getQuotePriceX96

Refer to original source
https://github.com/Uniswap/v3-periphery/blob/main/contracts/libraries/OracleLibrary.sol

Steps to reproduce:
1. npm install
2. Change the token address on index.js file
3. Get the Tick value from LP contract OR using graphql for the pool's tick
4. Pass the tick value to the main( ... ) function
5. node index.js
