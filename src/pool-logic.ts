import { dataSource } from '@graphprotocol/graph-ts';
import {
  Approval as ApprovalEvent,
  Deposit as DepositEvent,
  ManagerFeeMinted as ManagerFeeMintedEvent,
  PoolManagerLogicSet as PoolManagerLogicSetEvent,
  PoolPrivacyUpdated as PoolPrivacyUpdatedEvent,
  TransactionExecuted as TransactionExecutedEvent,
  Transfer as TransferEvent,
  Withdrawal as WithdrawalEvent,
} from '../generated/templates/PoolLogic/PoolLogic';
import { instantiatePool } from './helpers';
import {
  Approval,
  Deposit,
  ManagerFeeMinted,
  PoolManagerLogicSet,
  PoolPrivacyUpdated,
  TransactionExecuted,
  Transfer,
  Withdrawal,
  Investor,
} from '../generated/schema';

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;
  entity.save();
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  let id = dataSource.address().toHexString();
  let pool = instantiatePool(id, event.params.fundAddress, event);
  pool.save();

  let investorAddress = event.params.investor.toHexString();
  let investor = Investor.load(investorAddress);
  if (!investor) {
    investor = new Investor(investorAddress);
    investor.investorAddress = event.params.investor;
  }
  investor.save();

  entity.managerName = pool.managerName;
  entity.poolName = pool.name;
  entity.pool = pool.id;

  entity.manager = pool.manager;
  entity.totalSupply = pool.totalSupply;
  entity.uniqueInvestor = investor.id;
  entity.fundAddress = event.params.fundAddress;
  entity.investor = event.params.investor;
  entity.assetDeposited = event.params.assetDeposited;
  entity.valueDeposited = event.params.valueDeposited;
  entity.fundTokensReceived = event.params.fundTokensReceived;
  entity.totalInvestorFundTokens = event.params.totalInvestorFundTokens;
  entity.fundValue = event.params.fundValue;
  entity.time = event.params.time;
  entity.blockNumber = event.block.number.toI32();
  entity.save();
}

export function handleManagerFeeMinted(event: ManagerFeeMintedEvent): void {
  let entity = new ManagerFeeMinted(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.pool = event.params.pool;
  entity.manager = event.params.manager;
  entity.available = event.params.available;
  entity.daoFee = event.params.daoFee;
  entity.managerFee = event.params.managerFee;
  entity.tokenPriceAtLastFeeMint = event.params.tokenPriceAtLastFeeMint;
  entity.block = event.block.number.toI32();
  entity.save();
}

export function handlePoolManagerLogicSet(
  event: PoolManagerLogicSetEvent
): void {
  let entity = new PoolManagerLogicSet(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  entity.poolManagerLogic = event.params.poolManagerLogic;
  entity.from = event.params.from;
  entity.save();
}

export function handlePoolPrivacyUpdated(event: PoolPrivacyUpdatedEvent): void {
  let entity = new PoolPrivacyUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.isPoolPrivate = event.params.isPoolPrivate;
  entity.save();
}

export function handleTransactionExecuted(
  event: TransactionExecutedEvent
): void {
  let entity = new TransactionExecuted(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  let id = dataSource.address().toHexString();
  let pool = instantiatePool(id, event.params.pool, event);
  pool.save();

  entity.managerName = pool.managerName;
  entity.poolName = pool.name;
  entity.pool = event.params.pool;
  entity.manager = event.params.manager;
  entity.transactionType = event.params.transactionType;
  entity.time = event.params.time;
  entity.blockNumber = event.block.number.toI32();
  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;
  entity.address = event.address.toHexString();
  entity.block = event.block.number.toI32();
  entity.save();
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  let id = dataSource.address().toHexString();
  let pool = instantiatePool(id, event.params.fundAddress, event);
  pool.save();

  // use this address instead of event.params.investor to avoid incorrect address mapping
  // when using 3rd party contracts like EasySwapper
  let investorAddress =  event.transaction.from;
  let investor = Investor.load(investorAddress.toHexString());
  if (!investor) {
    investor = new Investor(investorAddress.toHexString());
    investor.investorAddress = investorAddress;
  }
  investor.save();

  entity.pool = pool.id;
  entity.managerName = pool.managerName;
  entity.poolName = pool.name;
  entity.totalSupply = pool.totalSupply;
  entity.uniqueInvestor = investor.id;
  entity.fundAddress = event.params.fundAddress;
  entity.investor = investorAddress;
  entity.valueWithdrawn = event.params.valueWithdrawn;
  entity.fundTokensWithdrawn = event.params.fundTokensWithdrawn;
  entity.totalInvestorFundTokens = event.params.totalInvestorFundTokens;
  entity.fundValue = event.params.fundValue;
  entity.time = event.params.time;
  entity.block = event.block.number.toI32();
  entity.save();
}
