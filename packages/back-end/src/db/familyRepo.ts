import { Family } from '../datatypes/family';
import { AddressRepository } from './addressRepo';
import { Address } from '../datatypes/address';

export interface FamilyRepository {
    getById(familyId: number): Family | undefined;
    getAddressByFamilyId(familyId: number): Address | undefined;
}

export class InMemoryFamilyRepository implements FamilyRepository {
    private data: Map<number, Family> = new Map<number, Family>();
    private addressRepo: AddressRepository;

    constructor(addressRepo: AddressRepository, families: Family[]) {
        this.addressRepo = addressRepo;

        families.forEach((family) => {
            this.data.set(family.getId(), family);
        });
    }

    public static from(addressRepo: AddressRepository): FamilyRepository {
        return InMemoryFamilyRepository.of(addressRepo, []);
    }

    public static of(addressRepo: AddressRepository, families: Family[]): FamilyRepository {
        return new InMemoryFamilyRepository(addressRepo, families);
    }

    public getById(familyId: number): Family | undefined {
        return this.data.get(familyId);
    }

    public getAddressByFamilyId(familyId: number): Address | undefined {
        let result: Address | undefined = undefined;
        const family: Family | undefined = this.data.get(familyId);

        if (family !== undefined && family.getAddressId !== undefined) {
            result = this.addressRepo.getById(family.getAddressId());
        }

        return result;
    }
}