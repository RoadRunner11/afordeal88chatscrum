import { Component, OnInit } from '@angular/core';
import { SrumdataService } from '../srumdata.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  scrumUserLoginData = {}

  constructor(private _scrumdataService: SrumdataService, private _router: Router) { }

  ngOnInit() {
  }
  feedbk = "";
  onLoginSubmit(){
    console.log(this.scrumUserLoginData)
    this._scrumdataService.login(this.scrumUserLoginData).subscribe(
      data => {console.log('Success!', data)
      localStorage.setItem('token', data.token)
      this._router.navigate(['/scrumboard'])
    },
      error => {console.error('Error', error)
      this.feedbk = "login failed"}
    
    )
  }
}
