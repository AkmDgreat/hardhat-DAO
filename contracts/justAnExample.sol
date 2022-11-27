//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

contract JustAnExample {
    event log(string message);

    function print() public {
        emit log("print called");
    }
}