import { Profile } from '../datatypes/profile';

export interface ProfileRepository {
    getById(id: number): Profile | undefined;
}

export class InMemoryProfileRepository implements ProfileRepository {
    private data: Map<number, Profile> = new Map<number, Profile>();

    private constructor(profiles: Profile[]) {
        profiles.forEach((profile) => {
            this.data.set(profile.getId(), profile);
        })
    }

    public static newInstance(): ProfileRepository {
        return InMemoryProfileRepository.of([]);
    }

    public static of(profiles: Profile[]): ProfileRepository {
        return new InMemoryProfileRepository(profiles);
    }

    public getById(profileId: number): Profile | undefined {
        return this.data.get(profileId);
    }
}