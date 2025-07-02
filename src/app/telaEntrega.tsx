import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function(){
const navigation = useNavigation();
const rota = useRouter()

    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>FORMA DE ENTREGA</Text>
  
        <TouchableOpacity
          style={styles.botao}
          onPress={() => rota.push('/formaPagamento')}
        >
          <Text style={styles.textoBotao}>Presencial</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.botao}
          onPress={() => rota.push('/formaPagament')}
        >
          <Text style={styles.textoBotao}>Delivery</Text>
        </TouchableOpacity>
      </View>
    );
    }

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FCF8F3',
      justifyContent: 'center',
      padding: 20,
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#A67C52',
      textAlign: 'center',
      marginBottom: 30,
    },
    botao: {
      backgroundColor: '#E6D6BE',
      padding: 16,
      borderRadius: 10,
      marginBottom: 16,
    },
    textoBotao: {
      textAlign: 'center',
      fontSize: 16,
      color: '#5B3D1D',
      fontWeight: 'bold',
    },
  });
  