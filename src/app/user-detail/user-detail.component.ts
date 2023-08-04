import { Component } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { user } from '@angular/fire/auth';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
    docId:any = '';
    curUser:User = new User();

    constructor(private route:ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {

    }

    ngOnInit(): void {
        this.route.paramMap.subscribe( paramMap => {
            this.docId = paramMap.get('id'); // Der Parameter id stammt aus der app-routing.module.ts -> path: 'user/:id', component: UserDetailComponent
            // console.log('Got ID: ', this.docId);
            this.getUser();
        })
    }

    async getUser() {
        const userCollection = collection(this.firestore, 'users');  // Holen der Sammlung 'users'
        const userRef = doc(userCollection, this.docId);             // Referenz auf das Dokument
        const userDoc = await getDoc(userRef);                       // Das Dokument selbst (Muss in diesen zwei Schritten gemacht werden)
        const userData = userDoc.data();                             // Zugriff auf die (lesbaren) Daten in JSON-Format
        this.curUser = new User(userData);                           // Speichern der Userdaten in einer Variablen der Klasse User (user.class.ts)
                                                                     // So kann ich im html mit z.B. {{ curUser.lastName }} auf den Namen zugreifen
        // Aber was ist mit dem automatischen Update? Wie mache ich ein Subscribe auf ein einzelnes Dokument?
    }

    editUserDetail() {
        let dialog = this.dialog.open(DialogEditUserComponent);
        dialog.componentInstance.user = this.curUser;
    }

    editMenu() {
        const dialog = this.dialog.open(DialogEditAddressComponent);
        dialog.componentInstance.user = this.curUser;
    }
}
