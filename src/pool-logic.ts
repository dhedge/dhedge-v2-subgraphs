import { dataSource } from '@graphprotocol/graph-ts';
import {
  Deposit as DepositEvent,
  ManagerFeeMinted as ManagerFeeMintedEvent, PoolLogic,
  TransactionExecuted as TransactionExecutedEvent,
  Transfer as TransferEvent,
  Withdrawal as WithdrawalEvent,
} from '../generated/templates/PoolLogic/PoolLogic';
import { instantiatePool } from './helpers';
import {
  Deposit,
  ManagerFeeMinted,
  TransactionExecuted,
  Transfer,
  Withdrawal,
  Investor,
} from '../generated/schema';
import { log } from "@graphprotocol/graph-ts/index";

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
  entity.blockTimestamp = event.block.timestamp;

  let poolContract = PoolLogic.bind(event.params.pool);
  let tryPoolTokenPrice = poolContract.try_tokenPrice();
  if (tryPoolTokenPrice.reverted) {
    log.info(
        'pool token price was reverted in tx hash: {} at blockNumber: {}',
        [event.transaction.hash.toHex(), event.block.number.toString()]
    );
  } else {
    entity.tokenPriceAtFeeMint = tryPoolTokenPrice.value;
  }

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
  entity.blockTimestamp = event.block.timestamp

  let poolContract = PoolLogic.bind(event.address);
  let tryPoolTokenPrice = poolContract.try_tokenPrice();
  if (tryPoolTokenPrice.reverted) {
    log.info(
        'pool token price was reverted in tx hash: {} at blockNumber: {}',
        [event.transaction.hash.toHex(), event.block.number.toString()]
    );
  } else {
    entity.tokenPrice = tryPoolTokenPrice.value;
  }

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
  entity.fundValue = event.params.fundValue;
  entity.time = event.params.time;
  entity.block = event.block.number.toI32();

  let poolContract = PoolLogic.bind(event.params.fundAddress);
  let tryBalanceOf = poolContract.try_balanceOf(investorAddress);
  if (tryBalanceOf.reverted) {
    log.info(
        'investor pool balance was reverted in tx hash: {} at blockNumber: {}',
        [event.transaction.hash.toHex(), event.block.number.toString()]
    );
  } else {
    entity.totalInvestorFundTokens = tryBalanceOf.value;
  }

  entity.save();
}
