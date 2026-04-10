'use strict';

const CONCRETE_KNOWLEDGE = `
=== CONCRETE.XYZ OFFICIAL DOCUMENTATION ===

--- WELCOME / OVERVIEW ---
Concrete.xyz is a suite of DeFi products powering secure, automated yield strategies and unlocking new opportunities for any on-chain asset.
Designed for Liquidity Providers aiming for yield maximization, and Traders hunting for market opportunities across integrated DeFi platforms.
Concrete automatically moves assets to the best-performing protocols, ensuring maximum yield with zero effort.
Concrete provides a unified user experience across multiple chains.
The app is accessible at app.concrete.xyz/earn.

--- OUR SOLUTION ---
Concrete Earn transforms DeFi vaults from manual, governance-heavy systems into fully automated yield infrastructure.
- Concrete Earn: Automated vault infrastructure for on-chain yield strategies. Partners deploy custom ERC-4626 vaults via Concrete Enterprise.
- Automation Engine: Automated yield accrual and fee calculation, ensuring daily NAV precision and real-time performance tracking.
- Subgraph Indexing: Tracks all deposits, withdrawals, fees, and yield events for full on-chain transparency.
Each vault accepts one base asset (USDC or ETH) and issues ERC-20 shares representing proportional ownership.
Vaults deploy capital across curated DeFi strategies such as lending, liquidity provision, or yield tokenization and automatically rebalance allocations.
Features: Granular Role Controls, Modular Strategies (plug-and-play strategy contracts), Async Withdrawals (epoch-based withdrawal cycles).

Earn V1: Foundation of Concrete vault system — ERC-4626 vaults, fee-free, single-asset, optimized for lending markets. Required manual accounting and operational oversight. Withdrawals and rebalancing relied on curator actions and multi-signature approvals.

Earn V2: Next-generation vault architecture for automation and institutional-grade transparency.
Key Upgrades:
- Role-Based Automation: Vault Manager, Allocator, Strategy Manager, Hook Manager, Withdrawal Manager.
- Automated Accounting System: Three-party process — Transaction Proposer, Independent Signer, Smart Contract Safeguards — for verified daily NAV updates.
- Multisig Strategy Support: External custodians manage positions with automated data syncs.
- Async Vault Mode: Withdrawal requests queue into epochs.
Result: Earn V2 vaults update daily, rebalance automatically, full transparency without manual oversight.

--- HOW IT WORKS ---
1. Vault Creation: Partners deploy vaults through the Concrete Factory.
2. Asset Management: Deposited funds allocated across yield strategies.
3. Automated Operations: Fees, yield, and accounting updated continuously.

Deposit: Users deposit a base asset (e.g. USDC). Vault mints ERC-20 shares representing proportional ownership. Each vault focuses on one asset and deploys across multiple strategies.

Yield Generation: Strategies are smart contracts interacting with DeFi protocols. Examples: lending on Aave, providing liquidity on Pendle, or holding yield-bearing assets. The Allocator role moves funds between strategies.

Withdrawals: Instant or epoch-based (async mode). Async vaults queue requests in time-based batches. Instant withdrawals available for standard vaults.

Example Scenario:
1. Partner launches USDC vault via Factory with two strategies: Pendle yield strategy and Curve stable pool.
2. Users deposit USDC, receive vault shares.
3. Allocator splits capital between Pendle and Curve.
4. Daily automated accounting updates total assets and yield.
5. Users withdraw USDC instantly or after next epoch.
6. All activity recorded on-chain in subgraph.

--- EARN V2 ROLES ---
- Vault Owner: controls upgrades.
- Vault Manager: updates parameters, limits, fees, manages withdrawal queue.
- Strategy Manager: adds or removes strategies.
- Hook Manager: manages custom logic hooks.
- Allocator: moves capital between strategies, processes withdrawals.
- Withdrawal Manager (async): handles epoch processing and claims.

Technical:
- Factory: UUPS upgrade standard, EIP-7201 storage layout, one per chain.
- Vaults: ERC-4626 standard, hold multiple strategies, fees minted as vault shares.
- Async withdrawals: queued into epochs, fixed price per epoch, toggleable.
- Periphery: Strategies, Multisig Strategies, Allocation Module, Hooks, Fee Splitter.
- Automated Accounting: Transaction Proposer tracks balances, Independent Signer validates, Smart Contract Safeguards enforce yield range limits.
- TRES Accounting Integration: off-chain verified accounting.
- Hypernative Security Monitoring: real-time risk detection.

--- FEES ---
Concrete Earn charges NO deposit fees, NO maintenance fees, NO performance fees, NO withdrawal fees.
Vault-based AUM fee charged annually:
- Standard Earn vaults: 1.5% annualized
- Sentora/Lombard vault: 1.25% annualized
No hidden costs. Funds accessible without penalty.

--- REWARDS ---
Concrete Points Program Phase 1: social campaign, users earn "bags" by completing quests.
Powered by Absinthe (boost.absinthe.network).
Bags convert to Concrete Points at a later date (ratio TBA).
Social actions: Follow @ConcreteXYZ on X, join Concrete Discord, write a blog article.
Leaderboard requires wallet connection to view XP and rank.
Phase 2: Earn App leaderboard (not part of initial social campaign).

--- RISKS AND SAFETY ---
Smart Contract Risk: Audited by Trail of Bits, Halborn, Code4rena. Mitigated by regular audits, open-source contracts, bug bounties.
Impermanent Loss (IL): Occurs when token prices in a liquidity pool diverge. Affects vaults using AMMs or LP pools. Higher risk with non-stablecoin pairs or volatile markets. Mitigated by diversified strategies and dynamic reallocation.
Slippage Risk: Difference between expected and actual trade price. Occurs during rebalancing or large trades. Mitigated by 1inch aggregator integration and built-in slippage protection.
Strategy-Specific Risks: Each vault exposes users to underlying protocol risks. Mitigated by vetting protocols, capping exposures, transparent disclosures.

--- FUTURE PLANS ---
Future layers: borrowing and liquidation protection integrated with Earn vault infrastructure.
Multi-layered liquidation protection: system monitors positions, injects credit if needed.
Future borrowing: borrow stablecoins against deposits without liquidation risk.
Vision: Earn (automated yield) + Borrow (no liquidation risk) + Protect (optional protection modules).
`;

module.exports = { CONCRETE_KNOWLEDGE };
