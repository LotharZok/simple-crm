import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
    selector: 'app-dialog-edit-address',
    templateUrl: './dialog-edit-address.component.html',
    styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
    user!: User;
    loading: boolean = false;

    constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {

    }

    cancelEdit() {
        this.dialogRef.close();
    }

    saveUser() {

    }
}