import { Pipe, PipeTransform } from '@angular/core';
import { Alumnosutl } from './alumnosutl';

@Pipe({
  name: 'alumnoFilter',
  standalone: true
})
export class AlumnoFilterPipe implements PipeTransform {

  transform(value: Alumnosutl[], args: string): Alumnosutl[] {
    let filter: string = args ? args.toLocaleLowerCase() : '';

    return filter ? value.filter((alumno: Alumnosutl) =>
      alumno.nombre.toLocaleLowerCase().includes(filter)
    ) : value;
  }
}
