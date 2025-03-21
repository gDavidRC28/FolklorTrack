export default class ModeloVestuario {
  constructor({ id = "", disponibilidad = "", genero = "", talla = "", tipo = "", estado = "" }) {
    this.id = id;
    this.disponibilidad = disponibilidad;
    this.genero = genero;
    this.talla = talla;
    this.tipo = tipo;
    this.estado = estado;
  }
}