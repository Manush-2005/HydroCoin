// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HydrogenCoin is ERC20, Ownable {
    struct HydroBatch {
        address producer;    
        uint256 amount;     
        uint256 timestamp;   
        string ipfsHash;    
        bool exists;         
    }

  
    mapping(bytes32 => HydroBatch) public hydroBatches;

    event HydroBatchMinted(
        bytes32 indexed batchId,
        address indexed producer,
        uint256 amount,
        string ipfsHash
    );

    constructor() ERC20("HydrogenCoin", "HYC") Ownable(msg.sender) {}

    /**
     * @notice Mint a new batch of Hydrogen tokens linked to IPFS metadata
     * @param producer The producer of hydrogen
     * @param amount Amount of tokens (e.g., 100 tokens = 100kg hydrogen)
     * @param ipfsHash IPFS hash (CID) that points to batch details JSON
     */
    function mintHydroBatch(
        address producer,
        uint256 amount,
        string memory ipfsHash
    ) external onlyOwner {
        require(amount > 0, "Amount must be greater than zero");

      
        bytes32 batchId = keccak256(
            abi.encodePacked(producer, block.timestamp, amount, ipfsHash)
        );

        require(!hydroBatches[batchId].exists, "Batch already exists");

       
        _mint(producer, amount);

        hydroBatches[batchId] = HydroBatch({
            producer: producer,
            amount: amount,
            timestamp: block.timestamp,
            ipfsHash: ipfsHash,
            exists: true
        });

        emit HydroBatchMinted(batchId, producer, amount, ipfsHash);
    }

    
    function getBatch(bytes32 batchId) external view returns (HydroBatch memory) {
        require(hydroBatches[batchId].exists, "Batch does not exist");
        return hydroBatches[batchId];
    }
}
