import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/database/useClienteDataBase';
import { makeRedirectUri } from 'expo-auth-session'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'

export default function login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const rota = useRouter()
 

  async function signInWithEmail() {
    const redirectTo = makeRedirectUri()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    });

    
    if (error) {
           
      if (error.message.includes('Usuário não cadastrado'))
       {
        Alert.alert('Erro', 'Login realizado com sucesso!.');
      } else {
        Alert.alert('Erro', error.message);
      }
      return;
    }
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAÇA SEU LOGIN</Text>

      <View style={styles.formBox}>
        <TextInput placeholder="E-mail"  onChangeText={setEmail}style={styles.input} />
        <TextInput placeholder="Senha" onChangeText={setSenha}  style={styles.input} secureTextEntry />

        <TouchableOpacity   onPress={signInWithEmail} style={styles.button}>
          <Text   style={styles.buttonText}>ENTRAR</Text>
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

