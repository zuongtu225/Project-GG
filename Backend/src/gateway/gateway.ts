import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NEW_NOTIFICATION_EVENT } from '../@core/events';

@WebSocketGateway({ cors: true, transports: ['websocket'], secure: true })
export class MyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  sendToClient(clientId: string, event: string, data: any) {
    this.server.emit(event, data);
  }

  sendToClientUpdate(event: string) {
    this.server.emit(event);
  }

  handleEmitSocket({ data, event, to }) {
    if (event === NEW_NOTIFICATION_EVENT) {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }
  }

  @SubscribeMessage(NEW_NOTIFICATION_EVENT)
  alertNewNotification() {
    this.server.emit(NEW_NOTIFICATION_EVENT);
  }

  afterInit(socket: Socket) {
    console.log(socket);
  }

  async handleConnection(socket: Socket) {
    console.log('connect', socket.id);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnect', socket.id);
  }
}
