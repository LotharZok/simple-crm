import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent {

    // user: User = new User();
    firestore: Firestore = inject(Firestore);              // Zugriff auf Firestore
    userCollection = collection(this.firestore, 'users');  // Holen der Sammlung 'users'
    users$: Observable<any> = collectionData(this.userCollection, { idField: 'id' }); // Zugriff auf die Daten der Sammlung, d.h. die einzelnen Einträge. Inkl. die ID eines Eintrags ins neue Feld id.
    allUsers: any[] = [];


    /**
     * Constructor - Startet die Anwendung und abonniert die Änderung der Daten aus/in Firebase.
     * 
     * @param dialog - Objekt für den Dialog
     */
    constructor(public dialog: MatDialog) {
        this.users$.subscribe((changes: any) => {         // Abonnieren der Änderung in den Daten users$ (s.o.)
            console.log('Received changes: ', changes);
            this.allUsers = changes;                       // Zuweisen der einzelnen Einträge in das Array allUsers
        });
    }


    /**
     * Öffnet den Dialog zum Hinzufügen eines Nutzers
     */
    openDialog(): void {
        this.dialog.open(DialogAddUserComponent);
    }


    /**
     * Löscht den ausgewählten Nutzer aus Firebase und aktualisiert die Darstellung.
     * 
     * @param id - Die ID des Nutzers, der gelöscht werden soll
     */
    deleteUser(id: string) {
        // OpenDialog stoppen
        event?.stopPropagation();

        let docRef = doc(this.userCollection, id);
        deleteDoc(docRef)
        .then(() => {
            console.log('Document has been deleted.');
        })
        .catch(error => {
            console.log('Error in deleting document: ', error);
        });
    }
}
