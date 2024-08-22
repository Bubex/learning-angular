import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  lastMessage: string = '';
  loading: boolean = false;

  constructor(private websocketService: WebsocketService) {
    this.websocketService.getMessages().subscribe({
      next: (message) => {
        this.loading = false;
        this.lastMessage = message.error || message.result.message;
      },
      error: (error) => console.error('Erro no WebSocket:', error),
      complete: () => console.log('Conexão WebSocket encerrada')
    });
  }

  login(): void {
    this.loading = true;
    const loginData = { username: this.username, password: this.password };
    this.websocketService.sendMessage({
      method: 'auth.login',
      params: loginData
    });
  }
}

