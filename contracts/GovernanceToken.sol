//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {

    uint256 public s_maxSupply = 1_000_000_000000000000000000;

    constructor()
        ERC20("GovernanceToken", "GT") 
        ERC20Permit("GovernanceToken") 
    {
        _mint(msg.sender, s_maxSupply);
    }

    function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount); 
    } // after we transfer the token, we call _afterTokenTransfer in ERC20Votes to update the snapshot

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount); //i think we r calling mint function in the parent contract
    }

    function _burn(address account, uint256 amount) internal override(ERC20Votes) {
        super._burn(account, amount);
    }
}
//The super keyword in Solidity gives access to the immediate parent contract from which the current contract is derived
// Someone knows a nice prposal is coming up
// So they buy a ton of tokens and use it when votin' starts
//To solve this, we take a snapshot of tokens people have at a certain block