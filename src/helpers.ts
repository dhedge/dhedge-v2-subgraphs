import {
  log,
  Address,
  BigInt,
  BigDecimal,
  ethereum,
} from '@graphprotocol/graph-ts';

import { ERC20 } from '../generated/templates/PoolLogic/ERC20';
import { PoolLogic } from '../generated/templates/PoolLogic/PoolLogic';
import { PoolManagerLogic } from '../generated/templates/PoolLogic/PoolManagerLogic';
import { Pool } from '../generated/schema';

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString('0');
export let BI_18 = BigInt.fromI32(18);

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

export function instantiateLimitOrder(
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