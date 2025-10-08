import { dataSource, Address } from '@graphprotocol/graph-ts';
import { Network } from "./helpers";

const DAO_ADDRESS_POLYGON = Address.fromString('0x6f005cbceC52FFb28aF046Fd48CB8D6d19FD25E3');
const DAO_ADDRESS_OPTIMISM = Address.fromString('0xD857e322351Dc56592e3D9181FBF65034EF4aef2');
const DAO_ADDRESS_BASE = Address.fromString('0xEE27793EBAf6a446c74C2cDd23Bba615e9472264');
const DAO_ADDRESS_ARBITRUM = Address.fromString('0x26f7cbd49A4DC3321780AE8e7e0cb460f55a7511');
const DAO_ADDRESS_MAINNET = Address.fromString('0xfF44B48abad9cb7A2485f829E5c9A4d1cee623c9');

export function getDaoAddress(): Address {
    let network = dataSource.network();

    if (network == Network.POLYGON) {
        return DAO_ADDRESS_POLYGON;
    } else if (network == Network.OPTIMISM) {
        return DAO_ADDRESS_OPTIMISM;
    } else if (network == Network.BASE) {
        return DAO_ADDRESS_BASE;
    } else if (network == Network.ARBITRUM) {
        return DAO_ADDRESS_ARBITRUM;
    } else if (network == Network.MAINNET) {
        return DAO_ADDRESS_MAINNET;
    } else {
        throw new Error(`Missing dao address for the network ${network}`);
    }
}

const POOL_FACTORY_ADDRESS_POLYGON = Address.fromString('0xfdc7b8bFe0DD3513Cc669bB8d601Cb83e2F69cB0');
const POOL_FACTORY_ADDRESS_OPTIMISM = Address.fromString('0x5e61a079A178f0E5784107a4963baAe0c5a680c6');
const POOL_FACTORY_ADDRESS_BASE = Address.fromString('0x49Afe3abCf66CF09Fab86cb1139D8811C8afe56F');
const POOL_FACTORY_ADDRESS_ARBITRUM = Address.fromString('0xffFb5fB14606EB3a548C113026355020dDF27535');
const POOL_FACTORY_ADDRESS_MAINNET = Address.fromString('0x96D33bCF84DdE326014248E2896F79bbb9c13D6d');

export function getPoolFactoryAddress(): Address {
    let network = dataSource.network();

    if (network == Network.POLYGON) {
        return POOL_FACTORY_ADDRESS_POLYGON;
    } else if (network == Network.OPTIMISM) {
        return POOL_FACTORY_ADDRESS_OPTIMISM;
    } else if (network == Network.BASE) {
        return POOL_FACTORY_ADDRESS_BASE;
    } else if (network == Network.ARBITRUM) {
        return POOL_FACTORY_ADDRESS_ARBITRUM;
    } else if (network == Network.MAINNET) {
        return POOL_FACTORY_ADDRESS_MAINNET;
    } else {
        throw new Error(`Missing pool factory address for the network ${network}`);
    }
}

const EASY_SWAPPER_V2_POLYGON = Address.fromString('0x45b90480d6f643de2f128db091a357c3c90399f2')
const EASY_SWAPPER_V2_OPTIMISM = Address.fromString('0x2ed1bd7f66e47113672f3870308b5e867c5bb743')
const EASY_SWAPPER_V2_BASE = Address.fromString('0xf067575eb60c7587c11e867907aa7284833704d1')
const EASY_SWAPPER_V2_ARBITRUM = Address.fromString('0xa5679c4272a056bb83f039961fae7d99c48529f5')
const EASY_SWAPPER_V2_MAINNET = Address.fromString('0xbdd84294bc8299861a2121f749a25efeb7168a32')

export function getEasySwapperV2Address(): Address {
    let network = dataSource.network()

    if (network == Network.POLYGON) {
        return EASY_SWAPPER_V2_POLYGON
    } else if (network == Network.OPTIMISM) {
        return EASY_SWAPPER_V2_OPTIMISM
    } else if (network == Network.BASE) {
        return EASY_SWAPPER_V2_BASE
    } else if (network == Network.ARBITRUM) {
        return EASY_SWAPPER_V2_ARBITRUM
    } else if (network == Network.MAINNET) {
        return EASY_SWAPPER_V2_MAINNET
    } else {
        throw new Error(`Missing easy swapper v2 address for network ${network}`)
    }
}
