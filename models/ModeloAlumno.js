export default class Alumno {
  constructor({
    id = null,
    nombre_alumno = "Sin nombre", 
    talla = "Sin talla",
    genero = "Sin género",
    fecha_inicio = null,
    fecha_nacimiento = null, 
    foto_url = null,
    user_id = null 
  }) {
    this.id = id;
    this.nombre_alumno = nombre_alumno;
    this.talla = talla;
    this.genero = genero;
    this.fecha_inicio = fecha_inicio ? (typeof fecha_inicio === 'string' ? new Date(fecha_inicio) : fecha_inicio) : null;
    this.fecha_nacimiento = fecha_nacimiento ? (typeof fecha_nacimiento === 'string' ? new Date(fecha_nacimiento) : fecha_nacimiento) : null;
    this.foto_url = foto_url;
    this.user_id = user_id; 
  }

  getEdad() {
    if (!this.fecha_nacimiento || !(this.fecha_nacimiento instanceof Date) || isNaN(this.fecha_nacimiento)) {
      return "N/A"; 
    }
    const hoy = new Date();
    const cumple = this.fecha_nacimiento;
    let edad = hoy.getFullYear() - cumple.getFullYear();
    const mes = hoy.getMonth() - cumple.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < cumple.getDate())) {
      edad--;
    }
    return edad >= 0 ? edad : "N/A"; 
  }

  getFormattedFecha(fechaProp) { 
    const fecha = this[fechaProp];
    if (fecha instanceof Date && !isNaN(fecha)) {
      return fecha.toLocaleDateString('es-ES', {
        year: 'numeric', month: '2-digit', day: '2-digit',
      });
    }
    return "Fecha no disponible";
  }
}