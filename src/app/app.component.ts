import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResistenciasComponent } from './formulario/resistencias/resistencias.component'; // Importa ResistenciasComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResistenciasComponent], // Añade ResistenciasComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularSegundo';
}
