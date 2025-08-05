import { dataSource, Address } from '@graphprotocol/graph-ts';

const DAO_ADDRESS_POLYGON = Address.fromString('0x6f005cbceC52FFb28aF046Fd48CB8D6d19FD25E3');
const DAO_ADDRESS_OPTIMISM = Address.fromString('0xD857e322351Dc56592e3D9181FBF65034EF4aef2');
const DAO_ADDRESS_BASE = Address.fromString('0xEE27793EBAf6a446c74C2cDd23Bba615e9472264');
const DAO_ADDRESS_ARBITRUM = Address.fromString('0x26f7cbd49A4DC3321780AE8e7e0cb460f55a7511');
const DAO_ADDRESS_MAINNET = Address.fromString('0xfF44B48abad9cb7A2485f829E5c9A4d1cee623c9');

export function getDaoAddress(): Address {
    let network = dataSource.network();

    if (network == 'polygon') {
        return DAO_ADDRESS_POLYGON;
    } else if (network == 'optimism') {
        return DAO_ADDRESS_OPTIMISM;
    } else if (network == 'base') {
        return DAO_ADDRESS_BASE;
    } else if (network == 'arbitrum') {
        return DAO_ADDRESS_ARBITRUM;
    } else if (network == 'mainnet') {
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

    if (network == 'polygon') {
        return POOL_FACTORY_ADDRESS_POLYGON;
    } else if (network == 'optimism') {
        return POOL_FACTORY_ADDRESS_OPTIMISM;
    } else if (network == 'base') {
        return POOL_FACTORY_ADDRESS_BASE;
    } else if (network == 'arbitrum') {
        return POOL_FACTORY_ADDRESS_ARBITRUM;
    } else if (network == 'mainnet') {
        return POOL_FACTORY_ADDRESS_MAINNET;
    } else {
        throw new Error(`Missing pool factory address for the network ${network}`);
    }
}

export const POOL_FACTORY_ADDRESS = '0xfdc7b8bFe0DD3513Cc669bB8d601Cb83e2F69cB0';
