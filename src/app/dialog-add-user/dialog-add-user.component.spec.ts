import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUserComponent } from './dialog-add-user.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';

describe('DialogAddUserComponent', () => {
    let component: DialogAddUserComponent;
    let fixture: ComponentFixture<DialogAddUserComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule],
            declarations: [DialogAddUserComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: {}
                },
                {
                    provide: Firestore,
                    useValue: {}
                }
            ]
        });
        fixture = TestBed.createComponent(DialogAddUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
