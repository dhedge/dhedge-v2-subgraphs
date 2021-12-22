import {
  ExchangeFrom as ExchangeFromEvent,
  ExchangeTo as ExchangeToEvent,
} from '../generated/SynthetixGuard/SynthetixGuard';
import { ExchangeFrom, ExchangeTo } from '../generated/schema';

export function handleExchangeFrom(event: ExchangeFromEvent): void {
  let entity = new ExchangeFrom(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  entity.fundAddress = event.params.fundAddress;
  entity.sourceAsset = event.params.sourceAsset;
  entity.sourceAmount = event.params.sourceAmount;
  entity.dstAsset = event.params.dstAsset;
  entity.time = event.params.time;
  entity.save();
}

export function handleExchangeTo(event: ExchangeToEvent): void {
  let entity = new ExchangeTo(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  entity.fundAddress = event.params.fundAddress;
  entity.sourceAsset = event.params.sourceAsset;
  entity.dstAsset = event.params.dstAsset;
  entity.dstAmount = event.params.dstAmount;
  entity.time = event.params.time;
  entity.save();
}
