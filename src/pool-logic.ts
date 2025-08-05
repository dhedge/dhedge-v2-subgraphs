import { dataSource, BigInt } from '@graphprotocol/graph-ts';
import {
  Deposit as DepositEvent,
  EntryFeeMinted as EntryFeeMintedEvent,
  ExitFeeMinted as ExitFeeMintedEvent,
  ManagerFeeMinted as ManagerFeeMintedEvent,
  TransactionExecuted as TransactionExecutedEvent,
  Transfer as TransferEvent,
  Withdrawal as WithdrawalEvent,
  PoolLogic,
} from '../generated/templates/PoolLogic/PoolLogic';
import { instantiateInvestment, instantiatePool } from './helpers';
import {
  Deposit,
  ManagerFeeMinted,
  TransactionExecuted,
  Transfer,
  Withdrawal,
  Investor,
  EntryFeeMinted,
  ExitFeeMinted,
  Investment,
} from '../generated/schema';
import { log } from "@graphprotocol/graph-ts/index";
import { getDaoAddress } from "./addresses";

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

  let investmentId = investorAddress + event.params.fundAddress.toHexString();
  let investment = instantiateInvestment(investmentId, event.params.investor, event.params.fundAddress);
  if (investment.investorBalance.equals(BigInt.zero()) && !event.params.totalInvestorFundTokens.equals(BigInt.zero())) {
    investment.positionOpenTimestamp = event.block.timestamp;
  }
  investment.investorBalance = event.params.totalInvestorFundTokens;
  investment.save();

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

  if (event.params.from.toHexString() !== "0x0000000000000000000000000000000000000000"
      && event.params.to.toHexString() !== "0x0000000000000000000000000000000000000000") {
    const investorFromAddress = event.params.from;
    const investorToAddress = event.params.to;

    let investmentFromId = investorFromAddress.toHexString() + event.address.toHexString();
    let investmentFrom = Investment.load(investmentFromId);
    if (investmentFrom) {
      let tryInvestorFromBalanceOf = poolContract.try_balanceOf(investorFromAddress);
      if (tryInvestorFromBalanceOf.reverted) {
        log.info(
            'investor pool balance was reverted in tx hash: {} at blockNumber: {}',
            [event.transaction.hash.toHex(), event.block.number.toString()]
        );
      } else {
        if (!investmentFrom.investorBalance.equals(BigInt.zero()) && tryInvestorFromBalanceOf.value.equals(BigInt.zero())) {
          investmentFrom.positionOpenTimestamp = null;
        }
        investmentFrom.investorBalance = tryInvestorFromBalanceOf.value;
        investmentFrom.save();
      }

      let tryInvestorToBalanceOf = poolContract.try_balanceOf(investorToAddress);
      if (tryInvestorToBalanceOf.reverted) {
        log.info(
            'investor pool balance was reverted in tx hash: {} at blockNumber: {}',
            [event.transaction.hash.toHex(), event.block.number.toString()]
        );
      } else {
        let investmentId = investorToAddress.toHexString() + event.address.toHexString();
        let investment = instantiateInvestment(investmentId, event.params.to, event.address);
        if (investment.investorBalance.equals(BigInt.zero()) && !tryInvestorToBalanceOf.value.equals(BigInt.zero())) {
          investment.positionOpenTimestamp = event.block.timestamp;
        }
        investment.investorBalance = tryInvestorToBalanceOf.value;
        investment.save();
      }
    }
  }
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
    let investmentId = investorAddress.toHexString() + event.params.fundAddress.toHexString();
    let investment = Investment.load(investmentId);
    if (investment) {
      if (!investment.investorBalance.equals(BigInt.zero()) && tryBalanceOf.value.equals(BigInt.zero())) {
        investment.positionOpenTimestamp = null;
      }
      investment.investorBalance = tryBalanceOf.value;
      investment.save();
    }
  }

  if (event.transaction.from !== event.params.investor) {
    const potentialInvestorAddress = event.params.investor;
    let tryPotentialInvestorBalanceOf = poolContract.try_balanceOf(potentialInvestorAddress);
    if (tryPotentialInvestorBalanceOf.reverted) {
      log.info(
          'investor pool balance was reverted in tx hash: {} at blockNumber: {}',
          [event.transaction.hash.toHex(), event.block.number.toString()]
      );
    } else {
      let investmentId = potentialInvestorAddress.toHexString() + event.params.fundAddress.toHexString();
      let investment = Investment.load(investmentId);
      if (investment) {
        if (!investment.investorBalance.equals(BigInt.zero()) && tryPotentialInvestorBalanceOf.value.equals(BigInt.zero())) {
          investment.positionOpenTimestamp = null;
        }
        investment.investorBalance = tryPotentialInvestorBalanceOf.value;
        investment.save();
      }
    }
  }

  entity.save();
}

export function handleEntryFeeMinted(event: EntryFeeMintedEvent): void {
  if (getDaoAddress().equals(event.params.manager)) {
    let entity = new ManagerFeeMinted(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
    );
    entity.pool = event.address;
    entity.manager = event.params.manager;
    entity.available = BigInt.zero();
    entity.daoFee = event.params.entryFeeAmount;
    entity.managerFee = BigInt.zero();
    entity.tokenPriceAtLastFeeMint = BigInt.zero();
    entity.block = event.block.number.toI32();
    entity.blockTimestamp = event.block.timestamp;

    let poolContract = PoolLogic.bind(event.address);
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
  } else {
    let entity = new EntryFeeMinted(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
    );

    entity.pool = event.address;
    entity.managerAddress = event.params.manager;
    entity.entryFeeAmount = event.params.entryFeeAmount;
    entity.time = event.block.timestamp;
    entity.blockNumber = event.block.number.toI32();

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
}

export function handleExitFeeMinted(event: ExitFeeMintedEvent): void {
  if (getDaoAddress().equals(event.params.manager)) {
    let entity = new ManagerFeeMinted(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
    );
    entity.pool = event.address;
    entity.manager = event.params.manager;
    entity.available = BigInt.zero();
    entity.daoFee = event.params.exitFeeAmount;
    entity.managerFee = BigInt.zero();
    entity.tokenPriceAtLastFeeMint = BigInt.zero();
    entity.block = event.block.number.toI32();
    entity.blockTimestamp = event.block.timestamp;

    let poolContract = PoolLogic.bind(event.address);
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
  } else {
    let entity = new ExitFeeMinted(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
    );

    entity.pool = event.address;
    entity.managerAddress = event.params.manager;
    entity.exitFeeAmount = event.params.exitFeeAmount;
    entity.time = event.block.timestamp;
    entity.blockNumber = event.block.number.toI32();

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
}
