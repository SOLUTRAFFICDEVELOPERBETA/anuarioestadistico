import * as firebase from 'firebase';
import 'firebase/storage';
import 'firebase/auth';
import firebaseConfig from './config';

// Objeto de Firebase
class Firebase {
    // Constructor de Firebase, habilitar solo después de definir las variables de entorno

    constructor() {
        let app;
        if (!firebase.apps.length) {
            app = firebase.initializeApp(firebaseConfig);
        } else {
            app = firebase.app();
        }
        this.auth = app.auth();
        this._auth = firebase.auth;
        this.db = app.firestore();
        this.functions = app.functions();
        this.storage = app.storage();
    }
}

const fb = new Firebase();

export default fb;
