import { Routes } from '@angular/router';
import { Ejemplo1Component } from './formulario/ejemplo1/ejemplo1.component'; // Importa tu componente
import { ResistenciasComponent } from './formulario/resistencias/resistencias.component'; // Importa tu componente

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
  }
];