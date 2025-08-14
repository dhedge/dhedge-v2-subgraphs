import {
  log,
  Address,
  BigInt,
  BigDecimal,
  ethereum,
  store,
} from '@graphprotocol/graph-ts';

import { ERC20 } from '../generated/templates/PoolLogic/ERC20';
import { PoolLogic } from '../generated/templates/PoolLogic/PoolLogic';
import { PoolManagerLogic } from '../generated/templates/PoolLogic/PoolManagerLogic';
import { Investment, LimitOrder, Pool } from '../generated/schema';

export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000000");

export namespace Network {
  export const POLYGON = 'matic';
  export const OPTIMISM = 'optimism';
  export const BASE = 'base';
  export const ARBITRUM = 'arbitrum-one';
  export const MAINNET = 'mainnet';
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  let contract = ERC20.bind(tokenAddress);

  let decimalValue = NaN;
  let decimalResult = contract.try_decimals();
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value;
  }
  return BigInt.fromI32(decimalValue as i32);
}

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1');
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'));
  }
  return bd;
}

export function convertTokenToDecimal(
  tokenAmount: BigInt,
  exchangeDecimals: BigInt
): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal();
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals));
}

export function instantiatePool(
  id: string,
  fundAddress: Address,
  event: ethereum.Event
): Pool {
  let pool = Pool.load(id);
  let poolContract = PoolLogic.bind(fundAddress);
  let poolTokenDecimals = fetchTokenDecimals(fundAddress);

  if (!pool) {
    pool = new Pool(id);
    pool.fundAddress = fundAddress;
  }

  // Manager Logic
  let managerContract = PoolManagerLogic.bind(poolContract.poolManagerLogic());

  // Pool Entity
  let tryPoolName = poolContract.try_name();
  if (tryPoolName.reverted) {
    log.info('pool name was reverted in tx hash: {} at blockNumber: {}', [
      event.transaction.hash.toHex(),
      event.block.number.toString(),
    ]);
  } else {
    pool.name = tryPoolName.value;
  }

  pool.manager = managerContract.manager();
  pool.managerName = managerContract.managerName();
  pool.decimals = poolTokenDecimals;

  let poolSupply = convertTokenToDecimal(
    poolContract.totalSupply(),
    poolTokenDecimals
  );
  pool.totalSupply = poolSupply;

  let tryPoolTokenPrice = poolContract.try_tokenPrice();
  if (tryPoolTokenPrice.reverted) {
    log.info(
      'pool token price was reverted in tx hash: {} at blockNumber: {}',
      [event.transaction.hash.toHex(), event.block.number.toString()]
    );
  } else {
    pool.tokenPrice = tryPoolTokenPrice.value;
  }

  return pool as Pool;
}

export function instantiateInvestment(
  id: string,
  investorAddress: Address,
  fundAddress: Address
): Investment {
  let investment = Investment.load(id);
  if (!investment) {
    investment = new Investment(id);
    investment.investorAddress = investorAddress;
    investment.fundAddress = fundAddress;
    investment.investorBalance = BigInt.zero();
  }
  return investment;
}

export function archiveLimitOrder(limitOrder: LimitOrder): void {
  const limitOrderToArchive = new LimitOrder(limitOrder.id + "-" + limitOrder.index.toString());

  limitOrderToArchive.orderId = limitOrder.orderId;
  limitOrderToArchive.index = limitOrder.index;
  limitOrderToArchive.user = limitOrder.user;
  limitOrderToArchive.pool = limitOrder.pool;
  limitOrderToArchive.partiallyExecutedAmount = limitOrder.partiallyExecutedAmount;
  limitOrderToArchive.blockNumberCreated = limitOrder.blockNumberCreated;
  limitOrderToArchive.timeCreated = limitOrder.timeCreated;
  limitOrderToArchive.blockNumberUpdated = limitOrder.blockNumberUpdated;
  limitOrderToArchive.timeUpdated = limitOrder.timeUpdated;
  limitOrderToArchive.status = limitOrder.status;
  limitOrderToArchive.takeProfitPrice = limitOrder.takeProfitPrice;
  limitOrderToArchive.stopLossPrice = limitOrder.stopLossPrice;
  limitOrderToArchive.closePrice = limitOrder.closePrice;
  limitOrderToArchive.pricingAsset = limitOrder.pricingAsset;
  limitOrderToArchive.amount = limitOrder.amount;

  store.remove("LimitOrder", limitOrder.id);
  limitOrderToArchive.save();
}
