import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AuthService } from  '../auth/auth.service';

import {  CountryJson } from '../../environments/environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements  OnInit {

  usercreatedAt: any;
  useremail: any;
  CountryJson = CountryJson;
  OTP: string = '';
  Code: any;
  PhoneNo: any;
  CountryCode: any = '+91';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
 
  public user : any
  public user_id: any ;
  public user_idd: any ;
  constructor(public auth: AngularFireAuth ,public  authService:  AuthService,
    analytics: AngularFireAnalytics,private alertController: AlertController,
  ) {
    

   

    this.auth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
    this.user = localStorage.getItem('user')
    console.log(this.user.email)
   
    this.user = localStorage.getItem('user')
    this.useremail=this.user.email;
    this.usercreatedAt=this.user.createdAt;
    console.log(this.user.email)
    analytics.logEvent (   "login"  ,   { content_type :  [ "tab2open" ] ,lastname :  [ "darwish" ]  }) ;
   analytics.setUserId (this.user.uid) ;
    analytics.setUserProperties( { useremail :  [ this.useremail ] ,usercreatedAt :  [ this.usercreatedAt ]  }) ;
    analytics.setCurrentScreen("setCurrentScreen : tab1page");
   
    analytics.setAnalyticsCollectionEnabled(true);
  }
  ngOnInit() {


  }



   register()
  {
    this.authService.register("yazan@yahoo.com","3131531")
  }

  login() {
       this.authService.login("yazandarwish@gmail.com","12112313")
    // var result = await this.auth.signInWithEmailAndPassword("yazandarwish99@gmail.com","123456")
  
  }

  loginig() {
    this.authService.loginWithGoogle();
    //this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }
  logout() {
    this.authService.logout();
  }

  sendPasswordResetEmail()
  {
    this.authService.sendPasswordResetEmail("yazandarwish@gmail.com");
  }


  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'visible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
       size: 'visible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

  countryCodeChange($event) {
    this.CountryCode = $event.detail.value;
  }
  // Button event after the nmber is entered and button is clicked
  signinWithPhoneNumber($event) {
    console.log('country', this.recaptchaVerifier);

    if (this.PhoneNo && this.CountryCode) {
      this.authService.signInWithPhoneNumber(this.recaptchaVerifier, this.CountryCode + this.PhoneNo).then(
        success => {
          this.OtpVerification();
        }
      );
    }
  }
  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Success',
      buttons: [
        {
          text: 'Ok',
          handler: (res) => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }
  async OtpVerification() {
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter your otp',
        }
      ],
      buttons: [{
        text: 'Enter',
        handler: (res) => {
          this.authService.enterVerificationCode(res.otp).then(
            userData => {
              this.showSuccess();
              console.log(userData);
            }
          );
        }
      }
      ]
    });
    await alert.present();
  }

  async OtpVerification11() {
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter your otp',
        }
      ],
      buttons: [{
        text: 'Enter',
        handler: (res) => {
          this.authService.enterVerificationCode("123456").then(
            userData => {
              this.showSuccess();
              console.log(userData);
            }
          );
        }
      }
      ]
    });
    await alert.present();
  }
  

}