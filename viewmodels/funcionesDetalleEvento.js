import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';
import ModeloEvento from '../models/ModeloEvento';

export class ServicioDetalleEvento {
  constructor() {
    this.db = getFirestore(appFirebase);
  }

  async eliminarEvento(eventoId) {
    try {
      const eventoRef = doc(this.db, 'Eventos', eventoId);
      await deleteDoc(eventoRef);
      return { success: true, message: 'El evento ha sido eliminado' };
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      return { success: false, message: 'No se pudo eliminar el evento' };
    }
  }
}

export default class funcionesDetalleEvento {
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
    const fecha = params.Fecha && params.Fecha.seconds ? params.Fecha : null;
    return new ModeloEvento({
      id: params.eventoId,
      Titulo: params.Titulo,
      Fecha: fecha ? fecha : 'Fecha no disponible',
      Lugar: params.Lugar,
      Detalles: params.Detalles,
    });
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