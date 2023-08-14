import { Component } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
    userBirthDate!: Date;
    userBirthDateString: String = '';

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
        // console.log('userData: ', userData);
        this.curUser = new User(userData);                           // Speichern der Userdaten in einer Variablen der Klasse User (user.class.ts)
                                                                     // So kann ich im html mit z.B. {{ curUser.lastName }} auf den Namen zugreifen
        this.userBirthDate = new Date(this.curUser.birthDate);
        this.userBirthDateString = this.userBirthDate.toISOString().substring(0, 10);
        // Aber was ist mit dem automatischen Update? Wie mache ich ein Subscribe auf ein einzelnes Dokument?

        // -- Das ist der Code von Junus, der aber so nicht funktioniert
        // this.firestore
        // .collection('users')
        // .doc(this.docId)
        // .valueChanges()
        // .subscribe( (user: any) => {
        //     this.curUser = new User(userData);
        // })
    }

    editUserDetail() {
        let dialog = this.dialog.open(DialogEditUserComponent);
        dialog.afterClosed().subscribe( result => {  // Auf diese Weise kann ich direkt auf Änderungen reagieren
            this.getUser();  // getUser holt ja die User-Daten, das nutze ich hier zur Aktualisierung
        });

        // dialog.componentInstance.user = this.curUser;
        // Problem mit der obigen Zeile: Ich übergebe eine Instanz des aktuellen Objekts, d.h. wenn ich dort etwas ändere (ngModel!!) wird es direkt auch im Objekt geändert.
        // Ich MUSS also eine Kopie übergeben, da ich sonst auch bei einem Abbruch im Dialog die Daten geändert habe.

        dialog.componentInstance.user = new User(this.curUser.toJSON());
        dialog.componentInstance.docId = this.docId;
        dialog.componentInstance.birthDate = new Date(this.curUser.birthDate);
        // Auf diese Weise, erstelle ich eine KOPIE des Nutzers
    }

    editMenu() {
        const dialog = this.dialog.open(DialogEditAddressComponent);
        dialog.afterClosed().subscribe( result => {  // Auf diese Weise kann ich direkt auf Änderungen reagieren
            this.getUser();  // getUser holt ja die User-Daten, das nutze ich hier zur Aktualisierung
        });
        dialog.componentInstance.user = new User(this.curUser.toJSON());  // s.o. zur Erläuterung
        dialog.componentInstance.docId = this.docId;
    }
}
