const { ethers } = require("ethers");
const JSBI = require("jsbi");
const { TickMath, FullMath } = require("@uniswap/v3-sdk");

const baseToken = '0x49d532498ff8a6835e9bf537b22d416c05eaccc9'; // zkPEPE
const quoteToken = '0x8ad2ace83d6d2ba46774b70813d74a4ac0038237'; // zkUSD

const provider = new ethers.providers.JsonRpcProvider('https://testnet.era.zksync.dev');

async function main(
    baseToken,
    quoteToken,
    inputAmount,
    currentTick,
    baseTokenDecimals,
    quoteTokenDecimals,
) {
    const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(currentTick);
    const ratioX192 = JSBI.multiply(sqrtRatioX96, sqrtRatioX96);

    const baseAmount = JSBI.BigInt(inputAmount * (10**baseTokenDecimals));

    const shift = JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(192));

    const quoteAmount = FullMath.mulDivRoundingUp(ratioX192, baseAmount, shift);
    console.log(quoteAmount.toString() / (10 ** quoteTokenDecimals));
}

main(
    baseToken,
    quoteToken,
    1, // Amount of zkPEPE
    102354, // Current Tick queried on LP contracts / subgraph also can
    8, // baseToken Decimals
    8, // quoteToken Decimals
)