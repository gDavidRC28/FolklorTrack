export default class ModeloEvento {
    constructor(id, titulo, fecha, lugar, detalles) {
      this.id = id;
      this.titulo = titulo;
      this.fecha = fecha;
      this.lugar = lugar;
      this.detalles = detalles;
    }
  
    getFormattedFecha() {
      if (!this.fecha || !this.fecha.seconds) {
        return 'Fecha no disponible';
      }
      const date = new Date(this.fecha.seconds * 1000);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
  }
  