import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const FormaEntrega = ({ tipoPedidoProp }) => {
  const tipoPedido = tipoPedidoProp || 'delivery';
  const isDelivery = tipoPedido === 'delivery';

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [telefone, setTelefone] = useState('');

  const router = useRouter();
  const rota = useRouter();

  const confirmarDados = () => {
    const telefoneLimpo = telefone.replace(/\D/g, '');

 
 

    if (numero.trim().length < 3) {
      Alert.alert('Número inválido', 'Informe o número do endereço.');
      return;
    }


    router.push('/formaPagament');
  };

  if (!isDelivery) {
    return (
      <View style={styles.container}>
        <Text style={styles.mensagemNaoDelivery}>
          Este formulário é exclusivo para pedidos do tipo delivery.
        </Text>
      </View>
    );
  }

  const telefoneLimpo = telefone.replace(/\D/g, '');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => rota.push('/')}>
          <MaterialIcons name="arrow-back" size={28} color="#A67C52" />
        </TouchableOpacity>

        <View style={styles.icons}>
          <TouchableOpacity onPress={() => rota.push('/pedido')}>
            <MaterialIcons name="shopping-cart" size={24} color="#D09290" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => rota.push('/cadastro')}>
            <AntDesign name="adduser" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>Endereço de Entrega</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome completo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Ana Beatriz"
            value={nome}
            onChangeText={setNome}
            multiline
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Endereço *</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua, Avenida..."
            value={endereco}
            onChangeText={setEndereco}
            multiline
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, styles.metade]}>
            <Text style={styles.label}>Número *</Text>
            <TextInput
              style={styles.input}
              placeholder="123"
              value={numero}
              onChangeText={setNumero}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.formGroup, styles.metade, { marginLeft: 8 }]}>
            <Text style={styles.label}>Complemento</Text>
            <TextInput
              style={styles.input}
              placeholder="Ap, Bloco, Casa..."
              value={complemento}
              onChangeText={setComplemento}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Bairro *</Text>
          <TextInput
            style={styles.input}
            placeholder="Centro, Bairro Novo..."
            value={bairro}
            onChangeText={setBairro}
            multiline
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Telefone para contato *</Text>
          <TextInput
            style={[
              styles.input,
              telefoneLimpo.length !== 11 && telefone !== '' && styles.inputErro,
            ]}
            placeholder="(11) 91234-5678"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
            maxLength={15}
          />
          <Text style={styles.contador}>
            Dígitos: {telefoneLimpo.length} / 11
          </Text>
        </View>

        <TouchableOpacity style={styles.botao} onPress={confirmarDados}>
          <Text style={styles.textoBotao}>Continuar para pagamento</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormaEntrega;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F3',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 20,
  },
  botaoVoltar: {
    padding: 4,
  },
  icons: {
    flexDirection: 'row',
    gap: 12,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
    marginTop: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E1F14',
    marginBottom: 30,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#7A5B3E',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1.2,
    borderColor: '#E3D1B8',
    color: '#333',
    textAlignVertical: 'top',
  },
  inputErro: {
    borderColor: '#D9534F',
  },
  contador: {
    fontSize: 12,
    color: '#A67C52',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metade: {
    flex: 1,
  },
  botao: {
    backgroundColor: '#C89D72',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mensagemNaoDelivery: {
    fontSize: 16,
    color: '#5B3D1D',
    textAlign: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
});


