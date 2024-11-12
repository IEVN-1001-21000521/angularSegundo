import { Routes } from '@angular/router';
import { Ejemplo1Component } from './formulario/ejemplo1/ejemplo1.component'; // Importa tu componente
import { ResistenciasComponent } from './formulario/resistencias/resistencias.component'; // Importa tu componente
import { EmpleadoComponent } from './formulario/empleado/empleado.component'; // Importa tu componente
import { CapturaPedidoComponent } from './pizzas/captura-pedido/captura-pedido.component';


export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes')
  },
  {
    path: 'ejemplo1',  // Define la ruta 'ejemplo1'
    component: Ejemplo1Component  // Asigna el componente Ejemplo1Component para esta ruta
  },
  {
    path: 'resistencias',  // Define la ruta 'ejemplo1'
    component: ResistenciasComponent  // Asigna el componente Ejemplo1Component para esta ruta
  },
  {
    path: 'empleado',  // Define la ruta 'ejemplo1'
    component: EmpleadoComponent  // Asigna el componente Ejemplo1Component para esta ruta
  },
  {
    path: 'pizza',  // Define la ruta 'ejemplo1'
    component: CapturaPedidoComponent  // Asigna el componente Ejemplo1Component para esta ruta
  }
];