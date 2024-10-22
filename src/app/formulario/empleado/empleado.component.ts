import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {
  matricula: string = '';
  nombre: string = '';
  correo: string = '';
  edad: number | null = null;
  horasTrabajadas: number | null = null;
  empleadosGuardados: Array<{
    matricula: string,
    nombre: string,
    correo: string,
    edad: number,
    horasTrabajadas: number,
    pago: number
  }> = [];
  mostrarTabla: boolean = false;
  filtroMatricula: string = '';  // Nueva propiedad para filtrar por matrícula

  // Método para registrar empleado
  registrarEmpleado() {
    if (this.matricula && this.nombre && this.correo && this.edad && this.horasTrabajadas !== null) {
      const nuevoEmpleado = {
        matricula: this.matricula,
        nombre: this.nombre,
        correo: this.correo,
        edad: this.edad,
        horasTrabajadas: this.horasTrabajadas,
        pago: this.calcularPago(this.horasTrabajadas)
      };

      this.empleadosGuardados.push(nuevoEmpleado);
      localStorage.setItem('empleados', JSON.stringify(this.empleadosGuardados));
      alert('Empleado registrado con éxito.');
      this.limpiarCampos();
    } else {
      alert('Por favor, llena todos los campos.');
    }
  }

  // Método para calcular el pago
  calcularPago(horas: number): number {
    const pagoPorHora = 70;
    const pagoPorHoraExtra = 140;
    return horas > 40 ? (40 * pagoPorHora) + ((horas - 40) * pagoPorHoraExtra) : horas * pagoPorHora;
  }

  // Método para imprimir la tabla
  imprimirTabla() {
    this.mostrarTabla = true;
  }

  // Método para modificar empleado por matrícula
  modificarEmpleado() {
    const empleado = this.empleadosGuardados.find(emp => emp.matricula === this.matricula);
    if (empleado) {
      empleado.nombre = this.nombre;
      empleado.correo = this.correo;
      empleado.edad = this.edad || 0;
      empleado.horasTrabajadas = this.horasTrabajadas || 0;
      empleado.pago = this.calcularPago(empleado.horasTrabajadas);
      localStorage.setItem('empleados', JSON.stringify(this.empleadosGuardados));
      alert('Empleado modificado con éxito.');
      this.limpiarCampos();
    } else {
      alert('Empleado no encontrado.');
    }
  }

  // Método para eliminar empleado por matrícula
  eliminarEmpleado() {
    const index = this.empleadosGuardados.findIndex(emp => emp.matricula === this.matricula);
    if (index !== -1) {
      this.empleadosGuardados.splice(index, 1);
      localStorage.setItem('empleados', JSON.stringify(this.empleadosGuardados));
      alert('Empleado eliminado con éxito.');
      this.limpiarCampos();
    } else {
      alert('Empleado no encontrado.');
    }
  }

  // Método para limpiar los campos del formulario
  limpiarCampos() {
    this.matricula = '';
    this.nombre = '';
    this.correo = '';
    this.edad = null;
    this.horasTrabajadas = null;
  }

  // Método para filtrar empleados por matrícula
  filtrarEmpleados(): Array<{
    matricula: string,
    nombre: string,
    correo: string,
    edad: number,
    horasTrabajadas: number,
    pago: number
  }> {
    return this.empleadosGuardados.filter(emp =>
      emp.matricula.toLowerCase().includes(this.filtroMatricula.toLowerCase())
    );
  }
}
