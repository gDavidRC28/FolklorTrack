export default class ModeloCrearAlumno {
  constructor({ nombre, edad, genero, talla, fecha_inicio }) {
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
    this.talla = talla;
    this.fecha_inicio = fecha_inicio.toString(); 
  }
}
