import { Component, OnInit } from '@angular/core';
import { Scrumuser } from '../scrumuser';
import { SrumdataService } from '../srumdata.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _scrumdataService: SrumdataService) { }

  ngOnInit() {
  }
  userTypes = ['regular user', 'project owner'];
  scrumUserModel = new Scrumuser('', '', '', '', ''); 
  feedbk ="";

  onSubmit(){
    console.log(this.scrumUserModel);
    this._scrumdataService.signup(this.scrumUserModel).subscribe(
      data => {console.log('Success!', data)
              this.feedbk ="Your account was created successfully"
             },
      error => {
        console.error('Error', error)
        this.feedbk = "Signup failed"
      }
      
    )
  }
}
