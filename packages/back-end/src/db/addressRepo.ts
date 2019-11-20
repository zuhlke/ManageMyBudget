import { Address } from '../datatypes/address';

export interface AddressRepository {
    getById(addressId: number): Address | undefined;
    getByLineOneAndPostCode(lineOne: string | null | undefined, postCode: string | null | undefined): Address | undefined;
}

export class InMemoryAddressRepository implements AddressRepository {
    private data: Map<number, Address> = new Map<number, Address>();

    private constructor(initialData: Address[]) {
        initialData.forEach((address) => {
            this.data.set(address.getId(), address);
        });
    }

    public static newInstance(): AddressRepository {
        return InMemoryAddressRepository.of([]);
    }

    public static of(addresses: Address[]): AddressRepository {
        return new InMemoryAddressRepository(addresses);
    }

    public getById(addressId: number): Address | undefined {
        return this.data.get(addressId);
    }

    public getByLineOneAndPostCode(lineOne: string | null | undefined, postCode: string | null | undefined): Address | undefined {
        let result: Address | undefined = undefined;

        for (const entry of this.data.values()) {
            if (lineOne === entry.getLineOne() && postCode === entry.getPostCode()) {
                result = entry;
                break;
            }
        }

        return result;
    }
}