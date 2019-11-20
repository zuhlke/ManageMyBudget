import { Address } from './address';

    export const addressOne: Address = Address.usingIdLineOnePostCode(1, "LineOne1", "Postcode1");
    export const addressTwo: Address = Address.from(2).withPostCode("");
    export const addressThree: Address = Address.from(1).withLineThree("Lineone3");

test('Address Equality check',  async () => {
    expect(addressOne.equals(addressOne)).toBeTruthy();
    
    expect(addressOne.equals(undefined)).toBeFalsy();
    expect(addressOne.equals(null)).toBeFalsy();
    expect(addressOne.equals({a: 'something'})).toBeFalsy();

    expect(addressOne.equals(addressThree)).toBeTruthy();
    expect(addressOne.equals(addressTwo)).toBeFalsy();
}, 100);

test('Address should contain line one and a postcode to be considered valid enough', async () => {
    expect(addressOne.hasLineOneAndPostcode()).toBeTruthy();
    expect(addressTwo.hasLineOneAndPostcode()).toBeFalsy();
    expect(addressThree.hasLineOneAndPostcode()).toBeFalsy();
}, 100);

test('Address should return an empty string when there is no Line One', async () => {
    expect(addressTwo.getLineOne()).toEqual("");
}, 100);

test('Address should return an empty string when there is no Line Two', async () => {
    expect(addressTwo.getLineTwo()).toEqual("");
}, 100);

test('Address should return an empty string when there is no Line Three', async () => {
    expect(addressTwo.getLineThree()).toEqual("");
}, 100);

test('Address should return an empty string when there is no County', async () => {
    expect(addressTwo.getCounty()).toEqual("");
}, 100);

test('Address should return an empty string when there is no PostCode', async () => {
    expect(addressThree.getPostCode()).toEqual("");
}, 100);

test('An address can be created using only the Line One and Post Code fields', async () => {
    const thinAddress: Address = Address.usingLineOnePostCode("LineOne1", "Postcode1");

    expect(thinAddress.equals(addressOne)).toBeTruthy();
}, 100);
