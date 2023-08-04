import { Component } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
    docId:any = '';
    curUser:User = new User();

    constructor(private route:ActivatedRoute, private firestore: Firestore) {

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
        const userRef = doc(userCollection, this.docId); // Referenz auf das Dokument
        const userDoc = await getDoc(userRef); // Das Dokument selbst (Muss in diesen zwei Schritten gemacht werden)
        // console.log('User doc: ', userDoc);
        const userData = userDoc.data(); // Zugriff auf die (lesbaren) Daten in JSON-Format
        // console.log('User data: ', userData);
        this.curUser = new User(userData);
        // console.log(this.curUser);
    } 
}
