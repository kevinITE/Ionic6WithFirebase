import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import firebase from 'firebase/compat/app';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@firebase/auth-types';
import { Auth } from '@firebase/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user : User;
  auth : Auth;

  confirmationResult: firebase.auth.ConfirmationResult;


 constructor(public  afAuth:  AngularFireAuth, public  router:  Router,private fireAuth: AngularFireAuth) { 

  this.afAuth.authState.subscribe(user => {
    if (user){
      this.user = user;
      localStorage.setItem('user', JSON.stringify(this.user));
    } else {
      localStorage.setItem('user', null);
    }
  })

 }

  async login(email: string, password: string) {
  var result = await firebase.auth().signInWithEmailAndPassword(email, password)
  this.router.navigate(['/']);
}

async register(email: string, password: string) {
  var result =await firebase.auth().createUserWithEmailAndPassword(email, password);
  
  
}

 

get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}


async  loginWithGoogle(){
  await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  this.router.navigate(['/']);
}

logout() {
  firebase.auth().signOut();
}



async sendPasswordResetEmail(passwordResetEmail: string) {
  return await firebase.auth().sendPasswordResetEmail(passwordResetEmail);
}

public signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {
  return new Promise<any>((resolve, reject) => {

    firebase.auth().signInWithPhoneNumber(phoneNumber,recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        resolve(confirmationResult);
      }).catch((error) => {
        console.log(error);
        reject('SMS not sent');
      });
  });
}

public async enterVerificationCode(code) {
  return new Promise<any>((resolve, reject) => {
    this.confirmationResult.confirm(code).then(async (result) => {
      console.log(result);
      const user = result.user;
      resolve(user);
    }).catch((error) => {
      reject(error.message);
    });

  });
}
}
