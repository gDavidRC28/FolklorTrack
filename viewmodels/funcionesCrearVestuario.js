/*import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { supabase } from '../supabaseClient'; 
import * as ImagePicker from 'expo-image-picker'; 

const BUCKET_NAME_VESTUARIOS = 'folklortrack';
const FOLDER_NAME_VESTUARIOS = 'VESTUARIOS';

const guardarVestuario = async (vestuarioData) => {
  try {
    const { data, error } = await supabase
      .from('vestuarios')
      .insert([vestuarioData])
      .select()
      .single();

    if (error) {
      console.error('Error al guardar vestuario en DB:', error.message);
      throw error;
    }
    return { success: true, data, message: "Vestuario guardado exitosamente." };
  } catch (error) {
    return { success: false, message: error.message || "Error al guardar datos del vestuario." };
  }
};

const subirImagenVestuario = async (imageUri) => {
  if (!imageUri) return { success: true, publicUrl: null };

  try {
    const fileExt = imageUri.split('.').pop();
    const fileName = `${Date.now()}_vestuario.${fileExt}`;
    const filePath = `${FOLDER_NAME_VESTUARIOS}/${fileName}`;

    const response = await fetch(imageUri);
    const blob = await response.blob();

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME_VESTUARIOS)
      .upload(filePath, blob, { contentType: blob.type, upsert: false });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME_VESTUARIOS)
      .getPublicUrl(filePath);

    if (!urlData || !urlData.publicUrl) throw new Error("Error obteniendo URL pública.");

    return { success: true, publicUrl: urlData.publicUrl };
  } catch (error) {
    console.error('Error subiendo imagen de vestuario:', error.message);
    return { success: false, publicUrl: null, message: error.message };
  }
};


export default function FuncionesCrearVestuario() {
  const [tipo, setTipo] = useState('');
  const [talla, setTalla] = useState('');
  const [genero, setGenero] = useState(''); 
  const [disponible, setDisponible] = useState(true); 
  const [folio, setFolio] = useState(''); 
  const [selectedRegionId, setSelectedRegionId] = useState(initialRegionIdFromParams || null);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    if (initialRegionIdFromParams) {
      setSelectedRegionId(initialRegionIdFromParams);
    }
  }, [initialRegionIdFromParams]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permiso Requerido", "Se necesita acceso a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [3, 4], quality: 0.7, 
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleGuardarVestuario = async () => {
     if (!tipo.trim() || !talla || !genero || !folio.trim() || !selectedRegionId) {
      let missingFields = [];
      if (!tipo.trim()) missingFields.push("Tipo");
      if (!talla) missingFields.push("Talla");
      if (!genero) missingFields.push("Género");
      if (!folio.trim()) missingFields.push("Folio");
      if (!selectedRegionId) missingFields.push("Región");

      Alert.alert('Campos Requeridos', `Por favor, complete los siguientes campos: ${missingFields.join(', ')}.`);
      return;
    }
    if (loading) return;
    setLoading(true);

    const imagenResult = await subirImagenVestuario(imageUri);
    if (!imagenResult.success && imageUri) {
      Alert.alert('Error de Imagen', imagenResult.message || 'No se pudo subir la imagen.');
      setLoading(false);
      return;
    }

    const vestuarioData = {
      tipo: tipo.trim(),
      talla: talla,
      genero: genero,
      disponible: disponible,
      region_id: selectedRegionId,
      vestuario_img_url: imagenResult.publicUrl,
      folio: folio.trim(),
    };

    const dbResult = await guardarVestuarioSupabase(vestuarioData);

    if (dbResult.success) {
      Alert.alert('Éxito', dbResult.message);
      setTipo(''); setTalla(''); setGenero(''); setDisponible(true);
      setImageUri(null); setFolio('');
    } else {
      Alert.alert('Error al Guardar', dbResult.message);
    }
    setLoading(false);
  };

  return {
    tipo, setTipo,
    talla, setTalla, 
    genero, setGenero,
    disponible, setDisponible,
    folio, setFolio,
    imageUri, pickImage,
    loading,
    handleGuardarVestuario,
  };
}*/