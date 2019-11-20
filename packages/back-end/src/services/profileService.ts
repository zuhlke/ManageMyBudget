import { Family } from '../datatypes/family';
import { FamilyRepository } from '../db/familyRepo';
import { ProfileRepository } from '../db/profileRepo';
import { Profile } from '../datatypes/profile';
import { Address } from '../datatypes/address';

export class ProfileService {
    private readonly familyRepo: FamilyRepository;
    private readonly profileRepo: ProfileRepository;

    private constructor(familyRepo: FamilyRepository, profileRepo: ProfileRepository) {
        this.familyRepo = familyRepo;
        this.profileRepo = profileRepo;
    }

    public static of(familyRepo: FamilyRepository, profileRepo: ProfileRepository) {
        return new ProfileService(familyRepo, profileRepo);
    }

    public getFamilyByProfileId(profileId: number): Family | undefined {
        let result: Family | undefined = undefined;
        const profile: Profile | undefined = this.profileRepo.getById(profileId);

        if (profile !== undefined && profile.hasFamilyId()) {
            result = this.familyRepo.getById(profile.getFamilyId());
        }

        return result;
    }

    public getProfilesByFamilyId(familyId: number): Profile[] {
        let result: Set<Profile> = new Set<Profile>();
        const family: Family | undefined = this.familyRepo.getById(familyId);

        if (family !== undefined && family.hasFamilyMembers()) {
            for (const profileId of family.getFamilyMembers()) {
                const profile: Profile | undefined = this.profileRepo.getById(profileId);
                
                if (profile !== undefined) {
                    result.add(profile!);
                }
            }
        }

        return Array.from(result);
    }

    public getAddressByProfileId(profileId: number): Address | undefined {
        let result: Address | undefined = undefined;
        const profile: Profile | undefined = this.profileRepo.getById(profileId);

        if (profile !== undefined && profile.hasFamilyId()) {
            result = this.familyRepo.getAddressByFamilyId(profile.getFamilyId());
        }

        return result;
    }   

}