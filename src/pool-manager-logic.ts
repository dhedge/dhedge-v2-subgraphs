import { Pool } from '../generated/schema';
import { ManagerUpdated as ManagerUpdatedEvent } from "../generated/templates/PoolLogic/PoolManagerLogic";

export function handleManagerUpdated(event: ManagerUpdatedEvent): void {
  const poolAddress = event.address.toHexString();
  const pool = Pool.load(poolAddress);

  if (pool) {
    pool.manager = event.params.newManager;
    pool.managerName = event.params.newManagerName;
    pool.save();
  }
}
