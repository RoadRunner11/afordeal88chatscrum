import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../websocket.service';
import { Scrumuser } from '../scrumuser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  WS_URL: string = "wss://gr3cwo64fb.execute-api.us-west-2.amazonaws.com/Test/"
  websocketConnection: WebSocket ;
  messages: Array<object> =[]
  chat_text: String
  logincred: any;
  messageFromServer: String;
  wsSubscription: Subscription;
  status: any;
  socket: WebSocket;

  constructor( ) {
    websocketConnection: WebSocket
    this.websocketConnection = new WebSocket(this.WS_URL)
  }

  ngOnInit() {
    this.websocketConnection.onopen = (event)=>{
      const context = {action:"getRecentMessages"}
      this.websocketConnection.send(JSON.stringify(context))
    }
    this.websocketConnection.onmessage = (event)=>{
      let data = JSON.parse(event.data)
      if(data['messages']!==undefined){
        data['messages'].forEach((message) => { this.messages.push(message)});
      }
    }
  }
  scrumLoginUserModel = new Scrumuser('', '', '', '', '');

  getUsername(){
    this.logincred = JSON.parse(localStorage.getItem('Authobj'));
    console.log("The User =" + this.logincred.name)
    return this.logincred.name
  }

  getCurrentTime(){
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
  }

  sendMessage(){
    const chat_text = this.scrumLoginUserModel.project_name;

    if(chat_text!=""){
      const context = {action:"sendMessage", content:chat_text, username:this.getUsername, timestamp:this.getCurrentTime}
      this.websocketConnection.send(JSON.stringify(context))
      this.chat_text = ""
      this.scrumLoginUserModel.project_name = '';
      window.setInterval(function () {
        const elem = document.getElementById('data');
        elem.scrollTop = elem.scrollHeight;
      }, 5000);
    }
  }

  ngOnDestroy() {
    this.socket.close()
  }

} 
