import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('wss://ws-login.onrender.com');
  }

  sendMessage(msg: any): void {
    this.socket$.next(msg);
  }

  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }
}
