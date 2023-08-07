import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
    selector: 'app-dialog-edit-user',
    templateUrl: './dialog-edit-user.component.html',
    styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
    user!: User;
    docId: string = '';
    loading: boolean = false;
    birthDate: Date = new Date();
    firestore: Firestore = inject(Firestore);
    userCollection = collection(this.firestore, 'users');

    constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {

    }

    cancelEdit() {
        this.dialogRef.close();
    }

    saveUser() {
        this.loading = true;
        this.user.birthDate = this.birthDate.getTime(); // Wandelt das Datum in eine Zahl (Millisekunden seit dem 1.1.1970) um und weist diese dem user.birthDate zu
        const userRef = doc(this.userCollection, this.docId);
        updateDoc(userRef, this.user.toJSON())
        .then( () => {
            this.loading = false;
            this.dialogRef.close();
        });
    }
}
