export class Profile {
    private readonly id: number;
    
    private familyId?: number;
    private age?: number;
    private name?: string;

    constructor (id: number, familyId?: number, age?: number, name?: string) {
        this.id = id;
        this.familyId = familyId;
        this.age = age;
        this.name = name;
    }

    public equals(object: any) {
        if (object === this) {
            return true;
        }

        if (object === undefined || object === null || !(object instanceof Profile)) {
            return false;
        }

        const that: Profile = object;

        return this.id === that.id;
    }

    public getId(): number {
        return this.id;
    }

    public hasFamily(): boolean {
        return this.familyId !== undefined && this.familyId !== null;
    }

    public getFamilyId(): number {
        return (this.hasFamily()) ? this.familyId! : -1;
    }

    public hasAge(): boolean {
        return this.age !== undefined && this.age !== null;
    }

    public getAge(): number {
        return (this.hasAge()) ? this.age! : -1;
    }

    public hasName(): boolean {
        return this.name !== undefined && this.name !== null;
    }

    public getName(): string {
        return (this.hasName()) ? this.name! : "";
    }
}