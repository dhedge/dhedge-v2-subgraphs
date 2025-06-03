import {Address, log} from '@graphprotocol/graph-ts';

import {
    AuthorizedKeeperAdded as AuthorizedKeeperAddedEvent,
    AuthorizedKeeperRemoved as AuthorizedKeeperRemovedEvent,
    LimitOrderCreated as LimitOrderCreatedEvent,
    LimitOrderDeleted as LimitOrderDeletedEvent,
    LimitOrderExecuted as LimitOrderExecutedEvent,
    LimitOrderModified as LimitOrderModifiedEvent, PoolLimitOrderManager,
    SettlementOrderCreated as SettlementOrderCreatedEvent,
} from "../generated/PoolLimitOrderManager/PoolLimitOrderManager";

import {
    AuthorizedKeeperAdded,
    AuthorizedKeeperRemoved, LimitOrder,
    LimitOrderCreated,
    LimitOrderModified, SettlementOrderCreated
} from "../generated/schema";
import { PoolFactoryMoonlight } from "../generated/PoolFactoryMoonlight/PoolFactoryMoonlight";
import { POOL_FACTORY_ADDRESS } from "./addresses";

export function handleAuthorizedKeeperAdded(event: AuthorizedKeeperAddedEvent): void {
    let entity = new AuthorizedKeeperAdded(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
    );
    entity.keeper = event.params.keeper;
    entity.time = event.block.timestamp;
    entity.blockNumber = event.block.number.toI32();
    entity.save();
}

export function handleAuthorizedKeeperRemoved(event: AuthorizedKeeperRemovedEvent): void {
    let entity = new AuthorizedKeeperRemoved(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
    );
    entity.keeper = event.params.keeper;
    entity.time = event.block.timestamp;
    entity.blockNumber = event.block.number.toI32();
    entity.save();
}

export function handleLimitOrderCreated(event: LimitOrderCreatedEvent): void {
    let entity = new LimitOrderCreated(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
    );
    entity.user = event.params.user;
    entity.pool = event.params.pool;
    entity.orderId = event.params.id;
    entity.time = event.block.timestamp;
    entity.blockNumber = event.block.number.toI32();
    entity.save();

    const orderId = event.params.id;
    let limitOrder = LimitOrder.load(orderId);
    if (!limitOrder) {
        limitOrder = new LimitOrder(orderId);
        limitOrder.id = event.params.id;
        limitOrder.user = event.params.user;
        limitOrder.pool = event.params.pool;

        limitOrder.blockNumberCreated = event.block.number.toI32();
        limitOrder.timeCreated = event.block.timestamp;
        limitOrder.status = 0;
    }

    limitOrder.blockNumberUpdated = event.block.number.toI32();
    limitOrder.timeUpdated = event.block.timestamp;

    let limitOrderManagerContract = PoolLimitOrderManager.bind(event.address);
    let tryLimitOrderInfo = limitOrderManagerContract.try_limitOrders(orderId);
    if (tryLimitOrderInfo.reverted) {
        log.info(
            'limit order info was reverted in tx hash: {} at blockNumber: {}',
            [event.transaction.hash.toHex(), event.block.number.toString()]
        );
    } else {
        limitOrder.takeProfitPrice = tryLimitOrderInfo.value.getTakeProfitPriceD18();
        limitOrder.stopLossPrice = tryLimitOrderInfo.value.getStopLossPriceD18();
        limitOrder.amount = tryLimitOrderInfo.value.getAmount();
        limitOrder.pricingAsset = tryLimitOrderInfo.value.getPricingAsset();
    }

    limitOrder.save();
}

export function handleLimitOrderDeleted(event: LimitOrderDeletedEvent): void {
    let limitOrder = LimitOrder.load(event.params.id);
    if (limitOrder && limitOrder.status !== 1) {
        limitOrder.status = 2;
        limitOrder.blockNumberUpdated = event.block.number.toI32();
        limitOrder.timeUpdated = event.block.timestamp;
        limitOrder.save();
    }
}

export function handleLimitOrderExecuted(event: LimitOrderExecutedEvent): void {
    let limitOrder = LimitOrder.load(event.params.id);
    if (limitOrder) {
        limitOrder.blockNumberUpdated = event.block.number.toI32();
        limitOrder.timeUpdated = event.block.timestamp;
        limitOrder.status = 1;

        let poolFactoryContract = PoolFactoryMoonlight.bind(Address.fromString(POOL_FACTORY_ADDRESS));

        const pricingAsset = limitOrder.pricingAsset;

        if (pricingAsset !== null) {
            const tryPricingAssetPrice = poolFactoryContract.try_getAssetPrice(Address.fromBytes(pricingAsset));

            if (tryPricingAssetPrice.reverted) {
                log.info(
                    'getAssetPrice was reverted in tx hash: {} at blockNumber: {}',
                    [event.transaction.hash.toHex(), event.block.number.toString()]
                );
            } else {
                limitOrder.closePrice = tryPricingAssetPrice.value;
            }
        }

        limitOrder.save();
    }
}

export function handleLimitOrderModified(event: LimitOrderModifiedEvent): void {
    let entity = new LimitOrderModified(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
    );
    entity.user = event.params.user;
    entity.pool = event.params.pool;
    entity.orderId = event.params.id;
    entity.time = event.block.timestamp;
    entity.blockNumber = event.block.number.toI32();
    entity.save();

    const orderId = event.params.id;
    let limitOrder = LimitOrder.load(orderId);
    if (limitOrder) {
        let limitOrderManagerContract = PoolLimitOrderManager.bind(event.address);
        let tryLimitOrderInfo = limitOrderManagerContract.try_limitOrders(orderId);
        if (tryLimitOrderInfo.reverted) {
            log.info(
                'limit order info was reverted in tx hash: {} at blockNumber: {}',
                [event.transaction.hash.toHex(), event.block.number.toString()]
            );
        } else {
            limitOrder.takeProfitPrice = tryLimitOrderInfo.value.getTakeProfitPriceD18();
            limitOrder.stopLossPrice = tryLimitOrderInfo.value.getStopLossPriceD18();
            limitOrder.amount = tryLimitOrderInfo.value.getAmount();
            limitOrder.pricingAsset = tryLimitOrderInfo.value.getPricingAsset();

            limitOrder.blockNumberUpdated = event.block.number.toI32();
            limitOrder.timeUpdated = event.block.timestamp;
        }
    }
}

export function handleSettlementOrderCreated(event: SettlementOrderCreatedEvent): void {
    let entity = new SettlementOrderCreated(
        event.transaction.hash.toHex() + '-' + event.logIndex.toString()
    );
    entity.user = event.params.user;
    entity.time = event.block.timestamp;
    entity.blockNumber = event.block.number.toI32();
    entity.save();
}
