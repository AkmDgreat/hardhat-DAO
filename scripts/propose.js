const { ethers, network } = require("hardhat")
const { NEW_STORE_VALUE, FUNCTION, PROPOSAL_DESCRIPTION, developmentChains, VOTING_DELAY, proposalsFile } = require("../helper-hardhat-config")
const { moveBlocks } = require("../utils/move-blocks-forward-in-time")
const fs = require("fs")

module.exports = async function propose(args, functionToCall, proposalDescription ) {
    const governor = await ethers.getContract("GovernorContract")
    const box = await ethers. getContract("Box")
    const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args) // converts function to calldata 
    console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`)

    /* function propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description) */
    const proposeTx = await governor.propose(
        [box.address],
        [0],
        [encodedFunctionCall],
        proposalDescription
    )
    const proposeReceipt = await proposeTx.wait(1)

    //We will speed up the voting_delay by mining the blocks (its like moving forward in time)
    //This thing can only be done in localhost
    if (developmentChains.includes(network.name)) {
        moveBlocks(VOTING_DELAY + 1)
    }

    // when propose function is called, inside the first event, there's a proposalId which we'll need while votin'
    const proposalId = proposeReceipt.events[0].args.proposalId

    let proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
    proposals[network.config.chainId.toString()].push(proposalId.toString())
    fs.writeFileSync(proposalsFile, JSON.stringify(proposals))
}


//we are calling the store function (in box.sol) and passing it 77 as the argument
propose([NEW_STORE_VALUE], FUNCTION, PROPOSAL_DESCRIPTION)
    .then(process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })