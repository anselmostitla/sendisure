// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IFeeReceiver {
  function _addTokens(string[] memory _tokens, address[] memory _addresses) external;
  function getAddress(string memory _token) external view returns(address);
}