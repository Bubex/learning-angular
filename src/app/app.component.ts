import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { WebsocketService } from './services/websocket.service';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent],
  template: `<app-login></app-login>`
})
export class AppComponent {
  constructor(private websocketService: WebsocketService) {
    this.websocketService.getMessages().subscribe({
      next: (message) => console.log('Mensagem recebida:', message),
      error: (error) => console.error('Erro no WebSocket:', error),
      complete: () => console.log('Conexão WebSocket encerrada')
    });
  }
}

bootstrapApplication(AppComponent, {
  providers: [WebsocketService]
});
