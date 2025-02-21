// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
   
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./TokenAddresses.sol";

error NotRecipient();
error UnMatchedSizes();

// contract Escrow is Ownable, TokenAddresses{
contract Escrow is Ownable {
    address public immutable I_RECIPIENT;
    uint256 public currentTransactionId;
    string[] tokens;
    string[] socialNames;
    string[] socialLinks;

    mapping (string => address) addressOf;
    mapping (address => uint256[]) idsHistory;

    struct S_Deposite {
        uint256 id;
        uint256 date;
        address user;
        string token;
        uint256 amount;
        uint256 feeRecipient;
        uint256 feeSendisure;
        address recipient;
    }

    mapping (uint256 => S_Deposite) deposites;

    address feeReceiverContractAddress;
    constructor( address  _account, string[] memory _socialNames,string[] memory _socialLinks,
                string[] memory _initialTokens, address[] memory _initialTokenAddresses, address _feeReceiverContractAddress) {
        I_RECIPIENT = _account;
        socialNames = _socialNames;
        socialLinks = _socialLinks;
        _addTokens(_initialTokens, _initialTokenAddresses);
        feeReceiverContractAddress = _feeReceiverContractAddress;
    }

    modifier onlyRecipient() {
        // require(msg.sender == I_RECIPIENT, "ONLY RECIPIENT");
        if(msg.sender != I_RECIPIENT){
            revert NotRecipient();
        }
        _;
    }

    function _addToken(string memory _token, address _address) internal {
        if(addressOf[_token]==address(0)) {
            tokens.push(_token);
        }
        addressOf[_token] = _address;
    }

    function _addTokens(string[] memory _tokens, address[] memory _addresses) internal {
        // require(_tokens.length == _addresses.length);
        if(_tokens.length != _addresses.length){
            revert UnMatchedSizes();
        }
        for(uint8 i=0; i<_tokens.length; i++){
            _addToken(_tokens[i], _addresses[i]);
        }
    }

    function addTokens(string[] memory _tokens, address[] memory _addresses) public onlyRecipient(){
        _addTokens(_tokens, _addresses);
    }

    function addSocialLink(string[] memory _socialNames,string[] memory _socialLinks) public {
        // require(_socialNames.length == _socialLinks.length, "SOCIAL PROFILES UNMATCHED");
        if(_socialNames.length != _socialLinks.length){revert UnMatchedSizes();}
        for(uint8 i=0; i<_socialNames.length; i++){
            socialNames.push(_socialNames[i]);
            socialLinks.push(_socialLinks[i]);
        }
    }

    function toRecipient(string memory _token, uint256 _amount, uint256 _feeRecipient, uint256 _feeSendisure) public {
        S_Deposite memory newDeposite;
        
        newDeposite.id = currentTransactionId;
        newDeposite.date = block.timestamp;
        newDeposite.user = msg.sender;
        newDeposite.token = _token;
        newDeposite.amount = _amount;
        newDeposite.feeRecipient = _feeRecipient;
        newDeposite.feeSendisure = _feeSendisure;
        newDeposite.recipient = I_RECIPIENT;

        idsHistory[msg.sender].push(currentTransactionId);
        deposites[currentTransactionId] = newDeposite;
        currentTransactionId+=1;
        
        IERC20(addressOf[_token]).transferFrom(msg.sender, I_RECIPIENT, _amount + _feeRecipient);  
        IERC20(addressOf[_token]).transferFrom(msg.sender, feeReceiverContractAddress, _feeSendisure);    
    }

    function getDeposites(uint256 transactionId) public view returns(S_Deposite memory){
        return deposites[transactionId];
    }

    function getNextId() public view returns(uint256){
        return currentTransactionId; // this will help me get last 15 transactions
    }

    function getIdsHistory() public view returns(uint256[] memory){
        return idsHistory[msg.sender];
    }

    function getAddressOftoken(string memory _token) public view returns(address) {
        return addressOf[_token];
    }

    function getTokens() public view returns(string[] memory){
        return tokens;
    }

    function getSocialNames() public view returns(string[] memory){
        return socialNames;
    }

    function getSocialLinks() public view returns(string[] memory){
        return socialLinks;
    }
}