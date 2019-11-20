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

    public static from(id: number): Profile {
        return new Profile(id);
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

    public hasId(): boolean {
        return this.id === -1;
    }

    public getFamilyId(): number {
        return (this.hasFamilyId()) ? this.familyId! : -1;
    }

    public hasFamilyId(): boolean {
        return this.familyId !== undefined && this.familyId !== null;
    }

    public withFamilyId(familyId: number): Profile {
        this.familyId = familyId;
        return this;
    }

    public getAge(): number {
        return (this.hasAge()) ? this.age! : -1;
    }

    public hasAge(): boolean {
        return this.age !== undefined && this.age !== null;
    }

    public withAge(age: number): Profile {
        this.age = age;
        return this;
    }

    public getName(): string {
        return (this.hasName()) ? this.name! : "";
    }

    public hasName(): boolean {
        return this.name !== undefined && this.name !== null;
    }

    public withName(name: string): Profile {
        this.name = name;
        return this;
    }
}