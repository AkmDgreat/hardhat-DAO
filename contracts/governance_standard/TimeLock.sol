//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    //minDelay: delay b/w proposal-passing and proposal-executing
    //proposers: The list of addresses of people who can propose (in r contract, every1 can propose)
    //executors: people who can execute once the propsal passes (here, everybody)

    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}