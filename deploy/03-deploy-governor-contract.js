const { QUORUM_PERCENTAGE, VOTING_DELAY, VOTING_PERIOD} = require("../helper-hardhat-config")

module.exports = async function({ deployments, getNamedAccounts }) {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const governanceToken = await get("GovernanceToken")
    const timeLock = await get("TimeLock")

    log("deploying GovernorContract.......")
    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: [governanceToken.address, timeLock.address, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE],
        logs: true
    })
}