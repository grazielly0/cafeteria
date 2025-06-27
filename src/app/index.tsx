import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {useRouter} from "expo-router";
import logo from '../../assets/images/logo.png';


export default function Index() {
  const rota = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>CAFETERIA</Text>
      <Text style={styles.subtitle}>Bem-vindos à cafeteria D'Amore</Text>

      <TouchableOpacity style={styles.button} onPress={() => rota.push('/menu')}>
        <Text style={styles.buttonText}>Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => rota.push('/pedido')}>
        <Text style={styles.buttonText}>Pedidos</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => rota.push('/sobre')}>
        <Text style={styles.buttonText}>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => rota.push('/localizacao')}>
        <Text style={styles.buttonText}>Localização</Text>
      </TouchableOpacity>

    </View>
  );
}




    const styles = StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: '#F2ECE4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,                       
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A67C52',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D89C9C',
    width: '80%',
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
