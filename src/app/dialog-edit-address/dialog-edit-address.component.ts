import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
    selector: 'app-dialog-edit-address',
    templateUrl: './dialog-edit-address.component.html',
    styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
    user!: User;
    docId: string = '';
    loading: boolean = false;
    firestore: Firestore = inject(Firestore);
    userCollection = collection(this.firestore, 'users');

    constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {

    }

    cancelEdit() {
        this.dialogRef.close();
    }

    saveUser() {
        this.loading = true;
        console.log('docID: ', this.docId);
        const userRef = doc(this.userCollection, this.docId);
        updateDoc(userRef, this.user.toJSON())
        .then( () => {
            this.loading = false;
            this.dialogRef.close();
        });
    }
}
