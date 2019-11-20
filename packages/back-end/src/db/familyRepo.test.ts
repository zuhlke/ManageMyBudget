import { Family } from '../datatypes/family';
import { addressMemoryRepository } from './addressRepo.test';
import { InMemoryFamilyRepository, FamilyRepository } from './familyRepo';
import { addressOne } from './addressRepo.test';

export const familyOne: Family = Family.from(1).withAddressId(1).withFamilyMembers([1, 2]).withFamilyName("Smith");
export const familyTwo: Family = Family.from(2).withFamilyMembers([3]).withFamilyName("Jones");
export const familyThree: Family = Family.from(3).withAddressId(3).withFamilyName("Jackson");
export const familyFour: Family = Family.from(4).withAddressId(4).withFamilyMembers([99]);

export const familyMemoryRepository: FamilyRepository = InMemoryFamilyRepository.of(addressMemoryRepository, [familyOne, familyTwo, familyThree, familyFour]);

test('Can get a Family from a Memory-based Repository by the ID', async () => {
    expect(familyMemoryRepository.getById(1)).toEqual(familyOne);
    expect(familyMemoryRepository.getById(9999)).toBeUndefined();
}, 100);

test('Can get an Address from a Memory-based Repository via the Family ID', async () => {
    expect(familyMemoryRepository.getAddressByFamilyId(1)).toEqual(addressOne);
    expect(familyMemoryRepository.getAddressByFamilyId(2)).toBeUndefined();
    expect(familyMemoryRepository.getAddressByFamilyId(4)).toBeUndefined();
});