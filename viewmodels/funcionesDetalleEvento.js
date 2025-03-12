import { ServicioDetalleEvento } from '../services/ServicioDetalleEvento';
import { ModeloDetalleEvento } from '../models/ModeloDetalleEvento';

export class funcionesDetalleEvento {
  constructor() {
    this.ServicioDetalleEvento = new ServicioDetalleEvento();
  }

  eliminarEvento = async (eventoId, onSuccess, onError) => {
    const result = await this.ServicioDetalleEvento.eliminarEvento(eventoId);
    if (result.success) {
      onSuccess(result.message);
    } else {
      onError(result.message);
    }
  };

  crearEvento(params) {
    return new ModeloDetalleEvento(params.eventoId, params.Titulo, params.Fecha, params.Lugar, params.Detalles);
  }

  formatFecha(timestamp) {
    if (!timestamp || !timestamp.seconds) {
      return 'Fecha no disponible';
    }
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
}