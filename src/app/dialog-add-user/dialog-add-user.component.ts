import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, firestoreInstance$ } from '@angular/fire/firestore';
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

    firestore: Firestore = inject(Firestore);
    notizen$ !: Observable<any[]>;
    userCollection = collection(this.firestore, 'users');

    constructor() {

    }

    saveUser() {
        this.user.birthDate = this.birthDate.getTime(); // Wandelt das Datum in eine Zahl (Millisekunden seit dem 1.1.1970) um und weist diese dem user.birthDate zu
        console.log('current user:', this.user);

        // const notizColl = collection(this.firestore, 'notices');
        addDoc(this.userCollection, this.user.toJSON())
        .then((result: any) => {
                  console.log('Adding user finished:', result);
              });
        // this.firestore
        //     .collection('users')
        //     .add(this.user)
        //     .then((result: any) => {
        //         console.log('Adding user finished:', result);
        //     }
        // )
    }
}
