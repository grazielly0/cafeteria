import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useRouter} from "expo-router";


const LocalizacaoScreen = () => {
  const rota = useRouter();

  const abrirMapa = () => {
    Linking.openURL('https://www.google.com/maps/place/Cafeteria+D+Amor'); // Substitua pela URL real
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => rota.push('/')}
      >
        <MaterialIcons name="arrow-back" size={28} color="#A67C52" />
      </TouchableOpacity>

     
  <View style={styles.icons}>
    <TouchableOpacity onPress={() => rota.push('/Pedido')}>
    <MaterialIcons name="shopping-cart" size={24} color="#D09290" />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => rota.push('/cadastro')}>
        <AntDesign name="adduser" size={24} color="black" />
      </TouchableOpacity>
    </View>
    

      <Text style={styles.titulo}>LOCALIZAÇÃO</Text>

      {/* Mapa ilustrativo */}
      <Image
        source={require('../../assets/images/locali.webp')} // Use um placeholder ou imagem de mapa
        style={styles.mapa}
        resizeMode="cover"
      />

      <Text style={styles.textoEndereco}>
        Rua das Flores, 123 - Centro{'\n'}Cidade do Café, BR
      </Text>

      <TouchableOpacity style={styles.botaoMapa} onPress={abrirMapa}>
        <Text style={styles.textoBotao}>Ver no Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocalizacaoScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FCF8F3',
      paddingHorizontal: 16,
      paddingTop: 40,
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    icons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 16,
      marginBottom: 8,
    },
    titulo: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#A67C52',
      textAlign: 'center',
      marginVertical: 20,
    },
    mapa: {
      width: '100%',
      height: 200,
      borderRadius: 12,
      backgroundColor: '#DDD', // placeholder se não tiver imagem
    },
    textoEndereco: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
      color: '#333',
      lineHeight: 22,
    },
    botaoMapa: {
      marginTop: 24,
      backgroundColor: '#C89D72',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    textoBotao: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },

    botaoVoltar: {
      position: 'absolute',
      top: 30,
      left: 16,
      zIndex: 10,
      padding: 4,
    },
  });
  