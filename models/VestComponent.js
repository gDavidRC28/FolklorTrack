/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const VestComponent = ({ vestuario, onToggleDisponibilidad }) => { 
  if (!vestuario) return null;

  const handleToggle = () => {
    if (onToggleDisponibilidad) {
      onToggleDisponibilidad(vestuario.id, vestuario.disponible);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {vestuario.vestuario_img_url ? (
          <Image
            source={{ uri: vestuario.vestuario_img_url }}
            style={styles.image}
            resizeMode="contain" 
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Sin Imagen</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.tallaText}>{vestuario.talla || 'Talla?'}</Text>
        <Text style={styles.tipoText} numberOfLines={1}>{vestuario.tipo || 'Vestuario'}</Text>
        <Text style={styles.generoText}>{vestuario.genero || 'N/A'}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.disponibilidadButton,
          vestuario.disponible ? styles.disponible : styles.ocupado,
        ]}
        onPress={handleToggle}
      >
        <Text style={styles.disponibilidadText}>
          {vestuario.disponible ? 'Disponible' : 'Ocupado'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    width: '48%', 
    marginBottom: 15,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 3/4, 
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
  },
  placeholderText: {
    color: '#adb5bd',
    fontSize: 12,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  tallaText: {
    fontSize: 12,
    color: '#868e96', 
    textTransform: 'capitalize',
    backgroundColor: '#e9ecef',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden', 
    marginBottom: 4,
  },
  tipoText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 2,
  },
  generoText: {
    fontSize: 13,
    color: '#495057',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  disponibilidadButton: {
    width: '100%',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 'auto',
  },
  disponible: {
    backgroundColor: '#d4edda',
  },
  ocupado: {
    backgroundColor: '#f8d7da', 
  },
  disponibilidadText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default VestComponent;*/