import { AddressRepository, InMemoryAddressRepository } from "./addressRepo";
import { Address } from "../datatypes/address";

export const addressOne: Address = Address.usingIdLineOnePostCode(1, "LineOne1", "Postcode1");
export const addressTwo: Address = Address.from(2).withPostCode("Postcode1");
export const addressThree: Address = Address.from(3).withLineOne("LineOne1");

export const addressMemoryRepository: AddressRepository = InMemoryAddressRepository.of([addressOne, addressTwo, addressThree]);

test('Can get an Address from a memory-based Repository by ID', async () => {
    expect(addressMemoryRepository.getById(1)).toEqual(addressOne);
    expect(addressMemoryRepository.getById(9999)).toBeUndefined();
}, 100);

test('Can get an Address from a memory-based Repository by Line One and the PostCode', async () => {
    expect(addressMemoryRepository.getByLineOneAndPostCode("LineOne1", "Postcode1")).toEqual(addressOne);

    expect(addressMemoryRepository.getByLineOneAndPostCode("", undefined)).toBeUndefined();
    expect(addressMemoryRepository.getByLineOneAndPostCode(null, "")).toBeUndefined();
}, 100);

