// SPDX-License-Identifier:Mit

pragma solidity ^0.8.9;

import "./Escrow.sol";
import "./Routes.sol";
import "./IFeeReceiver.sol";

contract EscrowFactory {

  uint256 public currentContractId;

  mapping (address => uint256[]) public idsHistory;
  mapping (string => bool) public existRoute;

  struct S_Contract {
      uint256 contractId;
      address contractAddress;
      bool active;
      uint256 createdAt;
      string route;
  }

  mapping (uint256 => S_Contract) contractOf;
  mapping (string => address) public addressAssociateToRoute; // addressAssociatedToURL

  // Maybe I don't need this:
  address feeReceiverContractAddress;
  constructor(address _feeReceiverContractAddress) {
    feeReceiverContractAddress = _feeReceiverContractAddress;
  }

  function create(string[] memory socialNames, string[] memory socialLinks, string memory routeLink, string memory routeLinkInLower,
                  string[] memory initialTokens, address[] memory initialTokenAddresses) public {
    require(socialNames.length == socialLinks.length, "SOCIAL PROFILES UNMATCHED");
    require( !isRouteInUse(routeLinkInLower), "ROUTE IN USE" );
    require(initialTokens.length == initialTokenAddresses.length,"TOKENS TO ADDRESSES UNMATCHED");
    
    S_Contract memory newContract;
    Escrow escrow = new Escrow(msg.sender, socialNames, socialLinks, initialTokens, initialTokenAddresses, feeReceiverContractAddress);

    newContract.contractId = currentContractId;
    newContract.contractAddress = address(escrow);
    newContract.active = true;
    newContract.createdAt = block.timestamp;
    newContract.route = routeLink;

    existRoute[routeLinkInLower] = true;
    addressAssociateToRoute[routeLinkInLower] = address(escrow);
    idsHistory[msg.sender].push(currentContractId);

    contractOf[currentContractId] = newContract;
    currentContractId += 1;
  }

  function renewContract(uint256 id, string[] memory socialNames, string[] memory socialLinks, string memory routeLink, string memory routeLinkInLower,
                  string[] memory initialTokens, address[] memory initialTokenAddresses) public {
    destroy(id);
    existRoute[routeLinkInLower] = false;
    create(socialNames, socialLinks, routeLink, routeLinkInLower, initialTokens, initialTokenAddresses);
  }

  function destroy(uint256 id) public {
      contractOf[id].active = false;
  }

  function getContract(uint256 id) public view returns(S_Contract memory){
      return contractOf[id];
  }

  function getIdsHistory() public view returns(uint256[] memory) {
      return idsHistory[msg.sender];
  }

  function getNextContractId() public view returns(uint256){
    return currentContractId;
  }

  function isRouteInUse(string memory personalizedRoute) public view returns(bool) {
    return existRoute[personalizedRoute];
  }

}