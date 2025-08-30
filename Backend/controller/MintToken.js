import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/d8ec83a61f874248bd6b72fe0c1dd050");
const wallet = new ethers.Wallet("20665d650566ab28133b634ea23f37048aa71628d0e6024e4244c9e571844970", provider);

const contractAddress = "0x04862468c7E86C76eB691fA2720FD08a7Abb2653";
const abi = [
  "function mintHydroBatch(address producer, uint256 amount, string ipfsHash) external",
  "function balanceOf(address account) view returns (uint256)"
];
const contract = new ethers.Contract(contractAddress, abi, wallet);

export async function mintTokens(req, res) {
  const { producer, amount, ipfsHash } = req.body;
  if (!producer || !amount || !ipfsHash) {
    return res.status(400).json({ error: "producer, amount, and ipfsHash are required" });
  }
  try {
    const amountWei = ethers.parseUnits(amount.toString(), 18);
    const tx = await contract.mintHydroBatch(producer, amountWei, ipfsHash);
    const receipt = await tx.wait();
    const balance = await contract.balanceOf(producer);

    return res.json({
      status: receipt.status === 1 ? "success" : "failed",
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      producerBalance: ethers.formatUnits(balance, 18)
    });
  } catch (error) {
    return res.status(500).json({ status: "error", error: error.message });
  }
}