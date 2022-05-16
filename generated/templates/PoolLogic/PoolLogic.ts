// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get spender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get fundAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get investor(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get assetDeposited(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amountDeposited(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get valueDeposited(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get fundTokensReceived(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get totalInvestorFundTokens(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get fundValue(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }

  get totalSupply(): BigInt {
    return this._event.parameters[8].value.toBigInt();
  }

  get time(): BigInt {
    return this._event.parameters[9].value.toBigInt();
  }
}

export class ManagerFeeMinted extends ethereum.Event {
  get params(): ManagerFeeMinted__Params {
    return new ManagerFeeMinted__Params(this);
  }
}

export class ManagerFeeMinted__Params {
  _event: ManagerFeeMinted;

  constructor(event: ManagerFeeMinted) {
    this._event = event;
  }

  get pool(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get manager(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get available(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get daoFee(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get managerFee(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get tokenPriceAtLastFeeMint(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class PoolManagerLogicSet extends ethereum.Event {
  get params(): PoolManagerLogicSet__Params {
    return new PoolManagerLogicSet__Params(this);
  }
}

export class PoolManagerLogicSet__Params {
  _event: PoolManagerLogicSet;

  constructor(event: PoolManagerLogicSet) {
    this._event = event;
  }

  get poolManagerLogic(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get from(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class PoolPrivacyUpdated extends ethereum.Event {
  get params(): PoolPrivacyUpdated__Params {
    return new PoolPrivacyUpdated__Params(this);
  }
}

export class PoolPrivacyUpdated__Params {
  _event: PoolPrivacyUpdated;

  constructor(event: PoolPrivacyUpdated) {
    this._event = event;
  }

  get isPoolPrivate(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }
}

export class TransactionExecuted extends ethereum.Event {
  get params(): TransactionExecuted__Params {
    return new TransactionExecuted__Params(this);
  }
}

export class TransactionExecuted__Params {
  _event: TransactionExecuted;

  constructor(event: TransactionExecuted) {
    this._event = event;
  }

  get pool(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get manager(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get transactionType(): i32 {
    return this._event.parameters[2].value.toI32();
  }

  get time(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Withdrawal extends ethereum.Event {
  get params(): Withdrawal__Params {
    return new Withdrawal__Params(this);
  }
}

export class Withdrawal__Params {
  _event: Withdrawal;

  constructor(event: Withdrawal) {
    this._event = event;
  }

  get fundAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get investor(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get valueWithdrawn(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get fundTokensWithdrawn(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get totalInvestorFundTokens(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get fundValue(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get totalSupply(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get withdrawnAssets(): Array<WithdrawalWithdrawnAssetsStruct> {
    return this._event.parameters[7].value.toTupleArray<
      WithdrawalWithdrawnAssetsStruct
    >();
  }

  get time(): BigInt {
    return this._event.parameters[8].value.toBigInt();
  }
}

export class WithdrawalWithdrawnAssetsStruct extends ethereum.Tuple {
  get asset(): Address {
    return this[0].toAddress();
  }

  get amount(): BigInt {
    return this[1].toBigInt();
  }

  get externalWithdrawProcessed(): boolean {
    return this[2].toBoolean();
  }
}

export class PoolLogic__availableManagerFeeAndTotalFundValueResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class PoolLogic__getFundSummaryResultValue0Struct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get totalSupply(): BigInt {
    return this[1].toBigInt();
  }

  get totalFundValue(): BigInt {
    return this[2].toBigInt();
  }

  get manager(): Address {
    return this[3].toAddress();
  }

  get managerName(): string {
    return this[4].toString();
  }

  get creationTime(): BigInt {
    return this[5].toBigInt();
  }

  get privatePool(): boolean {
    return this[6].toBoolean();
  }

  get performanceFeeNumerator(): BigInt {
    return this[7].toBigInt();
  }

  get managerFeeNumerator(): BigInt {
    return this[8].toBigInt();
  }

  get managerFeeDenominator(): BigInt {
    return this[9].toBigInt();
  }

  get exitFeeNumerator(): BigInt {
    return this[10].toBigInt();
  }

  get exitFeeDenominator(): BigInt {
    return this[11].toBigInt();
  }
}

export class PoolLogic extends ethereum.SmartContract {
  static bind(address: Address): PoolLogic {
    return new PoolLogic("PoolLogic", address);
  }

  allowance(owner: Address, spender: Address): BigInt {
    let result = super.call(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(spender)]
    );

    return result[0].toBigInt();
  }

  try_allowance(owner: Address, spender: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(spender)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  approve(spender: Address, amount: BigInt): boolean {
    let result = super.call("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(spender),
      ethereum.Value.fromUnsignedBigInt(amount)
    ]);

    return result[0].toBoolean();
  }

  try_approve(spender: Address, amount: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(spender),
      ethereum.Value.fromUnsignedBigInt(amount)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  availableManagerFee(): BigInt {
    let result = super.call(
      "availableManagerFee",
      "availableManagerFee():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_availableManagerFee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "availableManagerFee",
      "availableManagerFee():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  availableManagerFeeAndTotalFundValue(): PoolLogic__availableManagerFeeAndTotalFundValueResult {
    let result = super.call(
      "availableManagerFeeAndTotalFundValue",
      "availableManagerFeeAndTotalFundValue():(uint256,uint256)",
      []
    );

    return new PoolLogic__availableManagerFeeAndTotalFundValueResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_availableManagerFeeAndTotalFundValue(): ethereum.CallResult<
    PoolLogic__availableManagerFeeAndTotalFundValueResult
  > {
    let result = super.tryCall(
      "availableManagerFeeAndTotalFundValue",
      "availableManagerFeeAndTotalFundValue():(uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PoolLogic__availableManagerFeeAndTotalFundValueResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  balanceOf(account: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  creationTime(): BigInt {
    let result = super.call("creationTime", "creationTime():(uint256)", []);

    return result[0].toBigInt();
  }

  try_creationTime(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("creationTime", "creationTime():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  creator(): Address {
    let result = super.call("creator", "creator():(address)", []);

    return result[0].toAddress();
  }

  try_creator(): ethereum.CallResult<Address> {
    let result = super.tryCall("creator", "creator():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  decimals(): i32 {
    let result = super.call("decimals", "decimals():(uint8)", []);

    return result[0].toI32();
  }

  try_decimals(): ethereum.CallResult<i32> {
    let result = super.tryCall("decimals", "decimals():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  decreaseAllowance(spender: Address, subtractedValue: BigInt): boolean {
    let result = super.call(
      "decreaseAllowance",
      "decreaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(spender),
        ethereum.Value.fromUnsignedBigInt(subtractedValue)
      ]
    );

    return result[0].toBoolean();
  }

  try_decreaseAllowance(
    spender: Address,
    subtractedValue: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "decreaseAllowance",
      "decreaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(spender),
        ethereum.Value.fromUnsignedBigInt(subtractedValue)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  deposit(_asset: Address, _amount: BigInt): BigInt {
    let result = super.call("deposit", "deposit(address,uint256):(uint256)", [
      ethereum.Value.fromAddress(_asset),
      ethereum.Value.fromUnsignedBigInt(_amount)
    ]);

    return result[0].toBigInt();
  }

  try_deposit(_asset: Address, _amount: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "deposit",
      "deposit(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_asset),
        ethereum.Value.fromUnsignedBigInt(_amount)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  execTransaction(to: Address, data: Bytes): boolean {
    let result = super.call(
      "execTransaction",
      "execTransaction(address,bytes):(bool)",
      [ethereum.Value.fromAddress(to), ethereum.Value.fromBytes(data)]
    );

    return result[0].toBoolean();
  }

  try_execTransaction(to: Address, data: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "execTransaction",
      "execTransaction(address,bytes):(bool)",
      [ethereum.Value.fromAddress(to), ethereum.Value.fromBytes(data)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  executeOperation(
    assets: Array<Address>,
    amounts: Array<BigInt>,
    premiums: Array<BigInt>,
    originator: Address,
    params: Bytes
  ): boolean {
    let result = super.call(
      "executeOperation",
      "executeOperation(address[],uint256[],uint256[],address,bytes):(bool)",
      [
        ethereum.Value.fromAddressArray(assets),
        ethereum.Value.fromUnsignedBigIntArray(amounts),
        ethereum.Value.fromUnsignedBigIntArray(premiums),
        ethereum.Value.fromAddress(originator),
        ethereum.Value.fromBytes(params)
      ]
    );

    return result[0].toBoolean();
  }

  try_executeOperation(
    assets: Array<Address>,
    amounts: Array<BigInt>,
    premiums: Array<BigInt>,
    originator: Address,
    params: Bytes
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "executeOperation",
      "executeOperation(address[],uint256[],uint256[],address,bytes):(bool)",
      [
        ethereum.Value.fromAddressArray(assets),
        ethereum.Value.fromUnsignedBigIntArray(amounts),
        ethereum.Value.fromUnsignedBigIntArray(premiums),
        ethereum.Value.fromAddress(originator),
        ethereum.Value.fromBytes(params)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  factory(): Address {
    let result = super.call("factory", "factory():(address)", []);

    return result[0].toAddress();
  }

  try_factory(): ethereum.CallResult<Address> {
    let result = super.tryCall("factory", "factory():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getExitCooldown(): BigInt {
    let result = super.call(
      "getExitCooldown",
      "getExitCooldown():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getExitCooldown(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getExitCooldown",
      "getExitCooldown():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getExitRemainingCooldown(sender: Address): BigInt {
    let result = super.call(
      "getExitRemainingCooldown",
      "getExitRemainingCooldown(address):(uint256)",
      [ethereum.Value.fromAddress(sender)]
    );

    return result[0].toBigInt();
  }

  try_getExitRemainingCooldown(sender: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getExitRemainingCooldown",
      "getExitRemainingCooldown(address):(uint256)",
      [ethereum.Value.fromAddress(sender)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getFundSummary(): PoolLogic__getFundSummaryResultValue0Struct {
    let result = super.call(
      "getFundSummary",
      "getFundSummary():((string,uint256,uint256,address,string,uint256,bool,uint256,uint256,uint256,uint256,uint256))",
      []
    );

    return changetype<PoolLogic__getFundSummaryResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getFundSummary(): ethereum.CallResult<
    PoolLogic__getFundSummaryResultValue0Struct
  > {
    let result = super.tryCall(
      "getFundSummary",
      "getFundSummary():((string,uint256,uint256,address,string,uint256,bool,uint256,uint256,uint256,uint256,uint256))",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<PoolLogic__getFundSummaryResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  increaseAllowance(spender: Address, addedValue: BigInt): boolean {
    let result = super.call(
      "increaseAllowance",
      "increaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(spender),
        ethereum.Value.fromUnsignedBigInt(addedValue)
      ]
    );

    return result[0].toBoolean();
  }

  try_increaseAllowance(
    spender: Address,
    addedValue: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "increaseAllowance",
      "increaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(spender),
        ethereum.Value.fromUnsignedBigInt(addedValue)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isMemberAllowed(member: Address): boolean {
    let result = super.call(
      "isMemberAllowed",
      "isMemberAllowed(address):(bool)",
      [ethereum.Value.fromAddress(member)]
    );

    return result[0].toBoolean();
  }

  try_isMemberAllowed(member: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isMemberAllowed",
      "isMemberAllowed(address):(bool)",
      [ethereum.Value.fromAddress(member)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  lastDeposit(param0: Address): BigInt {
    let result = super.call("lastDeposit", "lastDeposit(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_lastDeposit(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lastDeposit",
      "lastDeposit(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  lastFeeMintTime(): BigInt {
    let result = super.call(
      "lastFeeMintTime",
      "lastFeeMintTime():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_lastFeeMintTime(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lastFeeMintTime",
      "lastFeeMintTime():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  lastWhitelistTransfer(param0: Address): BigInt {
    let result = super.call(
      "lastWhitelistTransfer",
      "lastWhitelistTransfer(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_lastWhitelistTransfer(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lastWhitelistTransfer",
      "lastWhitelistTransfer(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  managerName(): string {
    let result = super.call("managerName", "managerName():(string)", []);

    return result[0].toString();
  }

  try_managerName(): ethereum.CallResult<string> {
    let result = super.tryCall("managerName", "managerName():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  poolManagerLogic(): Address {
    let result = super.call(
      "poolManagerLogic",
      "poolManagerLogic():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_poolManagerLogic(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "poolManagerLogic",
      "poolManagerLogic():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  privatePool(): boolean {
    let result = super.call("privatePool", "privatePool():(bool)", []);

    return result[0].toBoolean();
  }

  try_privatePool(): ethereum.CallResult<boolean> {
    let result = super.tryCall("privatePool", "privatePool():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  setPoolManagerLogic(_poolManagerLogic: Address): boolean {
    let result = super.call(
      "setPoolManagerLogic",
      "setPoolManagerLogic(address):(bool)",
      [ethereum.Value.fromAddress(_poolManagerLogic)]
    );

    return result[0].toBoolean();
  }

  try_setPoolManagerLogic(
    _poolManagerLogic: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "setPoolManagerLogic",
      "setPoolManagerLogic(address):(bool)",
      [ethereum.Value.fromAddress(_poolManagerLogic)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenPrice(): BigInt {
    let result = super.call("tokenPrice", "tokenPrice():(uint256)", []);

    return result[0].toBigInt();
  }

  try_tokenPrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("tokenPrice", "tokenPrice():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenPriceAtLastFeeMint(): BigInt {
    let result = super.call(
      "tokenPriceAtLastFeeMint",
      "tokenPriceAtLastFeeMint():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_tokenPriceAtLastFeeMint(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenPriceAtLastFeeMint",
      "tokenPriceAtLastFeeMint():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenPriceWithoutManagerFee(): BigInt {
    let result = super.call(
      "tokenPriceWithoutManagerFee",
      "tokenPriceWithoutManagerFee():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_tokenPriceWithoutManagerFee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenPriceWithoutManagerFee",
      "tokenPriceWithoutManagerFee():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  transfer(recipient: Address, amount: BigInt): boolean {
    let result = super.call("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(recipient),
      ethereum.Value.fromUnsignedBigInt(amount)
    ]);

    return result[0].toBoolean();
  }

  try_transfer(
    recipient: Address,
    amount: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(recipient),
      ethereum.Value.fromUnsignedBigInt(amount)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  transferFrom(sender: Address, recipient: Address, amount: BigInt): boolean {
    let result = super.call(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(sender),
        ethereum.Value.fromAddress(recipient),
        ethereum.Value.fromUnsignedBigInt(amount)
      ]
    );

    return result[0].toBoolean();
  }

  try_transferFrom(
    sender: Address,
    recipient: Address,
    amount: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(sender),
        ethereum.Value.fromAddress(recipient),
        ethereum.Value.fromUnsignedBigInt(amount)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class DecreaseAllowanceCall extends ethereum.Call {
  get inputs(): DecreaseAllowanceCall__Inputs {
    return new DecreaseAllowanceCall__Inputs(this);
  }

  get outputs(): DecreaseAllowanceCall__Outputs {
    return new DecreaseAllowanceCall__Outputs(this);
  }
}

export class DecreaseAllowanceCall__Inputs {
  _call: DecreaseAllowanceCall;

  constructor(call: DecreaseAllowanceCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get subtractedValue(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DecreaseAllowanceCall__Outputs {
  _call: DecreaseAllowanceCall;

  constructor(call: DecreaseAllowanceCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get _asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get liquidityMinted(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class ExecTransactionCall extends ethereum.Call {
  get inputs(): ExecTransactionCall__Inputs {
    return new ExecTransactionCall__Inputs(this);
  }

  get outputs(): ExecTransactionCall__Outputs {
    return new ExecTransactionCall__Outputs(this);
  }
}

export class ExecTransactionCall__Inputs {
  _call: ExecTransactionCall;

  constructor(call: ExecTransactionCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class ExecTransactionCall__Outputs {
  _call: ExecTransactionCall;

  constructor(call: ExecTransactionCall) {
    this._call = call;
  }

  get success(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class ExecuteOperationCall extends ethereum.Call {
  get inputs(): ExecuteOperationCall__Inputs {
    return new ExecuteOperationCall__Inputs(this);
  }

  get outputs(): ExecuteOperationCall__Outputs {
    return new ExecuteOperationCall__Outputs(this);
  }
}

export class ExecuteOperationCall__Inputs {
  _call: ExecuteOperationCall;

  constructor(call: ExecuteOperationCall) {
    this._call = call;
  }

  get assets(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get amounts(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get premiums(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get originator(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get params(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class ExecuteOperationCall__Outputs {
  _call: ExecuteOperationCall;

  constructor(call: ExecuteOperationCall) {
    this._call = call;
  }

  get success(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class IncreaseAllowanceCall extends ethereum.Call {
  get inputs(): IncreaseAllowanceCall__Inputs {
    return new IncreaseAllowanceCall__Inputs(this);
  }

  get outputs(): IncreaseAllowanceCall__Outputs {
    return new IncreaseAllowanceCall__Outputs(this);
  }
}

export class IncreaseAllowanceCall__Inputs {
  _call: IncreaseAllowanceCall;

  constructor(call: IncreaseAllowanceCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get addedValue(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class IncreaseAllowanceCall__Outputs {
  _call: IncreaseAllowanceCall;

  constructor(call: IncreaseAllowanceCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _factory(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _privatePool(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }

  get _fundName(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _fundSymbol(): string {
    return this._call.inputValues[3].value.toString();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class MintManagerFeeCall extends ethereum.Call {
  get inputs(): MintManagerFeeCall__Inputs {
    return new MintManagerFeeCall__Inputs(this);
  }

  get outputs(): MintManagerFeeCall__Outputs {
    return new MintManagerFeeCall__Outputs(this);
  }
}

export class MintManagerFeeCall__Inputs {
  _call: MintManagerFeeCall;

  constructor(call: MintManagerFeeCall) {
    this._call = call;
  }
}

export class MintManagerFeeCall__Outputs {
  _call: MintManagerFeeCall;

  constructor(call: MintManagerFeeCall) {
    this._call = call;
  }
}

export class SetPoolManagerLogicCall extends ethereum.Call {
  get inputs(): SetPoolManagerLogicCall__Inputs {
    return new SetPoolManagerLogicCall__Inputs(this);
  }

  get outputs(): SetPoolManagerLogicCall__Outputs {
    return new SetPoolManagerLogicCall__Outputs(this);
  }
}

export class SetPoolManagerLogicCall__Inputs {
  _call: SetPoolManagerLogicCall;

  constructor(call: SetPoolManagerLogicCall) {
    this._call = call;
  }

  get _poolManagerLogic(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetPoolManagerLogicCall__Outputs {
  _call: SetPoolManagerLogicCall;

  constructor(call: SetPoolManagerLogicCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class SetPoolPrivateCall extends ethereum.Call {
  get inputs(): SetPoolPrivateCall__Inputs {
    return new SetPoolPrivateCall__Inputs(this);
  }

  get outputs(): SetPoolPrivateCall__Outputs {
    return new SetPoolPrivateCall__Outputs(this);
  }
}

export class SetPoolPrivateCall__Inputs {
  _call: SetPoolPrivateCall;

  constructor(call: SetPoolPrivateCall) {
    this._call = call;
  }

  get _privatePool(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class SetPoolPrivateCall__Outputs {
  _call: SetPoolPrivateCall;

  constructor(call: SetPoolPrivateCall) {
    this._call = call;
  }
}

export class TransferCall extends ethereum.Call {
  get inputs(): TransferCall__Inputs {
    return new TransferCall__Inputs(this);
  }

  get outputs(): TransferCall__Outputs {
    return new TransferCall__Outputs(this);
  }
}

export class TransferCall__Inputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TransferCall__Outputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get sender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get recipient(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get _fundTokenAmount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawToCall extends ethereum.Call {
  get inputs(): WithdrawToCall__Inputs {
    return new WithdrawToCall__Inputs(this);
  }

  get outputs(): WithdrawToCall__Outputs {
    return new WithdrawToCall__Outputs(this);
  }
}

export class WithdrawToCall__Inputs {
  _call: WithdrawToCall;

  constructor(call: WithdrawToCall) {
    this._call = call;
  }

  get _recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _fundTokenAmount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawToCall__Outputs {
  _call: WithdrawToCall;

  constructor(call: WithdrawToCall) {
    this._call = call;
  }
}
