export class User {
    companyId: string;
    // Firmenangaben:
    name: string;
    addLine: string;
    // Adressdaten
    street: string;
    postbox: string;
    zipCode: string;  // Ausländische Adressen haben ggf. Zahlen und Buchstaben, daher string
    city: string;
    country: string;
    // Kontaktdaten
    web: string;
    email: string;
    phone: string;    // Number? - Wegen ggf. Leerzeichen, + oder / --> String
    // Beschreibung (Freitext für Hinweise)
    description: string;

    constructor(obj?: any) {
        // Das ? hinter obj bedeutet, daß der Parameter optional ist
        this.companyId = obj ? obj.companyId : '';
        this.name = obj ? obj.name : '';
        this.addLine = obj ? obj.addLine : '';
        this.street = obj ? obj.street : '';
        this.postbox = obj ? obj.postbox : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.country = obj ? obj.country : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.web = obj ? obj.web : '';
        this.description = obj ? obj.description : '';
    }

    public toJSON() {
        return {
            companyId: this.companyId,
            name: this.name,
            addLine: this.addLine,
            street: this.street,
            postbox: this.postbox,
            zipCode: this.zipCode,
            city: this.city,
            country: this.country,
            email: this.email,
            phone: this.phone,
            web: this.web,
            description: this.description
        }
    }
}