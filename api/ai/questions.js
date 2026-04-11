'use strict';

const ALL_QUESTIONS = [
  // ── Vault Basics ───────────────────────────────────────────
  {
    question: "What token standard do Concrete Earn vaults follow?",
    options: ["A. ERC-20", "B. ERC-721", "C. ERC-4626", "D. ERC-1155"],
    correctAnswer: "C",
    explanation: "Concrete Earn vaults follow the ERC-4626 tokenized-vault standard for deposits, withdrawals, and accounting."
  },
  {
    question: "What does Concrete issue to users when they deposit into a vault?",
    options: ["A. NFT receipts", "B. ERC-20 shares", "C. Stablecoins", "D. Governance tokens"],
    correctAnswer: "B",
    explanation: "When users deposit, the vault mints ERC-20 shares representing their proportional ownership of the vault's total assets."
  },
  {
    question: "How many base assets can a single Concrete Earn vault accept?",
    options: ["A. Unlimited", "B. Up to 5", "C. Exactly one", "D. Two"],
    correctAnswer: "C",
    explanation: "Each Concrete Earn vault focuses on a single base asset (e.g. USDC or ETH) and deploys those funds across multiple strategies."
  },
  {
    question: "Which component deploys new vaults in Concrete's architecture?",
    options: ["A. The Allocator", "B. The Subgraph", "C. The Concrete Factory", "D. The Hook Manager"],
    correctAnswer: "C",
    explanation: "Partners deploy new vaults through the Concrete Factory, which registers approved implementations and handles upgrades."
  },
  {
    question: "What does the Concrete Automation Engine primarily do?",
    options: ["A. Manages user KYC", "B. Keeps vault accounting up to date via yield accrual and fee calculation", "C. Routes user withdrawals to banks", "D. Generates governance proposals"],
    correctAnswer: "B",
    explanation: "The Automation Engine keeps vault accounting up to date through automated yield accrual and fee calculation, ensuring daily NAV precision."
  },
  {
    question: "What does Subgraph Indexing do in Concrete's system?",
    options: ["A. Stores user passwords", "B. Tracks deposits, withdrawals, fees, and yield events on-chain", "C. Runs the vault's investment logic", "D. Mints new vault shares"],
    correctAnswer: "B",
    explanation: "Subgraph Indexing tracks all deposits, withdrawals, fees, and yield events, delivering full on-chain transparency and analytics."
  },
  {
    question: "What is the primary goal of Concrete's yield strategy system?",
    options: ["A. Lock user funds for fixed terms", "B. Automatically move assets to the best-performing protocols", "C. Convert all assets to stablecoins", "D. Provide fixed 10% APY"],
    correctAnswer: "B",
    explanation: "Concrete automatically moves assets to the best-performing protocols, ensuring maximum yield with zero effort from the user."
  },
  {
    question: "Which DeFi protocols are cited as example yield strategies in Concrete's documentation?",
    options: ["A. Compound and Balancer", "B. Maker and Synthetix", "C. Aave and Pendle", "D. dYdX and GMX"],
    correctAnswer: "C",
    explanation: "The documentation cites lending on Aave and providing liquidity on Pendle as example strategies vaults can deploy capital into."
  },

  // ── Fees ──────────────────────────────────────────────────
  {
    question: "What is the annual vault fee for standard Concrete Earn vaults?",
    options: ["A. 0.5% AUM", "B. 1.0% AUM", "C. 1.5% AUM", "D. 2.0% AUM"],
    correctAnswer: "C",
    explanation: "Standard Concrete Earn vaults charge 1.5% annualized on Assets Under Management."
  },
  {
    question: "What is the annual vault fee for the Sentora vault?",
    options: ["A. 1.5%", "B. 2.0%", "C. 1.0%", "D. 1.25%"],
    correctAnswer: "D",
    explanation: "The Sentora (and Lombard) vault has a reduced AUM fee of 1.25% annualized, compared to 1.5% for standard vaults."
  },
  {
    question: "Does Concrete Earn charge a deposit fee?",
    options: ["A. Yes, 0.1%", "B. Yes, 0.5%", "C. No deposit fee", "D. Only on first deposit"],
    correctAnswer: "C",
    explanation: "Concrete Earn charges no deposit fee, enabling liquidity providers to allocate funds without any initial cost barrier."
  },
  {
    question: "Does Concrete Earn charge a withdrawal fee?",
    options: ["A. Yes, 0.2%", "B. Yes, 1%", "C. Only for early withdrawal", "D. No withdrawal fee"],
    correctAnswer: "D",
    explanation: "Concrete Earn charges no withdrawal fee — funds can be withdrawn without penalty, providing full flexibility and control."
  },
  {
    question: "How are vault fees collected in Concrete Earn V2?",
    options: ["A. Deducted from user wallet directly", "B. Minted as vault shares to the fee recipient", "C. Sent as USDC to Concrete treasury", "D. Withheld from withdrawal amounts"],
    correctAnswer: "B",
    explanation: "In Earn V2, both fees are minted as vault shares to the fee recipient for transparency and simplicity."
  },
  {
    question: "What type of fee structure does Concrete Earn use?",
    options: ["A. Performance fee on profits", "B. Fixed monthly subscription", "C. AUM-based vault fee charged annually", "D. Per-transaction gas subsidy fee"],
    correctAnswer: "C",
    explanation: "Concrete Earn uses a vault-based AUM (Assets Under Management) fee charged annually — 1.5% standard, 1.25% for Sentora/Lombard."
  },

  // ── Earn V1 vs V2 ─────────────────────────────────────────
  {
    question: "What was the main limitation of Earn V1?",
    options: ["A. It did not support USDC", "B. It required manual accounting and multi-sig approvals", "C. It had no fee structure", "D. It only worked on Ethereum mainnet"],
    correctAnswer: "B",
    explanation: "Earn V1 required manual accounting and operational oversight — withdrawals and rebalancing relied on curator actions and multi-signature approvals."
  },
  {
    question: "What key feature does Earn V2 introduce that V1 lacked?",
    options: ["A. Support for NFTs", "B. Role-based automation separating daily ops from governance", "C. Cross-chain bridging", "D. Fixed yield guarantees"],
    correctAnswer: "B",
    explanation: "Earn V2 introduces role-based automation with clear boundaries, separating high-frequency daily operations from critical governance actions."
  },
  {
    question: "What does Earn V2's Automated Accounting System replace?",
    options: ["A. The ERC-4626 standard", "B. Manual bookkeeping and stale NAV updates", "C. The Factory contract", "D. User wallet connections"],
    correctAnswer: "B",
    explanation: "Earn V2's three-party automation model replaces manual bookkeeping and stale NAV updates with daily, verified accounting."
  },
  {
    question: "What is Async Vault Mode in Earn V2?",
    options: ["A. A mode that pauses vault operations", "B. A withdrawal system that queues requests into epochs", "C. An async JavaScript API", "D. A cross-chain messaging protocol"],
    correctAnswer: "B",
    explanation: "Async Vault Mode allows withdrawal requests to queue into epochs, giving operators control over liquidity while users maintain predictable exits."
  },
  {
    question: "Can vault owners toggle between async and instant withdrawal modes in Earn V2?",
    options: ["A. No, it is set at deployment and cannot change", "B. Only with a governance vote", "C. Yes, vault owners can toggle between modes", "D. Only the Allocator can toggle this"],
    correctAnswer: "C",
    explanation: "Vault owners can toggle between async and instant withdrawal modes when needed, providing operational flexibility."
  },

  // ── Roles ─────────────────────────────────────────────────
  {
    question: "Which role in Earn V2 moves capital between strategies?",
    options: ["A. Vault Manager", "B. Hook Manager", "C. Allocator", "D. Strategy Manager"],
    correctAnswer: "C",
    explanation: "The Allocator role moves capital between strategies, handles withdrawal processing, and unwinds funds for users."
  },
  {
    question: "Which Earn V2 role adds or removes yield strategies from a vault?",
    options: ["A. Vault Owner", "B. Allocator", "C. Withdrawal Manager", "D. Strategy Manager"],
    correctAnswer: "D",
    explanation: "The Strategy Manager role is responsible for adding or removing strategies from a vault."
  },
  {
    question: "Which Earn V2 role manages custom logic hooks and withdrawal logic?",
    options: ["A. Vault Manager", "B. Hook Manager", "C. Allocator", "D. Strategy Manager"],
    correctAnswer: "B",
    explanation: "The Hook Manager role manages custom logic hooks and withdrawal logic, allowing vaults to add behavior like deposit caps or KYC checks."
  },
  {
    question: "Which Earn V2 role handles epoch processing and claims in async vaults?",
    options: ["A. Allocator", "B. Vault Owner", "C. Strategy Manager", "D. Withdrawal Manager"],
    correctAnswer: "D",
    explanation: "The Withdrawal Manager role is specific to async vaults and handles epoch processing and user claims."
  },
  {
    question: "Who controls upgrades for a specific vault in Earn V2?",
    options: ["A. Concrete core team only", "B. The Allocator", "C. The Vault Owner", "D. A DAO vote"],
    correctAnswer: "C",
    explanation: "The Vault Owner controls upgrades for a specific vault in Earn V2."
  },
  {
    question: "What does the Vault Manager role do in Earn V2?",
    options: ["A. Deploys new vault contracts", "B. Updates parameters, limits, fees, and manages the withdrawal queue", "C. Audits smart contract code", "D. Processes user KYC"],
    correctAnswer: "B",
    explanation: "The Vault Manager updates parameters, limits, fees, and manages the withdrawal queue in Earn V2."
  },
  {
    question: "In Earn V2, what do all admin roles default to at deployment?",
    options: ["A. The Concrete multisig", "B. A timelock contract", "C. The vault owner", "D. The Strategy Manager"],
    correctAnswer: "C",
    explanation: "All admin roles default to the vault owner at deployment. They can later be reassigned to other addresses or automation services."
  },

  // ── Automated Accounting ───────────────────────────────────
  {
    question: "Which party in Earn V2's accounting system proposes updates based on live wallet data?",
    options: ["A. Independent Signer", "B. Smart Contract Safeguards", "C. Transaction Proposer", "D. Vault Manager"],
    correctAnswer: "C",
    explanation: "The Transaction Proposer tracks strategist wallet balances and proposes updates based on live data."
  },
  {
    question: "Which party validates that accounting proposals match on-chain state in Earn V2?",
    options: ["A. Transaction Proposer", "B. Independent Signer", "C. Smart Contract Safeguards", "D. Vault Owner"],
    correctAnswer: "B",
    explanation: "The Independent Signer validates that proposals from the Transaction Proposer match on-chain state before updates are accepted."
  },
  {
    question: "What happens when an Earn V2 accounting update falls outside expected yield ranges?",
    options: ["A. It is automatically rejected and discarded", "B. It requires manual approval", "C. It is delayed by 24 hours", "D. The vault pauses all operations"],
    correctAnswer: "B",
    explanation: "Smart Contract Safeguards only accept updates within expected yield ranges — out-of-range updates require manual approval."
  },
  {
    question: "What institutional accounting partner integrates with Earn V2?",
    options: ["A. Deloitte", "B. TRES Finance", "C. Fireblocks", "D. Gnosis Safe"],
    correctAnswer: "B",
    explanation: "TRES Finance integrates with Earn V2 to provide off-chain and verified accounting for institutional transparency."
  },
  {
    question: "Which security monitoring service does Earn V2 integrate with?",
    options: ["A. Fireblocks", "B. Hypernative", "C. Chainalysis", "D. Forta Network"],
    correctAnswer: "B",
    explanation: "Earn V2 integrates with Hypernative Security Monitoring for real-time risk detection and verification of trading wallets and multisigs."
  },

  // ── Risks ─────────────────────────────────────────────────
  {
    question: "Which three firms audit Concrete's smart contracts?",
    options: ["A. Certik, OpenZeppelin, Hacken", "B. Trail of Bits, Halborn, Code4rena", "C. Quantstamp, Consensys, Chainalysis", "D. SlowMist, PeckShield, Immunefi"],
    correctAnswer: "B",
    explanation: "Concrete's contracts are audited by Trail of Bits, Halborn, and Code4rena — three leading blockchain security firms."
  },
  {
    question: "What is Impermanent Loss (IL) in the context of Concrete vaults?",
    options: ["A. A fee charged on profits", "B. Loss from smart contract bugs", "C. When token prices in a pool diverge, reducing LP position value", "D. Loss from failed transactions"],
    correctAnswer: "C",
    explanation: "Impermanent Loss occurs when the price of tokens in a liquidity pool diverges, potentially making LP positions less valuable than simply holding the tokens."
  },
  {
    question: "When is Impermanent Loss more likely to occur?",
    options: ["A. With stablecoin-only pairs in calm markets", "B. With non-stablecoin pairs in volatile environments", "C. Only during protocol upgrades", "D. When vault fees are collected"],
    correctAnswer: "B",
    explanation: "IL is more likely with non-stablecoin pairs (e.g. ETH/BTC), in volatile or low-liquidity environments, and during pre-deposit campaigns on new chains."
  },
  {
    question: "What is Slippage Risk in Concrete vaults?",
    options: ["A. Risk of smart contract exploits", "B. Difference between expected and actual trade execution price", "C. Risk of vault insolvency", "D. Loss from incorrect oracle prices"],
    correctAnswer: "B",
    explanation: "Slippage Risk refers to the difference between the expected price of a trade and the price at which it is actually executed, occurring during rebalancing or large trades."
  },
  {
    question: "What does Concrete use to mitigate slippage risk during vault rebalancing?",
    options: ["A. Uniswap V3 TWAP", "B. Chainlink price feeds", "C. 1inch aggregator integration", "D. Curve stable pools"],
    correctAnswer: "C",
    explanation: "Concrete integrates with 1inch for optimal swap routing and has built-in slippage protection in vault contracts."
  },
  {
    question: "How does Concrete mitigate Smart Contract Risk?",
    options: ["A. By storing funds in cold wallets", "B. Through regular audits, open-source contracts, and bug bounty programs", "C. By using only off-chain settlement", "D. By limiting vault size to $1M"],
    correctAnswer: "B",
    explanation: "Concrete mitigates smart contract risk through regular audits by top-tier firms, open-source contracts with community review, and bug bounty programs."
  },

  // ── Rewards ───────────────────────────────────────────────
  {
    question: "What are users rewarded with in Concrete Points Program Phase 1?",
    options: ["A. USDC cashback", "B. Vault shares", "C. Bags", "D. Concrete tokens"],
    correctAnswer: "C",
    explanation: "In Phase 1, users earn 'bags' by completing social quests. These bags will later be converted into Concrete Points."
  },
  {
    question: "What platform powers Concrete's Phase 1 rewards campaign?",
    options: ["A. Galxe", "B. Layer3", "C. Absinthe", "D. Zealy"],
    correctAnswer: "C",
    explanation: "The Concrete Points Program Phase 1 is powered by Absinthe (boost.absinthe.network)."
  },
  {
    question: "What type of actions qualify for Phase 1 rewards?",
    options: ["A. Depositing into vaults", "B. Social actions like following on X and joining Discord", "C. Referring new users only", "D. Trading on integrated DEXs"],
    correctAnswer: "B",
    explanation: "Phase 1 rewards are earned through social actions — following Concrete on X, joining Discord, and writing blog articles — not vault usage."
  },
  {
    question: "What will happen to bags earned in Phase 1?",
    options: ["A. They expire after 90 days", "B. They are converted to Concrete Points at a later date", "C. They can be traded on DEXs immediately", "D. They double every month automatically"],
    correctAnswer: "B",
    explanation: "Bags earned in Phase 1 will be converted into Concrete Points at a later date. The exact conversion ratio will be released later."
  },

  // ── Technical / Upgrade ───────────────────────────────────
  {
    question: "What upgrade standard do Concrete's factory contracts use?",
    options: ["A. EIP-1967 Transparent Proxy", "B. EIP-2535 Diamond", "C. UUPS with EIP-7201 storage", "D. OpenZeppelin Beacon Proxy"],
    correctAnswer: "C",
    explanation: "Concrete Factory contracts follow the UUPS upgrade standard with EIP-7201 storage layout for safe long-term migrations."
  },
  {
    question: "Does Concrete operate a single global factory or one per chain?",
    options: ["A. One global factory on Ethereum", "B. Each chain has its own factory", "C. Factories are deployed per vault", "D. There is no factory — vaults are deployed manually"],
    correctAnswer: "B",
    explanation: "Each chain has its own factory contract that follows the UUPS upgrade standard with EIP-7201 storage layout."
  },
  {
    question: "What are Hooks in Concrete Earn V2?",
    options: ["A. On-chain governance modules", "B. Optional contracts that add custom behavior like deposit caps or KYC checks", "C. Bridge contracts for cross-chain transfers", "D. Price oracle integrations"],
    correctAnswer: "B",
    explanation: "Hooks are optional contracts that add custom behavior to vaults — for example, deposit caps or KYC checks."
  },
  {
    question: "What is the Fee Splitter in Concrete Earn V2?",
    options: ["A. A contract that divides yield equally among depositors", "B. A module routing fees between up to two recipients with configurable share", "C. A tool for calculating impermanent loss", "D. A governance contract for fee votes"],
    correctAnswer: "B",
    explanation: "The Fee Splitter is a periphery module that routes fees between one or two recipients with a configurable share."
  },
  {
    question: "What is Concrete's long-term vision beyond yield automation?",
    options: ["A. Launching a centralized exchange", "B. A complete DeFi suite with Earn, borrowing, and liquidation protection", "C. Replacing traditional banks", "D. Creating a layer-2 blockchain"],
    correctAnswer: "B",
    explanation: "Concrete's long-term vision is a complete DeFi suite: automated yield through Concrete Earn, borrowing without liquidation risk, and optional protection modules."
  }
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  // Pick 15 random questions from the pool of 45
  const questions = shuffle(ALL_QUESTIONS).slice(0, 15);
  return res.status(200).json({ success: true, questions, cached: false });
};
