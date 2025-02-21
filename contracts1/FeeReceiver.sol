// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error UnMatchedSizes();

contract FeeReceiver {

  string[] tokens;
  address[] addresses;

  mapping (string=>address) public addressOf;

  constructor (string[] memory _tokens, address[] memory _addresses){
    _addTokens(_tokens, _addresses);
  }

  function _addToken(string memory _token, address _address) internal {
      if(addressOf[_token]==address(0)) {
          tokens.push(_token);
      }
      addressOf[_token] = _address;
  }

  function _addTokens(string[] memory _tokens, address[] memory _addresses) public {
      if(_tokens.length != _addresses.length){
          revert UnMatchedSizes();
      }
      for(uint8 i=0; i<_tokens.length; i++){
          _addToken(_tokens[i], _addresses[i]);
      }
  }

  function getAddress(string memory _token) public view returns(address){
    return addressOf[_token];
  }

  function getBalanceOf(string memory _token) public view returns(uint256){
    return IERC20(addressOf[_token]).balanceOf(address(this));
  }

  // function addTokens(string[] memory _tokens, address[] memory _addresses) public onlyRecipient(){
  //     _addTokens(_tokens, _addresses);
  // }

  // function updateTokens() public {
  // }

}