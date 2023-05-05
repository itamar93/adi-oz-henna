import { Injectable, inject } from '@angular/core';
import { Database, ref, get, child, set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private database: Database = inject(Database);
  rootPath = '/your_collection_name/';

  constructor() { }

  async isExists(userId: string, firstName: string, lastName: string): Promise<boolean> {
    const dbRef = ref(this.database, this.rootPath);
    let guestExists = false;

    try {
      const snapshot = await get(child(dbRef, `${userId}`));
      if (snapshot.exists()) {
        console.log(snapshot.val());
        if (
          snapshot.val()['firstName'] === firstName &&
          snapshot.val()['lastName'] === lastName
        ) {
          guestExists = true;
        } else {
          console.log("No data available");
        }
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }

    return guestExists;
  }

  async isAttendEmpty(userId: string): Promise<boolean> {
    console.log("isAttendEmpty");
    let attendEmpty = false;
    const dbRef = ref(this.database, this.rootPath);
    try {
      const snapshot = await get(child(dbRef, `${userId}`));
      console.log(snapshot.val());
      if (snapshot.val()['Attend'] === '') { attendEmpty = true; }
    }
    catch (error) {
      console.error(error);
    }
    return attendEmpty;
  }

  async getAttendancyValue(userId: string): Promise<boolean> {
    const dbRef = ref(this.database, this.rootPath);
    const snapshot = await get(child(dbRef, `${userId}/Attend`));
    return snapshot.val();
  }

  getNumOfGuest(userId: string, firstName: string, lastName: string) {

  }

  submitAttendancy(userId: string, firstName: string, lastName: string, attendancy: boolean, numOfGuests: number) {
    set(ref(this.database, this.rootPath + `${userId}`), {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      Attend: attendancy,
      numOfGuests: numOfGuests
    })
    .then(() => {
      console.log(`Successfully submitted attendancy for user ID: ${userId}`);
      alert("הטופס נשלח בהצלחה!");
    })
    .catch((error) => {
      console.error(`Failed to submit attendancy for user ID: ${userId}`, error);
      alert("הטופס לא נשלח");
    });
  }
}
