// SPDX-License-Identifier: Mit

pragma solidity ^0.8.9;

contract TokenAddresses {
    string[] public initialTokens = ["USDT", 
    "LINK"
    ];
    address[] public initialAddresses = [
        0x4A9312ED635Ab730a0aa34cE9acD4681687Cc0ED, 
        0x326C977E6efc84E512bB9C30f76E30c160eD06FB
    ];


    function getDefaultTokens() public view returns(string[] memory){
        return initialTokens;
    }

    function getDefaultAddresses() public view returns(address[] memory){
        return initialAddresses;
    }
}

