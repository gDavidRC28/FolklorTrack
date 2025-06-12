import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { supabase } from '../supabaseClient'; 
import * as ImagePicker from 'expo-image-picker';


const BUCKET_NAME = 'folklortrack';
const FOLDER_NAME = 'REGIONES';

const addRegionConImagen = async (nombreRegion, imageUri) => {
  if (!imageUri) {
    Alert.alert("Advertencia", "No se seleccionó imagen. Se creará la región sin ella.");
    return await guardarDatosRegion(nombreRegion, null);
  }

  try {
    const fileExt = imageUri.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${FOLDER_NAME}/${fileName}`;

    const response = await fetch(imageUri);
    const blob = await response.blob();

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, blob, {
        cacheControl: '3600', 
        upsert: false, 
        contentType: blob.type, 
      });

    if (uploadError) {
      console.error('Error al subir imagen a Supabase Storage:', uploadError.message);
      throw uploadError;
    }

    console.log('Imagen subida:', uploadData);

    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (!urlData || !urlData.publicUrl) {
        console.error("No se pudo obtener la URL pública después de la subida.");
        throw new Error("Error obteniendo URL pública de la imagen.");
    }
    const imageUrl = urlData.publicUrl;
    console.log('URL Pública de la imagen:', imageUrl);

    return await guardarDatosRegion(nombreRegion, imageUrl);

  } catch (error) {
    console.error('Error en addRegionConImagen:', error.message);
    return { success: false, message: error.message || "Error procesando la imagen y región." };
  }
};

const guardarDatosRegion = async (nombreRegion, imgUrl) => {
    const { error: dbError } = await supabase
        .from('regiones')
        .insert({
            nombre_region: nombreRegion,
            img_region_url: imgUrl, 
        });

    if (dbError) {
        console.error('Error al agregar datos de región a Supabase DB:', dbError.message);
        return { success: false, message: dbError.message };
    }
    return { success: true, message: "Región guardada exitosamente." };
};


export default function FuncionesCrearRegion() { 
  const [nombreRegion, setNombreRegion] = useState('');
  const [imageUri, setImageUri] = useState(null); 
  const [loading, setLoading] = useState(false);

  /* useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         Alert.alert('Permiso denegado', 'Se necesitan permisos de acceso a la galería para seleccionar imágenes.');
  //       }
  //     }
  //   })();  
   }, []); */

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permiso Requerido", "Necesitas permitir el acceso a la galería para seleccionar una imagen.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 0.8, 
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };


  const handleAddRegion = async () => {
    if (!nombreRegion.trim()) {
      Alert.alert('Error', 'Por favor, ingrese un nombre válido para la región.');
      return;
    }
    // Descomentar si la imagen es obligatoria:
    if (loading) return;

    setLoading(true);
    const result = await addRegionConImagen(nombreRegion.trim(), imageUri);

    if (result.success) {
      Alert.alert('Éxito', result.message || 'Región agregada correctamente');
      setNombreRegion('');
      setImageUri(null);
    } else {
      Alert.alert('Error', result.message || 'Hubo un problema al agregar la región.');
    }
    setLoading(false);
  };

  return {
    nombreRegion,
    setNombreRegion,
    imageUri, 
    pickImage, 
    handleAddRegion,
    loading,
  };
}