/*class ModeloEvento {
  constructor({ id, titulo, fecha, lugar_nombre, detalles, lugar_url }) {
    this.id = id || null;
    this.Titulo = titulo || 'Título no disponible';
    this.Fecha = fecha ? (typeof fecha === 'string' ? new Date(fecha) : fecha) : null;
    this.LugarNombre = lugar_nombre || 'Lugar no disponible';
    this.Detalles = detalles || 'Descripción no disponible';
    this.LugarURL = lugar_url || null;
  }

  getFormattedFecha() {
    if (this.Fecha instanceof Date && !isNaN(this.Fecha)) {
      return this.Fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
    if (typeof this.Fecha === 'string') {
        const date = new Date(this.Fecha);
        if (!isNaN(date)) {
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }
    }
    return 'Fecha no disponible';
  }
}

export default ModeloEvento;*/