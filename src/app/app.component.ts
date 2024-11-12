import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemapComponent } from './tem/temap/temap.component';
import { ListMessageComponent } from './team/list-message/list-message.component';
import { AddMessageComponent } from './team/add-message/add-message.component';
import { CapturaPedidoComponent } from './pizzas/captura-pedido/captura-pedido.component';
import { DetallePedidoComponent } from './pizzas/detalle-pedido/detalle-pedido.component';
import { VentasDiaComponent } from './pizzas/ventas-dia/ventas-dia.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemapComponent, ListMessageComponent, AddMessageComponent, CapturaPedidoComponent,DetallePedidoComponent,VentasDiaComponent], // Añade ResistenciasComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularSegundo';
}
