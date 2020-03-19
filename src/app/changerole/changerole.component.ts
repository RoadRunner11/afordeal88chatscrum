import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Scrumuser } from '../scrumuser';
import { SrumdataService } from '../srumdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changerole',
  templateUrl: './changerole.component.html',
  styleUrls: ['./changerole.component.css']
})
export class ChangeroleComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _scrumdataService: SrumdataService, private _router: Router) { }

  ngOnInit(): void {
  }
  roleId = this._route.snapshot.paramMap.get('role_id')
  Auth = JSON.parse(localStorage.getItem('Authobj'))
  project_id = this.Auth.project_id
  changeRole = new Scrumuser('', '', this.roleId, '', this.project_id);
  feedbk = ""

  userTypes: any[] = ['Owner', 'Quality Analyst', 'Developer']

  onClick() {
    let project_id = JSON.parse(localStorage.getItem('Authobj'));
    this._router.navigate(['/scrumboard/', project_id.project_id])
  }
  onSubmit(){
    console.log(this.changeRole.fullname)
    console.log(this.changeRole.type)
    this._scrumdataService.changerole(this.changeRole).subscribe(
      data => {
        console.log("Success!!!", data)
        this.feedbk = "Your role has been changed"
      },
      error => {
        console.log("Error", error)
        this.feedbk = JSON.stringify(error)
      }
    )
  }

}
