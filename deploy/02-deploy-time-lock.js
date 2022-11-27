const { MIN_DELAY } = require("../helper-hardhat-config")

module.exports = async function({getNamedAccounts, deployments}) {
    const { deployer } = await getNamedAccounts()
    const { deploy, log, get} = deployments
    //const governanceToken = await get("GovernanceToken") //The Governor needs to be the admin of the timelock for any operation to be performed
    //const governorTokenAddress = governanceToken.address
    //log(`address of governanceToken contract is ${governorTokenAddress}`)
    log("Deploying TimeLock.......")
    const timeLock = await deploy("TimeLock", {
        from: deployer,
        args: [MIN_DELAY, [], [], /*governorTokenAddress*/ deployer],
        logs: true
    })
}


