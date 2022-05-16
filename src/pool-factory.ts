import {
  DAOAddressSet as DAOAddressSetEvent,
  DaoFeeSet as DaoFeeSetEvent,
  ExitCooldownSet as ExitCooldownSetEvent,
  ExitFeeSet as ExitFeeSetEvent,
  FundCreated as FundCreatedEvent,
  GovernanceAddressSet as GovernanceAddressSetEvent,
  LogUpgrade as LogUpgradeEvent,
  MaximumSupportedAssetCountSet as MaximumSupportedAssetCountSetEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  PoolPerformanceAddressSet as PoolPerformanceAddressSetEvent,
  ProxyCreated as ProxyCreatedEvent,
  SetAssetHandler as SetAssetHandlerEvent,
  SetMaximumFee as SetMaximumFeeEvent,
  SetMaximumPerformanceFeeNumeratorChange as SetMaximumPerformanceFeeNumeratorChangeEvent,
  SetPerformanceFeeNumeratorChangeDelay as SetPerformanceFeeNumeratorChangeDelayEvent,
  SetPoolManagerFee as SetPoolManagerFeeEvent,
  SetPoolStorageVersion as SetPoolStorageVersionEvent,
  Unpaused as UnpausedEvent,
} from '../generated/PoolFactory/PoolFactory';
import {
  DAOAddressSet,
  DaoFeeSet,
  ExitCooldownSet,
  ExitFeeSet,
  FundCreated,
  GovernanceAddressSet,
  LogUpgrade,
  MaximumSupportedAssetCountSet,
  OwnershipTransferred,
  Paused,
  PoolPerformanceAddressSet,
  ProxyCreated,
  SetAssetHandler,
  SetMaximumFee,
  SetMaximumPerformanceFeeNumeratorChange,
  SetPerformanceFeeNumeratorChangeDelay,
  SetPoolManagerFee,
  SetPoolStorageVersion,
  Unpaused,
  Manager,
} from '../generated/schema';
import { PoolLogic as PoolLogicTemplate } from '../generated/templates';

export function handleDAOAddressSet(event: DAOAddressSetEvent): void {
  let entity = new DAOAddressSet(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.daoAddress = event.params.daoAddress;
  entity.save();
}

export function handleDaoFeeSet(event: DaoFeeSetEvent): void {
  let entity = new DaoFeeSet(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.numerator = event.params.numerator;
  entity.denominator = event.params.denominator;
  entity.save();
}

export function handleExitCooldownSet(event: ExitCooldownSetEvent): void {
  let entity = new ExitCooldownSet(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.cooldown = event.params.cooldown;
  entity.save();
}

export function handleExitFeeSet(event: ExitFeeSetEvent): void {
  let entity = new ExitFeeSet(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.numerator = event.params.numerator;
  entity.denominator = event.params.denominator;
  entity.save();
}

export function handleFundCreated(event: FundCreatedEvent): void {
  let entity = new FundCreated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  let managerAddress = event.params.manager.toHexString();
  let manager = Manager.load(managerAddress);
  if (!manager) {
    manager = new Manager(managerAddress);
    manager.managerAddress = event.params.manager;
  }
  manager.save();

  entity.uniqueManager = manager.id;
  entity.fundAddress = event.params.fundAddress;
  entity.isPoolPrivate = event.params.isPoolPrivate;
  entity.fundName = event.params.fundName;
  entity.managerName = event.params.managerName;
  entity.manager = event.params.manager;
  entity.time = event.params.time;
  entity.performanceFeeNumerator = event.params.performanceFeeNumerator;
  entity.managerFeeNumerator = event.params.managerFeeNumerator;
  entity.managerFeeDenominator = event.params.managerFeeDenominator;
  entity.save();

  PoolLogicTemplate.create(event.params.fundAddress);
}

export function handleGovernanceAddressSet(
  event: GovernanceAddressSetEvent
): void {
  let entity = new GovernanceAddressSet(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.governanceAddress = event.params.governanceAddress;
  entity.save();
}

export function handleLogUpgrade(event: LogUpgradeEvent): void {
  let entity = new LogUpgrade(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.manager = event.params.manager;
  entity.pool = event.params.pool;
  entity.save();
}

export function handleMaximumSupportedAssetCountSet(
  event: MaximumSupportedAssetCountSetEvent
): void {
  let entity = new MaximumSupportedAssetCountSet(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.count = event.params.count;
  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;
  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.account = event.params.account;
  entity.save();
}

export function handlePoolPerformanceAddressSet(
  event: PoolPerformanceAddressSetEvent
): void {
  let entity = new PoolPerformanceAddressSet(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.poolPerformanceAddress = event.params.poolPerformanceAddress;
  entity.save();
}

export function handleProxyCreated(event: ProxyCreatedEvent): void {
  let entity = new ProxyCreated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.proxy = event.params.proxy;
  entity.save();
}

export function handleSetAssetHandler(event: SetAssetHandlerEvent): void {
  let entity = new SetAssetHandler(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.assetHandler = event.params.assetHandler;
  entity.save();
}

export function handleSetMaximumFee(
  event: SetMaximumFeeEvent
): void {
  let entity = new SetMaximumFee(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.performanceFeeNumerator = event.params.performanceFeeNumerator;
  entity.managerFeeNumerator = event.params.managerFeeNumerator;
  entity.denominator = event.params.denominator;
  entity.save();
}

export function handleSetMaximumPerformanceFeeNumeratorChange(
  event: SetMaximumPerformanceFeeNumeratorChangeEvent
): void {
  let entity = new SetMaximumPerformanceFeeNumeratorChange(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.amount = event.params.amount;
  entity.save();
}

export function handleSetPerformanceFeeNumeratorChangeDelay(
  event: SetPerformanceFeeNumeratorChangeDelayEvent
): void {
  let entity = new SetPerformanceFeeNumeratorChangeDelay(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.delay = event.params.delay;
  entity.save();
}

export function handleSetPoolManagerFee(event: SetPoolManagerFeeEvent): void {
  let entity = new SetPoolManagerFee(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.numerator = event.params.numerator;
  entity.denominator = event.params.denominator;
  entity.save();
}

export function handleSetPoolStorageVersion(
  event: SetPoolStorageVersionEvent
): void {
  let entity = new SetPoolStorageVersion(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.poolStorageVersion = event.params.poolStorageVersion;
  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.account = event.params.account;
  entity.save();
}
