import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function Login() {
  const navigation = useNavigation();
  const rota = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAÇA SEU LOGIN</Text>

      <View style={styles.formBox}>
        <TextInput placeholder="E-mail" style={styles.input} />
        <TextInput placeholder="Senha" style={styles.input} secureTextEntry />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => rota.push('/cadastro')}>
        <Text style={styles.linkText}>Ainda não tem cadastro? Clique aqui</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F1EA', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  formBox: { backgroundColor: '#E7DCC9', padding: 20, borderRadius: 10, width: '85%' },
  input: { backgroundColor: '#fff', marginBottom: 10, padding: 10, borderRadius: 5 },
  button: { backgroundColor: '#D09290', padding: 12, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  linkText: { marginTop: 15, color: '#333', textDecorationLine: 'underline' },
});

