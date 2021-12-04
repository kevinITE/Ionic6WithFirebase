import { Injectable } from '@angular/core';
import { AngularFireList , AngularFireObject,AngularFireDatabase } from '@angular/fire/compat/database';
import { UserModule } from '../user/user/user.module';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  userListRef : AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor( public db:AngularFireDatabase) { 
    this.userListRef = db.list('/')
  }
  getuser(id:string){
    return this.userRef = this.db.object('/'+ id)
  }

  Updateuser(id,user:UserModule){
    return this.userRef.update({
      employeeId:user.employeeId,
      name: user.name,
      lname:user.lname,
      job:user.job,
      age:user.age,
    })
  }

  getuserList(){
    return this.userListRef = this.db.list('/')
  }

  deleteuser(id:string){
    this.userRef = this.db.object('/'+ id)
    this.userRef.remove()
}
}
