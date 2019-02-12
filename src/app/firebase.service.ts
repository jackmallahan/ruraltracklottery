import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getUser(userKey) {
    return this.db.collection('students').doc(userKey);
  }

  updateUser(userKey, value) {
    value.nameToSearch = `${value.firstName.toLowerCase()} ${value.lastName.toLowerCase()}`;
    return this.db.collection('students').doc(userKey).set(value);
  }

  createStudent(value) {
    console.log(value);
    return this.db.collection('students').add({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      firstChoice: value.firstChoice,
      secondChoice: value.secondChoice,
      thirdChoice: value.thirdChoice,
      fourthChoice: value.fourthChoice,
      fifthChoice: value.fifthChoice
    });
  }
}
