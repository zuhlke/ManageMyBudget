import { Profile } from './profile';
import { familyOne, familyTwo, familyThree } from './family.test';

    export const profileOne: Profile = new Profile(1, familyOne.getId(), 18, "John");
    export const profileTwo: Profile = new Profile(2);
    export const profileThree: Profile = new Profile(1, familyTwo.getId());

test('Profile Equality check',  async () => {
    expect(profileOne.equals(profileOne)).toBeTruthy();

    expect(profileOne.equals(undefined)).toBeFalsy();
    expect(profileOne.equals(null)).toBeFalsy();
    expect(profileOne.equals({a: 'something'})).toBeFalsy();

    expect(profileOne.equals(profileThree)).toBeTruthy();
    expect(profileOne.equals(profileTwo)).toBeFalsy();
}, 100);

test('Profile have have a Family ID associated with it', async () => {
    expect(profileOne.getFamilyId()).toEqual(1);
    expect(profileTwo.getFamilyId()).toEqual(-1);
}, 100);

test('Profile may have an age associated with it', async () => {
    expect(profileOne.getAge()).toEqual(18);
    expect(profileTwo.getAge()).toEqual(-1);
}, 100);

test('Profile may have a name associated with it', async () => {
    expect(profileOne.getName()).toEqual("John");
    expect(profileTwo.getName()).toEqual("");
}, 100);