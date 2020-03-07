import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Createproject } from '../createproject';
import { SrumdataService } from '../srumdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _scrumdataService: SrumdataService, private _router: Router) { }

  ngOnInit() {
  }
  createProject = new Createproject('', '', '', '', '');
  feedbk = "";
  
  onSubmit() {
    console.log(this.createProject);
    this._scrumdataService.create_project(this.createProject).subscribe(
      data => {
        console.log('Success!', data)
        this.feedbk = "Your project was created successfully"
      },
      error => {
        console.error('Error', error)
        this.feedbk = "Project creation failed failed"
      }

    )
  }

}
