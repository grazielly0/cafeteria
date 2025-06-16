import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const opcoesPagamento = ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Pix'];

const PaymentScreen = () => {
  const [selecionado, setSelecionado] = useState(null);

  const finalizarCompra = () => {
    if (!selecionado) {
      Alert.alert('Selecione uma forma de pagamento');
      return;
    }

    Alert.alert('Compra finalizada!', `Pagamento via ${selecionado}. Obrigado!`);
    // Aqui você pode redirecionar para uma tela de confirmação, limpar carrinho etc.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>FORMA DE PAGAMENTO</Text>

      <View style={styles.opcoes}>
        {opcoesPagamento.map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={[
              styles.botaoOpcao,
              selecionado === opcao && styles.botaoSelecionado,
            ]}
            onPress={() => setSelecionado(opcao)}
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
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A67C52',
    textAlign: 'center',
    marginBottom: 20,
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
  },
  textoBotao: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
