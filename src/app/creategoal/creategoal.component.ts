import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SrumdataService } from '../srumdata.service';
import { Creategoal } from '../creategoal';

@Component({
  selector: 'app-creategoal',
  templateUrl: './creategoal.component.html',
  styleUrls: ['./creategoal.component.css']
})
export class CreategoalComponent implements OnInit {

  constructor(private _scrumdataService: SrumdataService, private _route: ActivatedRoute) { }

  ngOnInit(): void {

  }
  userid = this._route.snapshot.paramMap.get('user_id');
  usercred = JSON.parse(localStorage.getItem('Authobj'));
  role_id = localStorage.getItem('goal')
  // project = JSON.parse(localStorage.getItem('Authuser'));
  creategoal = new Creategoal('m' + this.role_id, this.userid, this.usercred.project_id, '');
  feedback = '';

  oncreateSubmit() {

    this._scrumdataService.creategoal(this.creategoal).subscribe(
      data => {
        console.log("successful created goal " + data["message"])
        this.feedback = data["message"];
      },
      error => {
        console.log('error', JSON.stringify(error));
        this.feedback = JSON.stringify(error);
      }
    )
  }
}
