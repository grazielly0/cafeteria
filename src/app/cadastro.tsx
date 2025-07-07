import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../utils/supabaseClient';

export default function cadastro() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const rota = useRouter()
  
  
    async function create(){
        try {
          const { data, error } = await supabase.auth.signUp({
            email : email,
            password : senha,
            options: {
              data: {
                first_name: nome,
              },
            },
          });
      
          if (error) {
           
            if (error.message.includes('Usuário já cadastrado'))
             {
              Alert.alert('Erro', 'Este e-mail já está cadastrado.');
            } else {
              Alert.alert('Erro', error.message);
            }
            return;
          }

      
          Alert.alert('Cadastro', 'Cadastro realizado! Verifique seu e-mail.');
        } catch (err) {
          const mensagem =
            err instanceof Error ? err.message : JSON.stringify(err);
          Alert.alert('Erro inesperado', mensagem);
        }
      
  }//fim do inserir
    
    


   
  return (
    <View style={styles.container}>
      {/* Topo com botão de voltar, título e ícones */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => rota.push('/')}>
          <MaterialIcons name="arrow-back" size={28} color="#A67C52" />
        </TouchableOpacity>

        <Text style={styles.title}>FAÇA SEU CADASTRO</Text>

        <View style={styles.icons}>
          <TouchableOpacity onPress={() => rota.push('/cadastro')}>
            <MaterialIcons name="shopping-cart" size={24} color="#D09290" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => rota.push('/perfilUser')}>
            <AntDesign name="adduser" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Formulário com margem maior abaixo da topBar */}
      <View style={styles.formBox}>
        <TextInput placeholder="Nome" onChangeText={setNome} value={nome}  style={styles.input} />
        <TextInput placeholder="E-mail"  onChangeText={setEmail} style={styles.input} />
        <TextInput placeholder="Senha"    onChangeText={setSenha} style={styles.input} secureTextEntry />

        <TouchableOpacity onPress={create} style={styles.button}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => rota.push('/login')}>
        <Text style={styles.linkText}>Já tem seu cadastro? Clique para fazer login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1EA',
    paddingTop: 40,
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  botaoVoltar: {
    padding: 4,
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  title: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: [{ translateX: -90 }],
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4E1F14',
  },
  formBox: {
    backgroundColor: '#E7DCC9',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    marginTop: 60, // <-- FORMULÁRIO MAIS ABAIXO
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  button: {
    backgroundColor: '#D09290',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 20,
    color: '#333',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
