import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SrumdataService } from '../srumdata.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.css']
})
export class ScrumboardComponent implements OnInit {

  // todo = ['Learn Django', 'Learn Python','Learn PHP'];
  // doing = ['Learn Design'];
  // done = ['Learn Linux'];
  tftw = [];
  tftd = [];
  verify = [];
  done = [];

  constructor( private _route: ActivatedRoute, private _scrumdataService: SrumdataService) { }
  
  project_id = 0;
  _participants = [];

  ngOnInit() {
    this.project_id = parseInt((this._route.snapshot.paramMap.get('project_id')));
    this.getProjectGoals();
    this.filter();
  }
  filter(){
    for (let value in this._participants){
      for (let goal in value['scrumgoal_set']){
        if (goal['status'] == 0){
          this.tftw.push(goal)
        }
        else if (goal['status'] == 1){
          this.tftd.push(goal)
        }
        else if (goal['status'] == 2){
          this.verify.push(goal)
        }else{
          this.done.push(goal)
        }

      }
    }
  }
  drop(event:  CdkDragDrop<string[]>){
    if (event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }else{
      transferArrayItem(event.previousContainer.data, event.container.data,event.previousIndex, event.currentIndex)
    }
  }

  getProjectGoals() {
    this._scrumdataService.allProjectGoals(this.project_id).subscribe(
      data => {
        console.log(data)
        this._participants = data['data']
      },
      error => {
        console.log("Error", error)
      }
    )
  }
}
