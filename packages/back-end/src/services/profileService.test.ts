import { familyMemoryRepository, familyOne } from '../db/familyRepo.test';
import { profileMemoryRepository, profileOne, profileTwo } from '../db/profileRepo.test';
import { ProfileService } from './profileService';
import { addressOne } from '../db/addressRepo.test';

const memoryProfileService: ProfileService = ProfileService.of(familyMemoryRepository, profileMemoryRepository);

test('Service can obtain a Family by a given Profile ID', async () => {
    expect(memoryProfileService.getFamilyByProfileId(1)).toEqual(familyOne); // happy path
    expect(memoryProfileService.getFamilyByProfileId(2)).toBeUndefined() // profile does not contain a family ID
    expect(memoryProfileService.getFamilyByProfileId(4)).toBeUndefined() // unknown Family ID
    expect(memoryProfileService.getFamilyByProfileId(9999)).toBeUndefined() // unknown Profile ID
}, 100);

test('Service can obtain an Array of Profiles by a given Family ID', async () => {
    expect(memoryProfileService.getProfilesByFamilyId(1)).toEqual([profileOne, profileTwo]); // happy path
    expect(memoryProfileService.getProfilesByFamilyId(3)).toEqual([]) // Family does not contain profiles
    expect(memoryProfileService.getProfilesByFamilyId(4)).toEqual([]) // unknown Profile ID
    expect(memoryProfileService.getProfilesByFamilyId(9999)).toEqual([]); // unknown Family ID
}, 100);

test('Service can obtain the Address associated with a Family via a Profile ID', async () => {
    expect(memoryProfileService.getAddressByProfileId(1)).toEqual(addressOne); // happy path
    expect(memoryProfileService.getAddressByProfileId(2)).toBeUndefined() // profile does not contain a family ID
    expect(memoryProfileService.getAddressByProfileId(4)).toBeUndefined() // unknown Family ID
    expect(memoryProfileService.getAddressByProfileId(9999)).toBeUndefined() // unknown Profile ID
}, 100);