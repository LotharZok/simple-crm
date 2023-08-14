export class User {
    userId: string;
    type: string;     // user (interner Nutzer) oder employee (Angestellter einer Firma)
    // Persönliche Angaben:
    firstName: string;
    lastName: string;
    title: string;    // z.B. Prof. Dr.
    birthDate: number;
    // Adressdaten
    street: string;
    zipCode: string;  // Ausländische Adressen haben ggf. Zahlen und Buchstaben, daher string
    city: string;
    country: string;
    // Kontaktdaten
    email: string;
    phone: string;    // Number? - Wegen ggf. Leerzeichen, + oder / --> String
    mobile: string;
    // Beschreibung (Freitext für Hinweise)
    description: string;

    constructor(obj?: any) {
        // Das ? hinter obj bedeutet, daß der Parameter optional ist
        this.userId = obj ? obj.userId : '';
        this.type = obj ? obj.type : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.title = obj ? obj.title : '';
        this.birthDate = obj ? obj.birthDate : 0;
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.country = obj ? obj.country : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.mobile = obj ? obj.mobile : '';
        this.description = obj ? obj.description : '';
    }

    public toJSON() {
        return {
            userId: this.userId,
            type: this.type,
            firstName: this.firstName,
            lastName: this.lastName,
            title: this.title,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            country: this.country,
            email: this.email,
            phone: this.phone,
            mobile: this.mobile,
            description: this.description
        }
    }
}