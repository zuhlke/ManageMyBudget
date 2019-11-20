import { Profile } from '../datatypes/profile';
import { ProfileRepository, InMemoryProfileRepository } from './profileRepo';

export const profileOne: Profile = Profile.from(1).withFamilyId(1).withAge(18).withName("John");
export const profileTwo: Profile = Profile.from(2).withAge(15).withName("Jane");
export const profileThree: Profile = Profile.from(3).withFamilyId(3).withName("Jake");
export const profileFour: Profile = Profile.from(4).withFamilyId(5).withAge(35);

export const profileMemoryRepository: ProfileRepository = InMemoryProfileRepository.of([profileOne, profileTwo, profileThree, profileFour]);

test('Can get a Profile from a Memory-based Repository using the Profile ID', async () => {
    expect(profileMemoryRepository.getById(1)).toEqual(profileOne);
    expect(profileMemoryRepository.getById(9999)).toBeUndefined();
}, 100);