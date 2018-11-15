// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBfGugz1OwWy2i_jrb5riIvraE3bJvKYN4",
    authDomain: "triplannia-dev.firebaseapp.com",
    databaseURL: "https://triplannia-dev.firebaseio.com",
    projectId: "triplannia-dev",
    storageBucket: "triplannia-dev.appspot.com",
    messagingSenderId: "204002184316"
  },
  apiUrl: 'http://localhost:55555/api/',
  storageUrl: 'http://127.0.0.1:10000/devstoreaccount1/tppictures/',
  siteName: 'Triplannia'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
