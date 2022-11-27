const { ethers } = require("hardhat")

module.exports = async function({ getNamedAccounts, deployments}) {
    const { deploy, log, get} = deployments
    const { deployer } = getNamedAccounts()

    log("Deploying Box......")
    const box = await deploy("Box", {
        args: [],
        from: deployer,
        logs: true
    }) //this is box deployment
    //The box contract is deployed by the deployer

    const timelock = await ethers.getContract("TimeLock")
    const boxContract = await ethers.getContractAt("Box", box.address) //this is box contract
    const transferBoxTx = await boxContract.transferOwnership(timelock.address) //transeferring box's ownership from deployer to timelock
    const transferBoxReceipt = await transferBoxTx.wait(1)
}