const { ethers } = require("hardhat")

module.exports = async function({ deployments, getNamedAccounts }) {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()

    const timeLock = await ethers.getContract("TimeLock", deployer)
    const governor = await ethers.getContract("GovernorContract", deployer)

    log("Setting up roles...")
    const proposerRole = await timeLock.PROPOSER_ROLE()
    const executorRole = await timeLock.EXECUTOR_ROLE()
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

    //the deployer acc. is the admin, hence we r able to grant roles
    const proposerTx = await timeLock.grantRole(proposerRole, governor.address)// grant proposer's role to governotr
    const propserReceipt = await proposerTx.wait(1)
    const executorTx = await timeLock.grantRole(executorRole, "0x") // grant executor's role to nobody (ie. anybody can execute)
    const executorReceipt = await executorTx.wait(1)
    const revokeTx = await timeLock.revokeRole(adminRole, deployer) // revoke deployer's role as an admin
    const revokeReceipt = await revokeTx.wait(1)
}