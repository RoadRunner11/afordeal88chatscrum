import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Createproject } from '../createproject';
import { Scrumuser } from '../scrumuser';
import { SrumdataService } from '../srumdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {
  public project_name;
  constructor(private _route: ActivatedRoute, private _scrumdataService: SrumdataService, private _router: Router) { }

  ngOnInit(): void {
  }
  data = JSON.parse(localStorage.getItem('Authuser'));
  fname = JSON.parse(localStorage.getItem('Authobj'));
  // createProject = new Createproject('', '', this.data.password, 'regular user', '');
  createProject = new Scrumuser(this.fname.name,this.data.email , this.data.password, 'project owner', '')
  feedbk = "";
  onClick() {
    let project_id = JSON.parse(localStorage.getItem('Authobj'));
    this._router.navigate(['/scrumboard/', project_id.project_id])
  }
  onSubmit() {
    
    console.log(this.createProject.project_name)
    this._scrumdataService.create_project(this.createProject).subscribe(
      data => {
        console.log('Success!', data)
        this.feedbk = "Your project was created successfully"
        
      },
      error => {
        console.error('error'+ JSON.stringify(error))
        this.feedbk = "Project creation failed"
      }

    )
    console.log(this.createProject);
  }

}
