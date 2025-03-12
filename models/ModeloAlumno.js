export default class Alumno {
  constructor({ id = "", nombre = "Sin nombre", edad = "Sin edad", talla = "Sin talla", genero = "Sin género", fecha_inicio = "Sin fecha" }) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.talla = talla;
    this.genero = genero;
    this.fecha_inicio = fecha_inicio;
  }
}
