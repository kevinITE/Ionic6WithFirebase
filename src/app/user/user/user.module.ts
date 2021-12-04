import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule { 

    $key: string;
    employeeId:string;
    name: string;
    lname:string;
    job:string;
    age:string;

}
export interface Song {
  id: string;
  albumName: string;
  artistName: string;
  songDescription: string;
  sonName: string;
}
