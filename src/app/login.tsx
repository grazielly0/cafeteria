import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/database/useClienteDataBase';
import { makeRedirectUri } from 'expo-auth-session'
import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import Auth from '../components/Auth'

export default function login() {
  const rota = useRouter();
  const redirectTo = makeRedirectUri()
  async function login() {
    
    const { error } = await supabase.auth.signInWithOtp({
      email: 'valid.email@supabase.io',
      options: {
        emailRedirectTo: redirectTo,
      },
    })
  
    const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
    return (
    <View>
      <Auth/>
      {session && session.user && <Text>{session.user.id}</Text>}
    </View>
  )
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAÇA SEU LOGIN</Text>

      <View style={styles.formBox}>
        <TextInput placeholder="E-mail" style={styles.input} />
        <TextInput placeholder="Senha" style={styles.input} secureTextEntry />

        <TouchableOpacity onPress={() => rota.push('/')} style={styles.button}>
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

