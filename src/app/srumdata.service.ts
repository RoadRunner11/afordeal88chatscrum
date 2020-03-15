import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scrumuser, ScrumUserLoginData } from './scrumuser';
import { Observable } from 'rxjs';
import { Createproject } from './createproject';
import { Creategoal } from './creategoal';
@Injectable({
  providedIn: 'root'
})
export class SrumdataService {

  token: any;
  logincred: any;
  body: string; 

  constructor(private _http: HttpClient) { }
  _url = "https://liveapi.chatscrum.com/scrum/api/scrumusers/";
  _loginUrl = "https://liveapi.chatscrum.com/scrum/api-token-auth/";
  _scrumProjectUrl = "https://liveapi.chatscrum.com/scrum/api/scrumprojects/";
  _goalId = "https://liveapi.chatscrum.com/scrum/api/scrumgoals/goal_id";
  _updatetaskUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumgoals/';
  sprintUrl = "https://liveapi.chatscrum.com/scrum/api/scrumsprint/";
  _changerole = "https://liveapi.chatscrum.com/scrum/api/scrumprojectroles/";

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  signup(user : Scrumuser){
    return this._http.post<any>(this._url, {'email':user['email'], 'password':user['password'],
            'full_name':user['fullname'], 'usertype':user['usertype'], 'projname': user['project_name']}, this.httpOptions)
  }
  login(user: ScrumUserLoginData) {
    return this._http.post<any>(this._loginUrl, {
      'username': user['email'], 'password': user['password'], 'project': user['projname'] }, this.httpOptions)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  allProjectGoals(project_id) {
    return this._http.get<any>(this._scrumProjectUrl + project_id, this.httpOptions)
  }

  create_project(user: Createproject){
    return this._http.post<any>(this._url,
      { 'email': user['email'], 'password': user['password'], 'full_name': user['fullname'] ,
       'usertype':user['usertype'], 'projname': user['projname'] }, this.httpOptions) 
  }

  creategoal(user: Creategoal): Observable<any> {
    this.logincred = JSON.parse(localStorage.getItem('Authuser'));
    this.logincred = btoa(`${this.logincred.email}:${this.logincred.password}`);
    // console.log('This user role_id ' + user['roleid'] + ' name : ' + user['name'] + ' project_id : ' + user['projectid'] + ' user : ' + user['user']);
    return this._http.post<any>(this._updatetaskUrl, { 'name': user['name'], 'project_id': user['projectid'], 'user': user['roleid'] }, {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.logincred}==`).append('Content-Type', 'application/json')
    });
  }

  createSprint(user): Observable<any> {
    // this.token = this.getUser().token;
    this.logincred = JSON.parse(localStorage.getItem('Authuser'));
    this.logincred = btoa(`${this.logincred.email}:${this.logincred.password}`);
    return this._http.post(this.sprintUrl + "?" + 'goal_project_id=' + user, { 'project_id': user }, {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.logincred}==`).append('Content-Type', 'application/json')
    })
  }

  changerole(user: Createproject): Observable<any>{
    this.token = localStorage.getItem('token');
    this.logincred = JSON.parse(localStorage.getItem('Authuser'));
    this.logincred = btoa(`${this.logincred.email}:${this.logincred.password}`);
    return this._http.patch(this._changerole + user['password'] + '/', { 'role': user['usertype'], 'project_id': user['projname'] }, {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.logincred}==`)
    });
  }

  updateTask(goal_id): Observable<any>{
    this.token = localStorage.getItem('token');
    this.logincred = JSON.parse(localStorage.getItem('Authuser'));
    this.logincred = btoa(`${this.logincred.email}:${this.logincred.password}`);
    return this._http.patch(this._updatetaskUrl + goal_id.id + '/', { status: goal_id.status }, {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.logincred}==`)
    });
  }  
}
 