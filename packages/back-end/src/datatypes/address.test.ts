import { Address } from './address';

    export const addressOne: Address = new Address(1, "Postcode1", "LineOne1");
    export const addressTwo: Address = new Address(2, "");
    export const addressThree: Address = new Address(1, undefined, "Lineone3");

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


