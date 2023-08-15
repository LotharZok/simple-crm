import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {

    firestore: Firestore = inject(Firestore);              // Zugriff auf Firestore
    userCollection = collection(this.firestore, 'users');  // Holen der Sammlung 'users'
    users$: Observable<any> = collectionData(this.userCollection, { idField: 'id' }); // Zugriff auf die Daten der Sammlung, d.h. die einzelnen Einträge. Inkl. die ID eines Eintrags ins neue Feld id.
    allUsers: any[] = [];

}
