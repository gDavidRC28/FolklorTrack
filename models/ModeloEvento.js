class ModeloEvento {
  constructor({ id, Titulo, Fecha, Lugar, Detalles }) {
    this.id = id || null;
    this.Titulo = Titulo || 'Título no disponible';
    this.Fecha = Fecha || 'Fecha no disponible';
    this.Lugar = Lugar || 'Lugar no disponible';
    this.Detalles = Detalles || 'Descripción no disponible';
  }
  getFormattedFecha() {
    if (this.Fecha instanceof Object && this.Fecha.seconds) {
      const date = new Date(this.Fecha.seconds * 1000);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
    return this.Fecha;
  }
}

export default ModeloEvento;