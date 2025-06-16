import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const usuarioMock = {
  nome: 'João da Cafeteria',
  email: 'joao@cafe.com',
};

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert('Logout realizado!');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>MEU PERFIL</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.valor}>{usuarioMock.nome}</Text>

        <Text style={styles.label}>E-mail:</Text>
        <Text style={styles.valor}>{usuarioMock.email}</Text>
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleLogout}>
        <Text style={styles.textoBotao}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F3',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#A67C52',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFF4E8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#7C4F2D',
    fontWeight: 'bold',
    marginTop: 10,
  },
  valor: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#C89D72',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
