export class Address {

    private readonly id: number;
    private lineOne?: string;
    private postCode?: string;

    private lineTwo?: string;
    private lineThree?: string;
    private county?: string;

    private constructor(id: number, postCode?: string, lineOne?: string, lineTwo?: string, lineThree?: string, county?: string) {
        this.id = id;
        this.lineOne = lineOne;
        this.lineTwo = lineTwo;
        this.lineThree = lineThree;
        this.county = county;
        this.postCode = postCode;
    }

    public static from(id: number): Address {
        return new Address(id);
    }

    public static usingIdLineOnePostCode(id: number, lineOne: string, postCode: string) {
        return new Address(id, postCode, lineOne);
    }

    public static usingLineOnePostCode(lineOne: string, postCode: string): Address {
        return Address.usingIdLineOnePostCode(-1, lineOne, postCode);
    }

    private static hasParameter(parameter: any): boolean {
        return parameter !== undefined && parameter !== null;
    }

    public equals(object: any): boolean {
        if (object === this) {
            return true;
        }

        if (object === undefined || object === null || !(object instanceof Address)) {
            return false;
        }

        const that: Address = object;

        return (this.hasId()) 
        ? (this.id === that.id)
        : (this.lineOne === that.lineOne && this.postCode === that.postCode);
    }

    public getId(): number {
        return this.id;
    }

    public hasId(): boolean {
        return this.id !== -1;
    }

    public getLineOne(): string {
        return this.hasLineOne() ? this.lineOne! : "";
    }

    public hasLineOne(): boolean {
        return Address.hasParameter(this.lineOne);
    }

    public withLineOne(lineOne: string): Address {
        this.lineOne = lineOne;
        return this;
    }

    public getPostCode(): string {
        return this.hasPostCode() ? this.postCode! : "";
    }

    public hasPostCode(): boolean {
        return Address.hasParameter(this.postCode);
    }

    public withPostCode(postCode: string): Address {
        this.postCode = postCode;
        return this;
    }

    public hasLineOneAndPostcode(): boolean {
        return this.hasLineOne() && this.hasPostCode();
    }

    public getLineTwo(): string {
        return this.hasLineTwo() ? this.lineTwo! : "";
    }

    public hasLineTwo(): boolean {
        return Address.hasParameter(this.lineTwo);
    }

    public withLineTwo(lineTwo: string): Address {
        this.lineTwo = lineTwo;
        return this;
    }

    public getLineThree(): string {
        return this.hasLineThree() ? this.lineThree! : "";
    }

    public hasLineThree(): boolean {
        return Address.hasParameter(this.lineThree);
    }

    public withLineThree(lineThree: string): Address {
        this.lineThree = lineThree;
        return this;
    }

    public getCounty(): string {
        return this.hasCounty() ? this.county! : "";
    }

    public hasCounty(): boolean {
        return Address.hasParameter(this.county);
    }

    public withCounty(county: string): Address {
        this.county = county;
        return this;
    }

}