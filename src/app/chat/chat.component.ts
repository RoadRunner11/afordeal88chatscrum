import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../websocket.service';
import { Scrumuser } from '../scrumuser';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  WS_URL: string ="wss://gr3cwo64fb.execute-api.us-west-2.amazonaws.com/Test" //"wss://fh7hhc2pn0.execute-api.us-east-2.amazonaws.com/Test" 
  websocketConnection: WebSocket ;
  messages: Array<object> =[]
  chat_text: String
  logincred: any;
  messageFromServer: String;
  wsSubscription: Subscription;
  status: any;
  socket: WebSocket;

  constructor( private _route: ActivatedRoute,  private _router: Router,private wsService: WebsocketService) {
    this.websocketConnection = new WebSocket('wss://gr3cwo64fb.execute-api.us-west-2.amazonaws.com/Test');
    console.log('connect', this.websocketConnection)
  }

  ngOnInit() {
    this.websocketConnection.onopen = (event) => { 
      const context = { action: "getRecentMessages" }
      this.websocketConnection.send(JSON.stringify(context))
      
    }
    this.websocketConnection.onmessage = (event) =>{
      let data = JSON.parse(event.data)
      console.log("message things" + data['messages'])
      if (data['messages'] !== undefined){
        data['messages'].forEach((message) => {
          console.log("new =" + JSON.stringify(message))
          this.messages.push(message)
          
        })
        console.log("Array "+ this.messages)
        this.messages.forEach((message) =>{
          console.log("allmessages " + message )
        })
      }
    }
    
    // this.websocketConnection.onopen = (event)=>{
    //   const context = {action:"getRecentMessages"}
    //   this.websocketConnection.send(JSON.stringify(context))
    // }
    // this.websocketConnection.onmessage = (event)=>{
    //   let data = JSON.parse(event.data)
    //   if(data['messages']!==undefined){
    //     data['messages'].forEach((message) => { this.messages.push(message)});
    //   }
    // }
  }
  scrumLoginUserModel = new Scrumuser('', '', '', '', '');

  onClick() {
    let project_id = JSON.parse(localStorage.getItem('Authobj'));
    this._router.navigate(['/scrumboard/', project_id.project_id])
  }

  getUsername(){
    this.logincred = JSON.parse(localStorage.getItem('Authobj'));
    // console.log("The User =" + this.logincred.name)
    return this.logincred.name
  }

  getCurrentTime(){
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
  }

  sendMessage(){
    // const chat_text = this.scrumLoginUserModel.project_name;
    // let chat_text = document.getElementById("chat_text").textContent
    console.log(this.chat_text)
    if(this.chat_text !== ""){
      const context = {"action":"sendMessage",     
       "username":this.getUsername(),
       "message":this.chat_text, 
        "timestamp":this.getCurrentTime()}
      
      this.websocketConnection.send(JSON.stringify(context))
      console.log(context)
      this.chat_text = ''
      // this.messages.unshift(context)
      // this.scrumLoginUserModel.project_name = '';
      // window.setInterval(function () {
      //   const elem = document.getElementById('data');
      //   elem.scrollTop = elem.scrollHeight;
      // }, 5000);
    }
  }

  ngOnDestroy() {
    this.websocketConnection.close()
  }

} 
