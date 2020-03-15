import { Component, OnInit } from '@angular/core';
import { SrumdataService } from '../srumdata.service';
import { Router } from '@angular/router';
import { ScrumUserLoginData } from '../scrumuser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(private _scrumdataService: SrumdataService, private _router: Router) { }

  ngOnInit() {
  }
  scrumUserLoginData = new ScrumUserLoginData('', '', '');
  feedbk = "";
  onLoginSubmit(){
    console.log(this.scrumUserLoginData)
    this._scrumdataService.login(this.scrumUserLoginData).subscribe(
      data => {console.log('Success!', data)
      localStorage.setItem('Authuser', JSON.stringify(this.scrumUserLoginData));
      localStorage.setItem('Authobj', JSON.stringify(data));
      localStorage.setItem('token', data.token)
      this._router.navigate(['/scrumboard', data["project_id"]])
    },
      error => {console.error('Error', error)
      this.feedbk = "login failed"}
    
    )
  }
}
