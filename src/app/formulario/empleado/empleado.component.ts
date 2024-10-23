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
    horasExtras: number,
    pagoHorasRegulares: number,
    pagoHorasExtras: number,
    pagoTotal: number
  }> = [];
  mostrarTabla: boolean = false;
  filtroMatricula: string = '';
  modoEdicion: boolean = false;
  indiceEdicion: number | null = null;

  constructor() {
    const empleadosEnLocalStorage = localStorage.getItem('empleados');
    if (empleadosEnLocalStorage) {
      this.empleadosGuardados = JSON.parse(empleadosEnLocalStorage);
    }
  }

  // Método para registrar o modificar empleado
  registrarEmpleado() {
    if (this.matricula && this.nombre && this.correo && this.edad && this.horasTrabajadas !== null) {
      const pagoHorasRegulares = this.calcularPagoHorasRegulares(this.horasTrabajadas);
      const pagoHorasExtras = this.calcularPagoHorasExtras(this.horasTrabajadas);
      const horasExtras = this.calcularHorasExtras(this.horasTrabajadas);
      const pagoTotal = pagoHorasRegulares + pagoHorasExtras;

      const nuevoEmpleado = {
        matricula: this.matricula,
        nombre: this.nombre,
        correo: this.correo,
        edad: this.edad,
        horasTrabajadas: this.horasTrabajadas,
        horasExtras: horasExtras,
        pagoHorasRegulares: pagoHorasRegulares,
        pagoHorasExtras: pagoHorasExtras,
        pagoTotal: pagoTotal
      };

      if (this.modoEdicion && this.indiceEdicion !== null) {
        // Modificar empleado existente
        this.empleadosGuardados[this.indiceEdicion] = nuevoEmpleado;
        this.modoEdicion = false;
        this.indiceEdicion = null;
        alert('Empleado modificado con éxito.');
      } else {
        // Registrar nuevo empleado
        this.empleadosGuardados.push(nuevoEmpleado);
        alert('Empleado registrado con éxito.');
      }

      this.actualizarLocalStorage();
      this.limpiarCampos();
    } else {
      alert('Por favor, llena todos los campos.');
    }
  }

  // Método para calcular el pago de horas regulares (hasta 40 horas)
  calcularPagoHorasRegulares(horas: number): number {
    const pagoPorHora = 70;
    return horas > 40 ? 40 * pagoPorHora : horas * pagoPorHora;
  }

  // Método para calcular el pago de horas extras (más de 40 horas)
  calcularPagoHorasExtras(horas: number): number {
    const pagoPorHoraExtra = 140;
    return horas > 40 ? (horas - 40) * pagoPorHoraExtra : 0;
  }

  // Método para calcular las horas extras trabajadas
  calcularHorasExtras(horas: number): number {
    return horas > 40 ? horas - 40 : 0;
  }

  // Método para iniciar la modificación de un empleado por matrícula
  iniciarModificacion(matricula: string) {
    const empleado = this.empleadosGuardados.find((emp, index) => {
      if (emp.matricula === matricula) {
        this.indiceEdicion = index;
        return true;
      }
      return false;
    });

    if (empleado) {
      this.matricula = empleado.matricula;
      this.nombre = empleado.nombre;
      this.correo = empleado.correo;
      this.edad = empleado.edad;
      this.horasTrabajadas = empleado.horasTrabajadas;
      this.modoEdicion = true;
    } else {
      alert('Empleado no encontrado.');
    }
  }

  // Método para eliminar empleado por matrícula
  eliminarEmpleado(matricula: string) {
    const index = this.empleadosGuardados.findIndex(emp => emp.matricula === matricula);
    if (index !== -1) {
      this.empleadosGuardados.splice(index, 1);
      this.actualizarLocalStorage();
      alert('Empleado eliminado con éxito.');
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
    this.modoEdicion = false;
    this.indiceEdicion = null;
  }

  // Método para actualizar los empleados en el localStorage
  actualizarLocalStorage() {
    localStorage.setItem('empleados', JSON.stringify(this.empleadosGuardados));
  }

  // Método para calcular el total de dinero a pagar a todos los empleados
  calcularTotalGeneral(): number {
    return this.empleadosGuardados.reduce((total, empleado) => total + empleado.pagoTotal, 0);
  }

  // Método para filtrar empleados por matrícula
  filtrarEmpleados(): Array<{
    matricula: string,
    nombre: string,
    correo: string,
    edad: number,
    horasTrabajadas: number,
    horasExtras: number,
    pagoHorasRegulares: number,
    pagoHorasExtras: number,
    pagoTotal: number
  }> {
    return this.empleadosGuardados.filter(emp =>
      emp.matricula.toLowerCase().includes(this.filtroMatricula.toLowerCase())
    );
  }

  // Método para mostrar u ocultar la tabla
  imprimirTabla() {
    this.mostrarTabla = !this.mostrarTabla; // Alterna la visibilidad de la tabla
  }
}
