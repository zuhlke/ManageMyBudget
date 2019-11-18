
export class Family {

    private readonly id: number;
    private addressId?: number;
    private membersNumber?: number[];
    private name?: string; 

    constructor (id: number, addressId?: number, members?: number[], name?: string) {
        this.id = id;
        this.addressId = addressId;
        this.membersNumber = members;
        this.name = name;
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

    public hasFamilyMembers(): boolean {
        return this.membersNumber !== undefined && this.membersNumber !== null;
    }

    public getFamilyCount(): number {
        return (this.hasFamilyMembers()) ? this.membersNumber!.length : 0;
    }

    public hasFamilyName(): boolean {
        return this.name !== undefined && this.name !== null;
    }

    public getFamilyName(): string {
        return (this.hasFamilyName()) ? this.name! : "";
    }

    public getFamilyMembers(): number[] {
        return (this.hasFamilyMembers()) ? this.membersNumber! : [];
    }

}