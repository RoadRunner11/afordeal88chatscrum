import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public messages: Rx.Subject<any>;
  private subject: Rx.Subject<any>;
  public ws: WebSocket;
  socketIsOpen = 1;
  constructor() { }
  
  public createObservableSocket(url: string) {

  }
}
