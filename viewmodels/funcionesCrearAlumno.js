import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { supabase } from '../supabaseClient'; 
import * as ImagePicker from 'expo-image-picker';

const BUCKET_NAME_ALUMNOS = 'folklortrack'; 
const FOLDER_NAME_ALUMNOS = 'ALUMNOS'; 

const subirFotoAlumno = async (imageUri) => {
  if (!imageUri) return { success: true, publicUrl: null };
  try {
    const fileExt = imageUri.split('.').pop();
    const fileName = `${Date.now()}_alumno.${fileExt}`;
    const filePath = `${FOLDER_NAME_ALUMNOS}/${fileName}`;

    const response = await fetch(imageUri);
    const blob = await response.blob();

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME_ALUMNOS)
      .upload(filePath, blob, { contentType: blob.type, upsert: false });
    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME_ALUMNOS)
      .getPublicUrl(filePath);
    if (!urlData || !urlData.publicUrl) throw new Error("Error obteniendo la foto.");
    return { success: true, publicUrl: urlData.publicUrl };
  } catch (error) {
    console.error('Error subiendo foto de alumno:', error.message);
    return { success: false, publicUrl: null, message: error.message };
  }
};

export default function FuncionesCrearAlumno(navigation) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nombreAlumno, setNombreAlumno] = useState('');
  const [genero, setGenero] = useState(''); 
  const [talla, setTalla] = useState('');  
  const [fechaNacimiento, setFechaNacimiento] = useState(null); 
  const [fechaInicio, setFechaInicio] = useState(new Date()); 
  const [imageUri, setImageUri] = useState(null);

  const [showNacimientoPicker, setShowNacimientoPicker] = useState(false);
  const [showInicioPicker, setShowInicioPicker] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleCrearAlumnoCompleto = async () => {
    if (!email.trim() || !password.trim() || !nombreAlumno.trim() || !genero || !talla || !fechaNacimiento || !fechaInicio) {
      Alert.alert('Campos Incompletos', 'Por favor, complete todos los campos obligatorios.');
      return;
    }
    if (password.length < 6) {
        Alert.alert('Contraseña Débil', 'La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            nombre_completo: nombreAlumno.trim(), 
          }
        }
      });

      if (authError) {
        if (authError.message.includes("User already registered")) {
            Alert.alert('Error de Registro', 'Este correo electrónico ya está registrado.');
        } else if (authError.message.includes("Password should be at least 6 characters.")) {
            Alert.alert('Error de Registro', 'La contraseña debe tener al menos 6 caracteres.');
        } else {
            Alert.alert('Error de Registro', authError.message);
        }
        setLoading(false);
        return;
      }

      if (!authData.user) {
          Alert.alert('Error de Registro', 'No se pudo crear el usuario. Intente de nuevo.');
          setLoading(false);
          return;
      }
      const newUserId = authData.user.id;

      const fotoResult = await subirFotoAlumno(imageUri);
      if (!fotoResult.success && imageUri) {
        Alert.alert('Advertencia de Foto', `No se pudo subir la foto: ${fotoResult.message}. El alumno se creará sin foto.`);
      }

      const alumnoParaDb = {
        user_id: newUserId, 
        nombre_alumno: nombreAlumno.trim(),
        genero: genero,
        talla: talla,
        fecha_nacimiento: fechaNacimiento.toISOString().split('T')[0], 
        fecha_inicio: fechaInicio.toISOString().split('T')[0],   
        foto_url: fotoResult.publicUrl, 
      };

      const { error: alumnoDbError } = await supabase
        .from('alumnos')
        .insert(alumnoParaDb);

      if (alumnoDbError) {
        console.error("Error al guardar perfil del alumno en DB:", alumnoDbError);
        Alert.alert('Error', `Se creó el usuario, pero hubo un problema al guardar los detalles del alumno: ${alumnoDbError.message}. Por favor, contacte a soporte.`);
        setLoading(false)
        return;
      }

      Alert.alert('Éxito', 'Alumno y usuario creados correctamente. Revisa el correo para confirmar la cuenta.');
      setEmail(''); setPassword(''); setNombreAlumno(''); setGenero(''); setTalla('');
      setFechaNacimiento(null); setFechaInicio(new Date()); setImageUri(null);
      if (navigation) navigation.goBack();

    } catch (error) {
      console.error("Error inesperado en handleCrearAlumnoCompleto:", error);
      Alert.alert('Error Inesperado', 'Ocurrió un error. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };


  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permiso Requerido", "Se necesita acceso a la galería para la foto.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [1, 1], quality: 0.7, 
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const onFechaNacimientoChange = (event, selectedDate) => {
    setShowNacimientoPicker(Platform.OS === 'ios'); 
    if (selectedDate) {
      if (selectedDate > new Date()) {
          Alert.alert("Fecha Inválida", "La fecha de nacimiento no puede ser futura.");
          return;
      }
      setFechaNacimiento(selectedDate);
    }
  };

  const onFechaInicioChange = (event, selectedDate) => {
    setShowInicioPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFechaInicio(selectedDate);
    }
  };

  return {
    email, setEmail,
    password, setPassword,
    nombreAlumno, setNombreAlumno,
    genero, setGenero,
    talla, setTalla,
    fechaNacimiento, setFechaNacimiento,
    fechaInicio, setFechaInicio,
    imageUri, pickImage,
    showNacimientoPicker, setShowNacimientoPicker,
    showInicioPicker, setShowInicioPicker,
    onFechaNacimientoChange, onFechaInicioChange,
    loading,
    handleCrearAlumnoCompleto,
  };
}