
const MIN_DELAY = 3600
const VOTING_PERIOD = 5 //5 blocks
const VOTING_DELAY = 1 //1 block
const QUORUM_PERCENTAGE = 4
const NEW_STORE_VALUE = 77
const FUNCTION = "store"
const PROPOSAL_DESCRIPTION = "Proposal #1: Store 77 in the Box"
const developmentChains = ["hardhat", "localhost"]
const proposalsFile = "proposals.json"

module.exports = { MIN_DELAY, VOTING_PERIOD, VOTING_DELAY, QUORUM_PERCENTAGE, NEW_STORE_VALUE, 
    FUNCTION, PROPOSAL_DESCRIPTION, developmentChains, proposalsFile}
