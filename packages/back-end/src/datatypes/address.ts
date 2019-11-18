import ReactDOM from 'react-dom';
export class Address {

    private readonly id: number;
    private lineOne?: string;
    private postCode?: string;

    private lineTwo?: string;
    private lineThree?: string;
    private county?: string;

    constructor(id: number, postCode?: string, lineOne?: string, lineTwo?: string, lineThree?: string, county?: string) {
        this.id = id;
        this.lineOne = lineOne;
        this.lineTwo = lineTwo;
        this.lineThree = lineThree;
        this.county = county;
        this.postCode = postCode;
    }

    public equals(object: any): boolean {
        if (object === this) {
            return true;
        }

        if (object === undefined || object === null || !(object instanceof Address)) {
            return false;
        }

        const that: Address = object;

        return this.id === that.id;
    }

    public getId(): number {
        return this.id;
    }

    public hasLineOneAndPostcode(): boolean {
        return (this.lineOne !== undefined && this.lineOne !== null)
            && (this.postCode !== undefined && this.postCode !== null);
    }

}