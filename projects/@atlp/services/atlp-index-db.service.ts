import { Injectable } from '@angular/core';
declare global {
  interface Window {
    ATLPIndexDB: any;
  }
}
@Injectable({
  providedIn: 'root',
})
export class AtlpIndexDBService {
  public storageName = 'atlpindexdbobject';

  constructor() {}

  add(keyname, value) {
    return new Promise(async (resolve, reject) => {
      if (window.ATLPIndexDB != undefined) {
        const request = window.ATLPIndexDB.transaction(
          [this.storageName],
          'readwrite'
        )
          .objectStore(this.storageName)
          .put(value, keyname);

        request.onsuccess = await function (event) {
          if (event.target.result) {
            //console.log('success');
            resolve('success');
          } else {
            //console.log('error');
            resolve(false);
          }
        };
      }
    });
  }

  get(keyname): any {
    return new Promise(async (resolve, reject) => {
      if (window.ATLPIndexDB != undefined) {
        const request = window.ATLPIndexDB.transaction(
          [this.storageName],
          'readwrite'
        )
          .objectStore(this.storageName)
          .get(keyname);

        request.onsuccess = await function (event) {
          if (event.target.result) {
            //console.log('success');
            resolve(event.target.result);
          } else {
            //console.log('error');
            resolve(false);
          }
        };
      }
    });
  }

  delete(keyname) {
    return new Promise(async (resolve, reject) => {
      if (window.ATLPIndexDB != undefined) {
        const request = window.ATLPIndexDB.transaction(
          [this.storageName],
          'readwrite'
        )
          .objectStore(this.storageName)
          .delete(keyname);

        request.onsuccess = await function (event) {
          if (event.target.result) {
            //console.log('success');
            resolve('success');
          } else {
            //console.log('error');
            resolve(false);
          }
        };
      }
    });
  }
}
