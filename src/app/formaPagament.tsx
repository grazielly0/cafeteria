import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const PaymentScreen = () => {
  const router = useRouter();

  const [metodoSelecionado, setMetodoSelecionado] = useState('');
  const [cartao, setCartao] = useState({ numero: '', validade: '', cvv: '' });
  const [cpf, setCpf] = useState('');
  const chavePix = 'cafeteriadamore@pix.com';

  const formasPagamento = [
    { nome: 'Adicionar cartão', id: 'cartao' },
    { nome: 'Pix', id: 'pix' },
    { nome: 'Click to Pay', id: 'click' },
    { nome: 'Google Pay', id: 'google' },
    { nome: 'Nubank', id: 'nubank' },
  ];

  const finalizarCompra = () => {
    if (!metodoSelecionado) {
      Alert.alert('Selecione uma forma de pagamento');
      return;
    }

    if (metodoSelecionado === 'cartao') {
      const { numero, validade, cvv } = cartao;
      if (!numero || !validade || !cvv) {
        Alert.alert('Preencha todos os dados do cartão');
        return;
      }
    }

    Alert.alert('Pedido confirmado!', `Pagamento via ${metodoSelecionado}`);
    router.push('/confirmacaoPedido');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Bar Personalizada */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={28} color="#A67C52" />
        </TouchableOpacity>

        <View style={styles.icons}>
          <TouchableOpacity onPress={() => router.push('/pedido')} style={styles.iconeAcao}>
            <MaterialIcons name="shopping-cart" size={24} color="#D09290" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/cadastro')} style={styles.iconeAcao}>
            <AntDesign name="adduser" size={24} color="#4E1F14" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.headerText}>Detalhes do pagamento</Text>

      <Text style={styles.subtitulo}>Formas de pagamento</Text>
      <View style={styles.grid}>
        {formasPagamento.map((forma) => (
          <TouchableOpacity
            key={forma.id}
            style={[
              styles.botaoMetodo,
              metodoSelecionado === forma.id && styles.metodoSelecionado,
            ]}
            onPress={() => setMetodoSelecionado(forma.id)}
          >
            <Text style={styles.textoMetodo}>{forma.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Formulário do Cartão */}
      {metodoSelecionado === 'cartao' && (
        <View style={styles.cartaoForm}>
          <TextInput
            style={styles.input}
            placeholder="Número do cartão"
            keyboardType="numeric"
            value={cartao.numero}
            onChangeText={(text) => setCartao({ ...cartao, numero: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Validade (MM/AA)"
            value={cartao.validade}
            onChangeText={(text) => setCartao({ ...cartao, validade: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            keyboardType="numeric"
            secureTextEntry
            value={cartao.cvv}
            onChangeText={(text) => setCartao({ ...cartao, cvv: text })}
          />
        </View>
      )}

      {/* PIX */}
      {metodoSelecionado === 'pix' && (
        <View style={styles.areaPix}>
          <Text style={styles.pixLabel}>Escaneie o QR Code para pagar:</Text>
          <QRCode value={chavePix} size={160} />
          <Text style={styles.pixChave}>{chavePix}</Text>
        </View>
      )}

      {/* CPF/CNPJ */}
      <Text style={styles.subtitulo}>CPF/CNPJ na nota</Text>
      <Text style={styles.textoNota}>Quer solicitar uma fatura?</Text>
      <TextInput
        style={styles.input}
        placeholder="Adicionar CPF/CNPJ"
        value={cpf}
        onChangeText={setCpf}
      />

      {/* Resumo do Pedido */}
      <View style={styles.resumo}>
        <View style={styles.linhaResumo}>
          <Text style={styles.textoResumo}>Subtotal</Text>
          <Text style={styles.textoResumo}>R$ 40,90</Text>
        </View>
        <View style={styles.linhaResumo}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>R$ 40,90</Text>
        </View>
      </View>

      {/* Botão Pagar */}
      <TouchableOpacity style={styles.botaoPagar} onPress={finalizarCompra}>
        <Text style={styles.textoBotaoPagar}>Pagar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FCF8F3',
    flexGrow: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
  },
  botaoVoltar: {
    padding: 4,
    marginTop:10,
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconeAcao: {
    marginLeft: 8,
    marginTop:10,

  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E1F14',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#4E1F14',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  botaoMetodo: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3D1B8',
  },
  metodoSelecionado: {
    backgroundColor: '#C89D72',
  },
  textoMetodo: {
    color: '#4E1F14',
    fontWeight: '600',
  },
  cartaoForm: {
    marginTop: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C89D72',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    color: '#4E1F14',
  },
  areaPix: {
    marginTop: 20,
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFF6F4',
    padding: 16,
    borderRadius: 12,
  },
  pixLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#4E1F14',
    fontWeight: '600',
  },
  pixChave: {
    fontSize: 14,
    color: '#4E1F14',
    fontStyle: 'italic',
  },
  textoNota: {
    fontSize: 14,
    marginBottom: 5,
    color: '#4E1F14',
  },
  resumo: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#FDF4EA',
    borderRadius: 10,
  },
  linhaResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  textoResumo: {
    fontSize: 14,
    color: '#4E1F14',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E1F14',
  },
  botaoPagar: {
    backgroundColor: '#D09290',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#A67C52',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  textoBotaoPagar: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FCF8F3',
  },
});

