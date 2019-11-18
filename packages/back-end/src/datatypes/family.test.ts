import { Family } from './family';
import { addressOne, addressTwo, addressThree } from './address.test';

    export const familyOne: Family = new Family(1, addressOne.getId(), [1, 2], "adams");
    export const familyTwo: Family = new Family(2, addressTwo.getId(), [2, 3], "smiths");
    export const familyThree: Family = new Family(1);

test('Family Equality check',  async () => {
    expect(familyOne.equals(familyOne)).toBeTruthy();

    expect(familyOne.equals(undefined)).toBeFalsy();
    expect(familyOne.equals(null)).toBeFalsy();
    expect(familyOne.equals({a: 'something'})).toBeFalsy();

    expect(familyOne.equals(familyThree)).toBeTruthy();
    expect(familyOne.equals(familyTwo)).toBeFalsy();
}, 100);

test('Get Family count', async () => {
    expect(familyOne.getFamilyCount()).toEqual(2);
    expect(familyThree.getFamilyCount()).toEqual(0);
}, 100);

test('Get Family name', async () => {
    expect(familyOne.getFamilyName()).toEqual("adams");
    expect(familyThree.getFamilyName()).toEqual("");
}, 100);

test('Get associated Family Profiles', async () => {
    expect(familyOne.getFamilyMembers()).toEqual([1, 2]);
    expect(familyOne.getFamilyMembers()).not.toEqual(familyTwo.getFamilyMembers());
}, 100);

test('Get Family address', async () => {
    //address id
    //family id
    //members ? => number | calculated from profile[]


}, 100);