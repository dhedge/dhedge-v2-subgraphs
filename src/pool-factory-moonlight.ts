import {
  FundCreated as FundCreatedEvent,
} from '../generated/PoolFactoryMoonlight/PoolFactoryMoonlight';
import {
  FundCreated,
  Manager,
} from '../generated/schema';
import { PoolLogic as PoolLogicTemplate, PoolManagerLogic as PoolManagerLogicTemplate} from '../generated/templates';
import { PoolLogic } from "../generated/templates/PoolLogic/PoolLogic";
import { log } from "@graphprotocol/graph-ts";

export function handleFundCreated(event: FundCreatedEvent): void {
  let entity = new FundCreated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  let managerAddress = event.params.manager.toHexString()
  let manager = Manager.load(managerAddress)
  if (!manager) {
    manager = new Manager(managerAddress)
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
  entity.managerFeeNumerator = event.params.managerFeeDenominator;
  entity.managerFeeDenominator = event.params.managerFeeDenominator;
  entity.save();

  PoolLogicTemplate.create(event.params.fundAddress);

  const poolContract = PoolLogic.bind(event.params.fundAddress);
  const tryPoolManagerLogic = poolContract.try_poolManagerLogic();
  if (tryPoolManagerLogic.reverted) {
    log.warning('pool manager logic was reverted in tx hash: {} at blockNumber: {}', [
      event.transaction.hash.toHex(),
      event.block.number.toString(),
    ]);
  } else {
    PoolManagerLogicTemplate.create(tryPoolManagerLogic.value);
  }
}
