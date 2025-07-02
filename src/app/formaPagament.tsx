import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const opcoesPagamento = ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Pix'];

const PaymentScreen = () => {
  const [selecionado, setSelecionado] = useState(null);
  const [chavePix, setChavePix] = useState('');
  const [pixGerado, setPixGerado] = useState(false);
  const [cartao, setCartao] = useState({
    numero: '',
    validade: '',
    cvv: '',
  });

  const navigation = useNavigation();
  const rota = useRouter();

  const gerarPix = () => {
    const chave = 'cafeteriadamore@pix.com';
    setChavePix(chave);
    setPixGerado(true);
  };

  const handleSelecionar = (opcao) => {
    setSelecionado(opcao);
    setPixGerado(false);
    if (opcao === 'Pix') {
      gerarPix();
    }
  };

  const finalizarCompra = () => {
    if (!selecionado) {
      Alert.alert('Selecione uma forma de pagamento');
      return;
    }

    if (
      (selecionado === 'Cartão de Crédito' || selecionado === 'Cartão de Débito') &&
      (!cartao.numero || !cartao.validade || !cartao.cvv)
    ) {
      Alert.alert('Preencha todos os dados do cartão');
      return;
    }

    Alert.alert('Compra finalizada!', `Pagamento via ${selecionado}. Obrigado!`);

    // Limpar campos e resetar estados
    setCartao({
      numero: '',
      validade: '',
      cvv: '',
    });
    setSelecionado(null);
    setPixGerado(false);
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.titulo}>FORMA DE PAGAMENTO</Text>

      <View style={styles.opcoes}>
        {opcoesPagamento.map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={[
              styles.botaoOpcao,
              selecionado === opcao && styles.botaoSelecionado,
            ]}
            onPress={() => handleSelecionar(opcao)}
          >
            <Text
              style={[
                styles.textoOpcao,
                selecionado === opcao && styles.textoSelecionado,
              ]}
            >
              {opcao}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* FORMULÁRIO CARTÃO */}
      {(selecionado === 'Cartão de Crédito' || selecionado === 'Cartão de Débito') && (
        <View style={styles.areaPix}>
          <Text style={styles.labelPix}>Insira os dados do cartão:</Text>
          <TextInput
            placeholder="Número do Cartão"
            placeholderTextColor="#999"
            keyboardType="numeric"
            style={styles.input}
            value={cartao.numero}
            onChangeText={(text) => setCartao({ ...cartao, numero: text })}
          />
          <TextInput
            placeholder="Validade (MM/AA)"
            placeholderTextColor="#999"
            style={styles.input}
            value={cartao.validade}
            onChangeText={(text) => setCartao({ ...cartao, validade: text })}
          />
          <TextInput
            placeholder="CVV"
            placeholderTextColor="#999"
            keyboardType="numeric"
            secureTextEntry
            style={styles.input}
            value={cartao.cvv}
            onChangeText={(text) => setCartao({ ...cartao, cvv: text })}
          />
        </View>
      )}

      {/* QR CODE PIX */}
      {pixGerado && (
        <View style={styles.areaPix}>
          <Text style={styles.labelPix}>Chave Pix:</Text>
          <Text selectable style={styles.chavePix}>{chavePix}</Text>
          <QRCode value={chavePix} size={160} />
        </View>
      )}

      <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarCompra}>
        <Text style={styles.textoBotao}>Finalizar compra</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;

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
    marginBottom: 8,
  },
  botaoVoltar: {
    padding: 4,
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A67C52',
    textAlign: 'center',
    marginTop: 100,
  },
  opcoes: {
    flex: 1,
    justifyContent: 'center',
  },
  botaoOpcao: {
    backgroundColor: '#E6D6BE',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  botaoSelecionado: {
    backgroundColor: '#C89D72',
  },
  textoOpcao: {
    fontSize: 16,
    color: '#5B3D1D',
    textAlign: 'center',
  },
  textoSelecionado: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botaoFinalizar: {
    backgroundColor: '#C89D72',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  areaPix: {
    alignItems: 'center',
    marginVertical: 24,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  labelPix: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#4E1F14',
  },
  chavePix: {
    fontSize: 14,
    marginBottom: 12,
    color: '#000',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#C89D72',
    color: '#000',
  },
});
