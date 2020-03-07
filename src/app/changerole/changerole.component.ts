import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Createproject } from '../createproject';
import { SrumdataService } from '../srumdata.service';

@Component({
  selector: 'app-changerole',
  templateUrl: './changerole.component.html',
  styleUrls: ['./changerole.component.css']
})
export class ChangeroleComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _scrumdataService: SrumdataService) { }

  ngOnInit(): void {
  }
  roleId = this._route.snapshot.paramMap.get('role_id')
  Auth = JSON.parse(localStorage.getItem('Authobj'))
  project_id = this.Auth.project_id
  changerole = new Createproject('', '', this.roleId, '', this.project_id);
  feedbk = ""

  userTypes: any[] = ['Owner', 'Quality Analyst', 'Developer']

  onSubmit(){
    this._scrumdataService.changerole(this.changerole).subscribe(
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
