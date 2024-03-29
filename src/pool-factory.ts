import { BigInt } from '@graphprotocol/graph-ts';
import {
  FundCreated as FundCreatedEvent,
} from '../generated/PoolFactory/PoolFactory';
import {
  FundCreated,
  Manager,
} from '../generated/schema';
import { PoolLogic as PoolLogicTemplate } from '../generated/templates';

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
  entity.performanceFeeNumerator = BigInt.fromI32(0);
  entity.managerFeeNumerator = event.params.managerFeeNumerator;
  entity.managerFeeDenominator = event.params.managerFeeDenominator;
  entity.save();

  PoolLogicTemplate.create(event.params.fundAddress);
}
