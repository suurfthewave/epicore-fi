// Storage for user data variables
let address
let web3
let balance
let amount
let totalContributed
let contract

let LPbal
let LPrewards
let LPstaked
let ethContributedbyUser
let LPperEthUnit = 8932912893647757921
let tokenAllowance
let myLPTokens = 0

// The contract addresses and ABIs
const epicoreAddress = '0xB44551B24486c6510788ba6c58FA86997Ca1217A'
const LPTokenAddress = ''
const epicoreVaultAddress = ''
const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

$(document).ready(function () {
    metamaskLogin()
    var x = setInterval(async function () {

        const isMetaMaskInstalled = () => {
            const { ethereum } = window;
            return Boolean(ethereum && ethereum.isMetaMask);
        };
        if (isMetaMaskInstalled() && address != undefined) loadVault()
    }, 10000);

});



const ABI = {
    epicoreToken: [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fromDelegate", "type": "address" }, { "indexed": true, "internalType": "address", "name": "toDelegate", "type": "address" }], "name": "DelegateChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegate", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "previousBalance", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newBalance", "type": "uint256" }], "name": "DelegateVotesChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "LPTokenClaimed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "dst", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "LiquidityAddition", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "log", "type": "string" }], "name": "Log", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DELEGATION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "LPGenerationCompleted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "LPperETHUnit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "agreesToTermsOutlinedInLiquidityGenerationParticipationAgreement", "type": "bool" }], "name": "addLiquidity", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "addLiquidityToUniswapepicorexWETHPair", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint32", "name": "", "type": "uint32" }], "name": "checkpoints", "outputs": [{ "internalType": "uint32", "name": "fromBlock", "type": "uint32" }, { "internalType": "uint256", "name": "votes", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "claimLPTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "contractStartTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "router", "type": "address" }, { "internalType": "address", "name": "factory", "type": "address" }], "name": "createUniswapPairMainnet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }], "name": "delegate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "delegateBySig", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegator", "type": "address" }], "name": "delegates", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "emergencyDrain24hAfterLiquidityGenerationEventIsDone", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "ethContributed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "feeDistributor", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getCurrentVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "blockNumber", "type": "uint256" }], "name": "getPriorVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getSecondsLeftInLiquidityGenerationEvent", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "initialSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "liquidityGenerationOngoing", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "liquidityGenerationParticipationAgreement", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "numCheckpoints", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeDistributor", "type": "address" }], "name": "setFeeDistributor", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_transferCheckerAddress", "type": "address" }], "name": "setShouldTransferChecker", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokenUniswapPair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalETHContributed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalLPTokensMinted", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "transferCheckerAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "uniswapFactory", "outputs": [{ "internalType": "contract IUniswapV2Factory", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "uniswapRouterV2", "outputs": [{ "internalType": "contract IUniswapV2Router02", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }],
    LPToken: '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]',
    epicoreVault: '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"SuperAdminTransfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"},{"internalType":"bool","name":"_withdrawable","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_","type":"uint256"}],"name":"addPendingRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"averageFeesPerBlockEpoch","outputs":[{"internalType":"uint256","name":"averagePerBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"averageFeesPerBlockSinceStart","outputs":[{"internalType":"uint256","name":"averagePerBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnSuperAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractStartBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cumulativeRewardsSinceStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"epicore","outputs":[{"internalType":"contract INBUNIERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"depositFor","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"epochCalculationStartBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"epochRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract INBUNIERC20","name":"_epicore","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"address","name":"superAdmin","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"isContract","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"newSuperAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingepicore","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"accepicorePerShare","type":"uint256"},{"internalType":"bool","name":"withdrawable","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardsInThisEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setAllowanceForPoolToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_DEV_FEE","type":"uint16"}],"name":"setDevFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"setDevFeeReciever","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"bool","name":"_withdrawable","type":"bool"}],"name":"setPoolWithdrawable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"contractAddress","type":"address"}],"name":"setStrategyContractOrDistributionContractAllowance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startNewEpoch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"superAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
    ERC20: '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]'
}

async function metamaskLogin() {
    let ethereum = window.ethereum;
    if (typeof ethereum == 'undefined') {
        console.log("Metamask is not installed");
        return;
    }


    let accounts = await ethereum.enable();
    let account = accounts[0];
    web3 = new Web3()
    web3.setProvider(ethereum);
    const chainId = await ethereum.request({
        method: 'eth_chainId',
    })
    if (chainId != "0x01" && chainId != "0x1") {
        document.getElementById('warning').innerHTML = 'Your MetaMask is set on the incorrect chain. Please switch to ETH mainnet.'
        return;
    }
    address = account;
    balance = await web3.eth.getBalance(address);
    balance = balance / 1000000000000000000
    walletconnect.innerText = address.slice(0, 6) + ".." + address.slice(36) + " [" + balance.toFixed(4) + " ETH]"

    $("#metamaskwallet").disabled = true;
    var contract = new web3.eth.Contract(ABI.epicoreToken, epicoreAddress);
    ethContributedbyUser = await contract.methods.ethContributed(address).call();
    var LPToken = new web3.eth.Contract(JSON.parse(ABI.LPToken), LPTokenAddress)
    var allowance = await LPToken.methods.allowance(address, epicoreVaultAddress).call();
    tokenAllowance = allowance / 10 ** 18


    let epicoreVault = new web3.eth.Contract(JSON.parse(ABI.epicoreVault), epicoreVaultAddress)
    const wethContract = new web3.eth.Contract(JSON.parse(ABI.ERC20), weth)
    var totLP = await LPToken.methods.totalSupply().call()
    var wethLP = await wethContract.methods.balanceOf(LPTokenAddress).call()
    var lpLocked = await LPToken.methods.balanceOf(epicoreVaultAddress).call()
    var averageRewards = await epicoreVault.methods.averageFeesPerBlockSinceStart().call()
    var epicoreLPBalance = await contract.methods.balanceOf(LPTokenAddress).call()
    var perEtherLP = wethLP / totLP
    perEtherLP = perEtherLP * 2
    var ethPerEPICORE = wethLP / epicoreLPBalance
    var lpValueLocked = web3.utils.fromWei(lpLocked, 'ether') * perEtherLP
    var EPICOREPerYear = web3.utils.fromWei(averageRewards, 'ether') * 2103840
    var ethPerYear = EPICOREPerYear * ethPerEPICORE
    var apy = ethPerYear / lpValueLocked * 100
    apy = apy.toFixed(3)
    document.getElementById('epicore-apy').innerText = "~" + apy + "% APY"

}



//********************************************** 
//            New functionalities              *
//**********************************************

$("#stake-amount").bind('input', function () {
    var stakeAmount = document.getElementById('stake-amount').value
    console.log(stakeAmount);
    if (stakeAmount > tokenAllowance) {
        document.getElementById('stakeLPbutton').disabled = true
    }
    else if (stakeAmount <= tokenAllowance) {
        document.getElementById('stakeLPbutton').disabled = false
    }

    if (stakeAmount > myLPTokens) {
        document.getElementById('approveLPbutton').disabled = true
    }
    else if (stakeAmount <= myLPTokens) {
        document.getElementById('approveLPbutton').disabled = false
    }
})


async function claim() {
    return;
    contract = new web3.eth.Contract(ABI.epicoreToken, epicoreAddress);
    const send = await new Promise((resolve, reject) => {
        contract.methods.claimLPTokens().send({
            from: address
        }), (function (error, result) {
            resolve(result)
        })
    })
    // document.getElementById('claim').innerText = 'Claiming'
    // document.getElementById('claim').disabled = true
    let checkTx = setInterval(async function () {
        const tx = await new Promise((resolve, reject) => {
            web3.eth.getTransactionReceipt(send, function (error, result) {
                if (result) resolve(result)
                else reject()
            })
        })
        if (tx) {
            clearInterval(checkTx)
            // document.getElementById('deposit').innerText = 'Claim'
            // document.getElementById('deposit').disabled = false
            // document.getElementById('success').innerText = 'Claim confirmed!'
            setTimeout(function () {
                // document.getElementById('success').innerText = ''
            }, 15000)
        }
    }, 10 * 1000)
}

async function loadVault() {
    stakeLPshow()
    $.getJSON('https://api.etherscan.io/api?module=account&action=tokenbalance&address=' + epicoreVaultAddress + '&contractaddress=' + LPTokenAddress + '&apikey=TIVK17YBBWKMEF981K99Z38APIM172VMDT', function (data) {
        const dataLP = data.result
        let lpb = Math.floor(web3.utils.fromWei(dataLP, 'ether') * 10000) / 10000
        document.getElementById('tokens-locked').innerText = lpb
    })
    if (!address)
        return;
    $.getJSON('https://api.etherscan.io/api?module=account&action=tokenbalance&address=' + address + '&contractaddress=' + LPTokenAddress + '&apikey=TIVK17YBBWKMEF981K99Z38APIM172VMDT', function (data) {
        myLPTokens = data.result / 10 ** 18
        if (data.result > 0) {
            LPbal = data.result;
            let lpb = Math.floor(web3.utils.fromWei(LPbal, 'ether') * 100000) / 100000
            document.getElementById('lp-balance').innerText = "Claimed LP Tokens : " + lpb
        } else {
            LPbal = 0
            let lpb = Math.floor(web3.utils.fromWei(LPbal, 'ether') * 100000) / 100000
            let claimableLP = ethContributedbyUser * LPperEthUnit / 1e18;
            document.getElementById('lp-balance').innerText = "LP tokens to claim: " + web3.utils.fromWei(claimableLP, 'ether')
        }
    })
    var vault = new web3.eth.Contract(JSON.parse(ABI.epicoreVault), epicoreVaultAddress)
    var pendingEpicore = await vault.methods.pendingepicore("1", address).call()

    document.getElementById('claimable-epicore').innerText = Math.floor(web3.utils.fromWei(pendingEpicore, 'ether') * 100000) / 100000
    LPstaked = await vault.methods.userInfo("1", address).call()
    LPstaked = LPstaked.amount
    document.getElementById('my-token').textContent = Math.floor(web3.utils.fromWei(LPstaked, 'ether') * 100000) / 100000
    var contract = new web3.eth.Contract(ABI.EpicoreToken, epicoreAddress);
    ethContributedbyUser = await contract.methods.ethContributed(address).call();
    var LPToken = new web3.eth.Contract(JSON.parse(ABI.LPToken), LPTokenAddress)
    var allowance = await LPToken.methods.allowance(address, EpicoreVaultAddress).call();
    tokenAllowance = allowance / 10 ** 18

    let EpicoreVault = new web3.eth.Contract(JSON.parse(ABI.epicoreVault), epicoreVaultAddress)
    const wethContract = new web3.eth.Contract(JSON.parse(ABI.ERC20), weth)
    var totLP = await LPToken.methods.totalSupply().call()
    var wethLP = await wethContract.methods.balanceOf(LPTokenAddress).call()
    var lpLocked = await LPToken.methods.balanceOf(epicoreVaultAddress).call()
    var averageRewards = await epicoreVault.methods.averageFeesPerBlockSinceStart().call()
    var epicoreLPBalance = await contract.methods.balanceOf(LPTokenAddress).call()
    var perEtherLP = wethLP / totLP
    perEtherLP = perEtherLP * 2
    var ethPerEPICORE = wethLP / epicoreLPBalance
    var lpValueLocked = web3.utils.fromWei(lpLocked, 'ether') * perEtherLP
    var EPICOREPerYear = web3.utils.fromWei(averageRewards, 'ether') * 2103840
    var ethPerYear = EPICOREPerYear * ethPerEPICORE
    var apy = ethPerYear / lpValueLocked * 100
    apy = apy.toFixed(3)
    document.getElementById('epicore-apy').innerText = "~" + apy + "% APY"
}

async function stakeLPshow() {
    var LPToken = new web3.eth.Contract(JSON.parse(ABI.LPToken), LPTokenAddress)
    const allowance = await LPToken.methods.allowance(address, epicoreVaultAddress).call()
    if (allowance < 100000000) {
        document.getElementById('stakeLPbutton').disabled = true
        document.getElementById('approveLPbutton').disabled = false
    } else {
        document.getElementById('stakeLPbutton').disabled = false
        document.getElementById('approveLPbutton').disabled = true
    }
}
async function approveLP() {
    var LPToken = new web3.eth.Contract(JSON.parse(ABI.LPToken), LPTokenAddress)
    let inputAmount = document.getElementById('stake-amount').value
    const approve = await new Promise((resolve, reject) => {
        LPToken.methods.approve(epicoreVaultAddress, web3.utils.toWei(inputAmount, 'ether')).send({
            from: address
        }, function (error, transactionHash) {
            if (transactionHash)
                resolve(transactionHash)
            else
                reject()
        })
    }
    )
    if (!approve)
        return
    document.getElementById('loading').style.visibility = 'visible'
    document.getElementById('approveLPbutton').innerText = 'Approving...'
    document.getElementById('approveLPbutton').disabled = true
    let checkTx = setInterval(async function () {
        const allowance = await LPToken.methods.allowance(address, epicoreVaultAddress).call()
        if (allowance > 100) {
            clearInterval(checkTx)
            stakeLPshow()
            document.getElementById('stake-amount').value = allowance / 10 ** 18
            document.getElementById('loading').style.visibility = 'hidden'
            document.getElementById('approveLPbutton').innerText = 'Approve'
        }
    }, 10 * 1000)
}
async function emergencyWithdraw() {
    var vault = new web3.eth.Contract(JSON.parse(ABI.epicoreVault), epicoreVaultAddress)
    const deposit = await new Promise((resolve, reject) => {
        vault.methods.emergencyWithdraw("1").send({
            from: address
        }, function (error, transactionHash) {
            if (transactionHash)
                resolve(transactionHash)
            else
                reject()
        })
    })
}

async function stakeLP() {
    var vault = new web3.eth.Contract(JSON.parse(ABI.epicoreVault), epicoreVaultAddress)
    var amount = document.getElementById('stake-amount').value
    if (!amount)
        return;
    const deposit = await new Promise((resolve, reject) => {
        vault.methods.deposit("1", web3.utils.toWei(amount, 'ether')).send({
            from: address
        }, function (error, transactionHash) {
            if (transactionHash)
                resolve(transactionHash)
            else
                reject()
        })
    }
    )
    if (!deposit)
        return;
    document.getElementById('loading').style.visibility = 'visible'
    document.getElementById('stakeLPbutton').innerText = 'Staking...'
    document.getElementById('stakeLPbutton').disabled = true
    let checkTx = setInterval(async function () {
        const tx = await web3.eth.getTransactionReceipt(deposit)
        if (tx) {
            clearInterval(checkTx)
            document.getElementById('stakeLP').style.visibility = 'hidden'
            document.getElementById('notice').style.position = 'initial'
            document.getElementById('loading').style.visibility = 'hidden'
            document.getElementById('stakeLPbutton').innerText = 'Stake'
        }
    }, 10 * 1000)
}
async function claimLP() {
    var vault = new web3.eth.Contract(JSON.parse(ABI.epicoreVault), epicoreVaultAddress)
    const claim = await new Promise((resolve, reject) => {
        vault.methods.withdraw("1", "0").send({
            from: address
        }, function (error, transactionHash) {
            if (transactionHash)
                resolve(transactionHash)
            else
                reject()
        })
    }
    )
    if (!claim)
        return
    document.getElementById('claimLP').innerText = "Claiming..."
    document.getElementById('claimLP').disabled = true
    // document.getElementById('loading2').style.visibility = 'visible'
    let checkTx = setInterval(async function () {
        const tx = await web3.eth.getTransactionReceipt(claim)
        if (tx) {
            clearInterval(checkTx)
            document.getElementById('claimLP').innerText = "Claim"
            document.getElementById('claimLP').disabled = false
            // document.getElementById('loading2').style.visibility = 'hidden'
        }
    }, 10 * 1000)
}
async function withdrawLP() {
    var vault = new web3.eth.Contract(JSON.parse(ABI.epicoreVault), epicoreVaultAddress)
    const withdraw = await new Promise((resolve, reject) => {
        vault.methods.withdraw("1", web3.utils.toWei(document.getElementById('withdrawLPamount').value, 'ether')).send({
            from: address
        }, function (error, transactionHash) {
            if (transactionHash)
                resolve(transactionHash)
            else
                reject()
        })
    }
    )
    // document.getElementById('loading2').style.visibility = 'visible'
    document.getElementById('withdrawLPbutton').disabled = true
    document.getElementById('withdrawLPbutton').innerText = 'Withdrawing...'
    let checkTx = setInterval(async function () {
        const tx = await web3.eth.getTransactionReceipt(withdraw)
        if (tx) {
            clearInterval(checkTx)
            // document.getElementById('loading2').style.visibility = 'hidden'
            document.getElementById('withdrawLPbutton').disabled = false
            document.getElementById('withdrawLPbutton').innerText = 'Withdraw'
        }
    }, 10 * 1000)
}


async function fillMaxLP() {
    var vault = new web3.eth.Contract(JSON.parse(ABI.epicoreVault), epicoreVaultAddress)
    var allStaked = await vault.methods.userInfo("1", address).call()
    allStaked = allStaked.amount
    document.getElementById("withdrawLPamount").value = allStaked / 10 ** 18;
}

async function showStakeDiv() {
    var x = document.getElementById("stake-div");
    var y = document.getElementById("withdraw-div");
    var z = document.getElementById("claim-div");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "none";
    } else {
        // x.style.display = "none";
        // y.style.display = "none";
        // z.style.display = "none";
    }
}
async function showWithdrawDiv() {
    var x = document.getElementById("stake-div");
    var y = document.getElementById("withdraw-div");
    var z = document.getElementById("claim-div");

    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "block";
}
async function showClaimDiv() {
    var x = document.getElementById("stake-div");
    var y = document.getElementById("withdraw-div");
    var z = document.getElementById("claim-div");
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "none";
}
async function hideAllDiv() {
    var x = document.getElementById("stake-div");
    var y = document.getElementById("withdraw-div");
    var z = document.getElementById("claim-div");
    x.style.display = "block";
    y.style.display = "none";
    z.style.display = "none";
    document.getElementById('loading').style.visibility = 'hidden'
}
hideAllDiv()
