import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService }  from  '../user/user.service';



@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  updateEmployeeForm: FormGroup;
  id:any;

  constructor(
    public router: Router,
    public actRoute:ActivatedRoute,
    public fb: FormBuilder,
    public userService: UserService,
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get('id')
    this.userService.getuser(this.id).valueChanges().subscribe(res=>{
      this.updateEmployeeForm.setValue(res)
    })
  }

  ngOnInit() {
    this.updateEmployeeForm = this.fb.group({
      employeeId: [''],
      name: [''],
      lname: [''],
      job: [''],
      age: [''],
    })
    console.log(this.updateEmployeeForm.value)
  }

  updateForm(){
   
    this.userService.Updateuser(this.id , this.updateEmployeeForm.value)
    .then(() => {  
      this.router.navigate(['/'])
    }).catch(error => console.log(error))
 
}

}
