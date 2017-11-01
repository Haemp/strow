const firebase = require('firebase')
const firebaseUi = require('firebaseui')
const firebaseApp = require('./FirebaseApp')



class LoginModel{

    init(){
        // listen for user logging out event
        firebase.auth().onAuthStateChanged(function(user) {
            if(!user){
                console.log('User logged out')
                document.dispatchEvent(new Event(LoginModel.LOGGED_OUT))
            }
        });

        return firebase.auth().getRedirectResult().then((result) => {
            if(result.user){
                // here we have a new user
                console.log('New user registereed', result);
                this.currentUser = result.user;
                const e = new Event(LoginModel.NEW_USER);
                e.data= result.user;
                document.dispatchEvent(e);
            }else{
                console.log('No redirect result was found, check current logged in user', firebase.auth().currentUser);
                this.currentUser = firebase.auth().currentUser;
            }
            return this.currentUser;
        }).catch((err) => {
            console.error('Error in redirect', err);
        });
    }

    async signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        let result
        try{
            console.log('Signing in with Google');
            result = await firebase.auth().signInWithRedirect(provider)
        }catch (err){
            console.log('There was an error');
            throw err;
        }

        if(result){
            console.log('Login result', result);
            this.user = result.user;
            return true;
        }else{

            console.log('No result');
            return false
        }
    }

    async signOut(){
        await firebase.auth().signOut();
    }
}

// Events 
LoginModel.LOGGED_OUT = 'LOGGED_OUT';
LoginModel.USER_ACTIVE = 'USER_ACTIVE';
LoginModel.NEW_USER = 'NEW_USER';


const loginModel = new LoginModel();
export default loginModel;