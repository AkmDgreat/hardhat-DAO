//const { network, ethers } = require("hardhat")


module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("deploying governnance token.....")
    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        log: true,
    })

    log("deploying governnance token.....")
/*
    await delegate(governanceToken.address, deployer)
    log("Delegated!")

   
    const txResponse = await governanceToken.delegate(deployer)
    const txReceipt = await txResponse.wait(1)
    console.log(`Checkpoints: ${await governanceToken.numCheckpoints(deployer)}`)
 */  

}

// this function is called if someone wants to give their vote to someone else
/*
async function delegate(governanceTokenAddress, delegatedAccount) {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
    const txResponse = await governanceToken.delegate(delegatedAccount)
    const txReceipt = await txResponse.wait(1)
    console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}  
*/