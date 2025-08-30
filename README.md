# ⚡ HydroCoin Trading Platform
### 🌍 Sustainable Hydrogen Trading with Blockchain, Smart Contracts & Incentives

---

## 🚀 Overview
HydroCoin is a **blockchain-powered platform** for transparent and secure **green hydrogen trading**.  

Producers and buyers connect through a decentralized system where:
- Producers can **sell liquid H₂ batches**.  
- Buyers **verify and approve** the batches.  
- Upon approval, the system **mints HydroCoins** (via Smart Contracts).  
- HydroCoins can be **traded for real money, discounts, or government benefits**.  

This ensures **transparency, traceability, and trust** in hydrogen trading.  

---

## 🎯 Key Features
- **Metamask Wallet Integration** – Secure registration & authentication via wallet.  
- **Role-based Profiles** – Producer & Buyer dashboards with different functionalities.  
- **Batch Verification System** – Buyers approve hydrogen batches to unlock HydroCoins.  
- **HydroCoin Reward System** – Earn HydroCoins when trades are verified.  
- **Trade HydroCoins** – Convert HydroCoins into money, offers, or discounts.  
- **Government Benefits** – Eco-friendly producers can claim sustainability incentives.  
- **Smart Contracts** – Ethereum-based contract ensures transparency & trust.  
- **Modern UI** – Built with React + Tailwind for a clean, responsive experience.
  ![Landing Page](https://github.com/Bhargavimachhi/HydroCoin/blob/227b244820d6380556b1da082ed46684dffa7b4c/rd1.png)

---

## 🖼️ Screenshots
👉 Place screenshots inside `assets/screenshots/` and update the paths below.

- **Landing Page**  
  ![Landing Page](assets/screenshots/landing.png)  

- **Producer Dashboard**  
  ![Producer Dashboard](assets/screenshots/producer.png)  

- **Buyer Dashboard**  
  ![Buyer Dashboard](assets/screenshots/buyer.png)  

- **Wallet Integration**  
  ![Wallet Connect](assets/screenshots/wallet.png)  

---

## 🔗 Architecture Flow
```mermaid
flowchart TD
    A[Producer] -->|Sells H₂ Batch| B[Platform]
    B -->|Verification Request| C[Buyer]
    C -->|Approve/Reject| B
    B -->|If Approved| D[Smart Contract]
    D -->|Mint Tokens| A
    A -->|Trade HydroCoins| E[Marketplace / Govt Benefits]
