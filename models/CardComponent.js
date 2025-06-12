/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CardComponent = ({ region, navigation }) => {
  if (!region) return null;

  const handlePress = () => {
    console.log("Navegando a Vestuario con region:", region);
    navigation.navigate('Vestuario', { regionId: region.id, nombreRegion: region.nombre });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        {region.img_region_url ? (
          <Image
            source={{ uri: region.img_region_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Sin Imagen</Text>
          </View>
        )}
      </View>
      <Text style={styles.text}>{region.nombre || 'Sin nombre'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15, 
    padding: 10, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, 
    shadowRadius: 5,
    elevation: 2,
    width: '47%', 
    aspectRatio: 1, 
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '90%',
    aspectRatio: 1, 
    borderRadius: 70, 
    overflow: 'hidden', 
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
    backgroundColor: '#e9ecef'
  },
  placeholderText: {
    color: '#adb5bd',
    fontSize: 12,
  },
  text: {
    fontSize: 14,
    color: '#343a40',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5, 
  },
});

export default CardComponent;*/