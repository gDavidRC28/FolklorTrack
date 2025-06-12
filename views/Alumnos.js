import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Image, RefreshControl } from "react-native";
import UseAlumnos from "../viewmodels/funcionesAlumnos"; 
import { useNavigation } from '@react-navigation/native'; 

const AlumnoCard = ({ alumno, onPress }) => {
  if (!alumno) return null;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {alumno.foto_url ? (
        <Image source={{ uri: alumno.foto_url }} style={styles.alumnoImage} />
      ) : (
        <View style={styles.alumnoImagePlaceholder}>
          <Text style={styles.alumnoImagePlaceholderText}>{alumno.nombre_alumno ? alumno.nombre_alumno.charAt(0).toUpperCase() : 'A'}</Text>
        </View>
      )}
      <Text style={styles.alumnoName} numberOfLines={1}>{alumno.nombre_alumno || "Sin Nombre"}</Text>
      <Text style={styles.alumnoDetail}>Edad: {alumno.getEdad()}</Text>
    </TouchableOpacity>
  );
};

export default function Alumnos() {
  const navigation = useNavigation();
  const { alumnos, loading, fetchError, refrescarAlumnos } = UseAlumnos();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refrescarAlumnos();
    setRefreshing(false);
  }, [refrescarAlumnos]);

  if (loading && !refreshing && alumnos.length === 0) {
    return (
        <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text>Cargando alumnos...</Text>
        </View>
    );
  }

  if (fetchError && alumnos.length === 0) {
    return (
        <View style={styles.centeredContainer}>
            <Text style={styles.errorText}>Error al cargar alumnos: {fetchError}</Text>
            <TouchableOpacity style={styles.buttonRetry} onPress={refrescarAlumnos}>
                <Text style={styles.buttonText}>Reintentar</Text>
            </TouchableOpacity>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      {alumnos.length === 0 && !loading ? (
        <View style={styles.centeredContainer}>
            <Text style={styles.noDataText}>No hay alumnos registrados.</Text>
        </View>
      ) : (
        <FlatList
          data={alumnos}
          renderItem={({ item }) => (
            <AlumnoCard
              alumno={item}
              onPress={() => navigation.navigate("DetalleAlumno", { alumnoId: item.id })}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} 
          columnWrapperStyle={styles.rowStyle}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#007BFF"]}/>
          }
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("CrearAlumno")}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F6F8',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: { color: '#e74c3c', fontSize: 16, marginBottom: 10, textAlign: 'center'},
    noDataText: { fontSize: 18, color: '#7f8c8d', marginBottom: 5 },
    noDataSubText: { fontSize: 14, color: '#95a5a6' },
    listContainer: {
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 80,
    },
    rowStyle: {
      justifyContent: 'space-between',
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 12,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      width: '48%',
      marginBottom: 15,
    },
    alumnoImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 10,
      backgroundColor: '#E0E0E0',
    },
    alumnoImagePlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#CED4DA',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    alumnoImagePlaceholderText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#495057',
    },
    alumnoName: {
      fontSize: 15,
      fontWeight: '600',
      color: '#343A40',
      textAlign: 'center',
      marginBottom: 3,
    },
    alumnoDetail: {
        fontSize: 13,
        color: '#6C757D',
        textAlign: 'center',
    },
    fab: {
      position: 'absolute',
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      right: 25,
      bottom: 25,
      backgroundColor: '#007BFF',
      borderRadius: 30,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    fabText: {
      fontSize: 30,
      color: 'white',
      lineHeight: 30,
    },
    buttonRetry: { 
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    }
  });