export class User {
    firstName: string;
    lastName: string;
    birthDate: number;
    street: string;
    zipCode: string;  // Ausländische Adressen haben ggf. Zahlen und Buchstaben, daher string
    city: string;

    constructor(obj?: any) {
        // Das ? hinter obj bedeutet, daß der Parameter optional ist
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : 0;
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city
        }
    }
}