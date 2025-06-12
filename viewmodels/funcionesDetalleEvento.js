/*import { supabase } from '../supabaseClient'; 
import ModeloEvento from '../models/ModeloEvento';

export class ServicioDetalleEvento {
  async eliminarEvento(eventoId) {
    try {
      const { error } = await supabase
        .from('eventos')
        .delete()
        .eq('id', eventoId); 

      if (error) {
        console.error('Error al eliminar el evento en Supabase:', error);
        throw error; 
      }
      return { success: true, message: 'El evento ha sido eliminado' };
    } catch (error) {
      return { success: false, message: error.message || 'No se pudo eliminar el evento' };
    }
  }
}

export default class FuncionesDetalleEvento {
  constructor() {
    this.servicioDetalleEvento = new ServicioDetalleEvento();
  }

  eliminarEvento = async (eventoId, onSuccess, onError) => {
    const idNumerico = parseInt(eventoId, 10);
    if (isNaN(idNumerico)) {
        onError("ID de evento inválido.");
        return;
    }
    try {
        const result = await this.servicioDetalleEvento.eliminarEvento(idNumerico);
        if (result.success) {
          onSuccess(result.message);
        } else {
          onError(result.message); 
        }
    } catch (error) { 
        onError(error.message || "Error inesperado al eliminar.")
    }
  };

  crearEvento(params) {
    return new ModeloEvento({
      id: params.eventoId,
      titulo: params.Titulo,
      fecha: params.Fecha, 
      lugar_nombre: params.LugarNombre,
      detalles: params.Detalles,
      lugar_url: params.LugarURL, 
    });
  }
}*/