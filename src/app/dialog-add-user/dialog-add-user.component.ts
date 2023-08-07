import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, firestoreInstance$ } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
    selector: 'app-dialog-add-user',
    templateUrl: './dialog-add-user.component.html',
    styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
    user: User = new User();
    birthDate: Date = new Date();
    loading: boolean = false;

    firestore: Firestore = inject(Firestore);
    userCollection = collection(this.firestore, 'users');

    constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {

    }

    saveUser() {
        this.user.birthDate = this.birthDate.getTime(); // Wandelt das Datum in eine Zahl (Millisekunden seit dem 1.1.1970) um und weist diese dem user.birthDate zu
        this.loading = true;
        // console.log('current user:', this.user);

        addDoc(this.userCollection, this.user.toJSON())
        .then((result: any) => {
            console.log('Adding user finished:', result);
            this.loading = false;
            this.dialogRef.close();
        });
        // original-code von Junus: Alte Version von Firebase, funktioniert so nicht (mehr)
        // this.firestore
        //     .collection('users')
        //     .add(this.user)
        //     .then((result: any) => {
        //         console.log('Adding user finished:', result);
        //     }
        // )
    }

    cancelEdit() {
        this.dialogRef.close();
        // Statt des Aufrufs der Funktion cancelEdit() könnte der Schließen-Befehl auch direkt im Click-Event in der html-Datei eingetragen werden.
        // Dennoch hier eingetragen, damit ich, wenn gewünscht, weitere Funktionen beim Schließen einbauen kann.
    }
}
