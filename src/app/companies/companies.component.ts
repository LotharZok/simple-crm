import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {

    firestore: Firestore = inject(Firestore);              // Zugriff auf Firestore
    compCollection = collection(this.firestore, 'users');  // Holen der Sammlung 'users'
    companies$: Observable<any> = collectionData
    (this.compCollection, { idField: 'id' }); // Zugriff auf die Daten der Sammlung, d.h. die einzelnen Einträge. Inkl. die ID eines Eintrags ins neue Feld id.
    allCompanies: string[] = [];


    openDialog() {
        console.log('openDialog wurde gestartet');

    }

    showEntry(id: string) {
        console.log('showEntry wurde geöffnet - id: ', id);
    }

    deleteCompany(id: string) {
        console.log('deleteCompany wurde gestartet - id: ', id);
        // OpenDialog stoppen
        event?.stopPropagation();
    }

    // ---------- TEST ---------- //
    expandContent = true;
    expandDept = true;

    testCompanies = [
        {
            name: 'A A & Co.',
            city: 'Augsburg',
            web: 'www.a-a.com',
            expanded: false,
            employees: [
                {
                    lastname: 'Aschenbrenner',
                    firstname: 'Adam',
                    mail: 'aasb@a-a.com'
                },
                {
                    lastname: 'Bodewig',
                    firstname: 'Barbara',
                    mail: 'bbod@a-a.com'
                },
                {
                    lastname: 'Cramer',
                    firstname: 'Chris',
                    mail: 'ccrm@a-a.com'
                }
            ]
        },
        {
            name: 'Bee GmbH',
            city: 'Biberach',
            web: 'www.bee.de',
            expanded: false,
            employees: [
                {
                    lastname: 'Diederichs',
                    firstname: 'Doro',
                    mail: 'doro-diederichs@bee.de'
                },
                {
                    lastname: 'Eberhardt',
                    firstname: 'Emil',
                    mail: 'emil-eberhardt@bee.de'
                },
                {
                    lastname: 'Finkel',
                    firstname: 'Fee',
                    mail: 'fee-finkel@bee.de'
                }
            ]
        },
        {
            name: 'Ceh & Taumen',
            city: 'Chemnitz',
            web: 'www.c-und-t.eur',
            expanded: false,
            employees: []
        },
        {
            name: 'D-E-F AG',
            city: 'Dormagen',
            web: 'www.d-e-f.de',
            expanded: false,
            employees: [
                {
                    lastname: 'Greiner',
                    firstname: 'Georg',
                    mail: 'greiner@d-e-f.de'
                },
                {
                    lastname: 'Jörgenson',
                    firstname: 'Jörg',
                    mail: 'joergenson@d-e-f.de'
                }
            ],
            departments: [
                {
                    name: 'Einkauf',
                    city: 'Korschenbroich',
                    mail: 'einkauf@d-e-f.de',
                    expanded: false,
                    employees: [
                        {
                            lastname: 'Holzweiler',
                            firstname: 'Hannah',
                            mail: 'holzweiler@d-e-f.de'
                        },
                        {
                            lastname: 'Ieschger',
                            firstname: 'Ingeborg',
                            mail: 'ieschger@d-e-f.de'
                        }
                    ]
                }
            ]
        }
    ];
}
