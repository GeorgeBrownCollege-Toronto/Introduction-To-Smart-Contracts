// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Greeter {
    string public yourName;

    function hello() public view returns (string memory) {
        return yourName;
    }

    function set(string memory _yourName) public {
        yourName = _yourName;
    }
}