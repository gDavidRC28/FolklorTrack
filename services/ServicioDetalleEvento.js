import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';

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