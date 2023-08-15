import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

    firestore: Firestore = inject(Firestore);  // Zugriff auf Firestore
    settingsCollection = collection(this.firestore, "settings");  // Holen der Sammlung 'settings'
    settings$: Observable<any> = collectionData(this.settingsCollection, { idField: 'id' }); // Zugriff auf die Daten der Sammlung, d.h. die einzelnen Einträge. Inkl. die ID eines Eintrags ins neue Feld id.
    allSettings: any[] = [];

    statuses: any[] = [];
    priorities: any[] = [];
    
    constructor() {
        // console.log('settingsCollection: ', this.settingsCollection);
        // console.log('settings$: ', this.settings$);

        this.settings$.subscribe((changes: any) => {         // Abonnieren der Änderung in den Daten users$ (s.o.)
            // console.log('Received changes: ', changes);
            this.allSettings = changes;                       // Zuweisen der einzelnen Einträge in das Array allUsers
            // console.log('allSettings: ', this.allSettings);

            this.statuses = this.allSettings.filter( setting => setting.section == 'status');
            this.priorities = this.allSettings.filter( setting => setting.section == 'priority');

            // console.log('statuses: ', this.statuses);
            // console.log('priorities: ', this.priorities);

            this.statuses.sort( (a, b) => {
                return a.level - b.level;
            });
            this.priorities.sort( (a, b) => {
                return a.level - b.level;
            });

            // console.log('statuses: ', this.statuses);
            // console.log('priorities: ', this.priorities);
        });
    }

}
