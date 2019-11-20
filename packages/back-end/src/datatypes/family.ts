
export class Family {

    private readonly id: number;
    private addressId?: number;
    private familyProfileIds?: number[];
    private name?: string; 

    constructor (id: number, addressId?: number, members?: number[], name?: string) {
        this.id = id;
        this.addressId = addressId;
        this.familyProfileIds = members;
        this.name = name;
    }

    public static from(familyId: number): Family {
        return new Family(familyId);
    }

    public static usingFamilyAndAddressIds(familyId: number, addressId: number): Family {
        return new Family(familyId, addressId);
    }
    
    public equals (object: any): boolean {
        if (object === this) {
            return true;
        }

        if (object === undefined || object === null || !(object instanceof Family)) {
            return false;
        }

        const that: Family = object;

        return this.id === that.id;
    }

    public getId(): number {
        return this.id;
    }

    public hasId(): boolean {
        return this.id !== -1;
    }

    public getFamilyMembers(): number[] {
        return (this.hasFamilyMembers()) ? this.familyProfileIds! : [];
    }

    public hasFamilyMembers(): boolean {
        return this.familyProfileIds !== undefined && this.familyProfileIds !== null;
    }

    public withFamilyMembers(familyProfileIds: number[]): Family {
        this.familyProfileIds = familyProfileIds;
        return this;
    }

    public getFamilyCount(): number {
        return (this.hasFamilyMembers()) ? this.familyProfileIds!.length : 0;
    }

    public getFamilyName(): string {
        return (this.hasFamilyName()) ? this.name! : "";
    }

    public hasFamilyName(): boolean {
        return this.name !== undefined && this.name !== null;
    }

    public withFamilyName(familyName: string): Family {
        this.name = familyName;
        return this;
    }

    public getAddressId(): number {
        return this.hasAddressId() ? this.addressId! : -1;
    }

    public hasAddressId(): boolean {
        return this.addressId !== undefined && this.addressId !== null && this.addressId !== -1;
    }

    public withAddressId(addressId: number): Family {
        this.addressId = addressId;
        return this;
    }
}