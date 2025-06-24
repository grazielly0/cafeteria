import React from 'react';
import { View,TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useRouter} from "expo-router";
import { useNavigation} from '@react-navigation/native';
 
export default function SobreScreen() {
  const navigation = useNavigation();
  const rota = useRouter();
  return (

<ScrollView style={styles.container}>
      

      {/* Título da página */}


  <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => rota.push('/')}
      >
        <MaterialIcons name="arrow-back" size={28} color="#A67C52" />
      </TouchableOpacity>

     
  <View style={styles.icons}>
    <TouchableOpacity onPress={() => rota.push('/Pedido')}>
    <MaterialIcons name="shopping-cart" size={24} color="#D09290" />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => rota.push('/cadastro')}>
        <AntDesign name="adduser" size={24} color="black" />
      </TouchableOpacity>
    </View>
    
      <View style={styles.titleContainer}>
<Text style={styles.title}>SOBRE</Text>
</View>
 
      {/* Área de conteúdo */}
<View style={styles.content}>
<Text style={styles.sectionTitle}>Descrição</Text>
<Text style={styles.descriptionText}>
          Bem-vindo à nossa cafeteria! Somos apaixonados por café e por oferecer um ambiente acolhedor para nossos clientes. Aqui você encontrará desde o expresso clássico até bebidas especiais feitas com muito carinho.
</Text>
 
<Text style={styles.sectionTitle}>Galeria de Fotos</Text>
    <View style={styles.gallery}>
      <Image source={require('../../assets/images/cafeteria.webp')} style={styles.galleryImage} />
      <Image source={require('../../assets/images/cafe2.jpg')} style={styles.galleryImage} />
      <Image source={require('../../assets/images/cafe3.jpg')} style={styles.galleryImage} />
      <Image source={require('../../assets/images/cfe4.jpg')} style={styles.galleryImage} /> {/* corrigido aqui */}
      <Image source={require('../../assets/images/cafe6.jpg')} style={styles.galleryImage} />
      <Image source={require('../../assets/images/cafe7.jpg')} style={styles.galleryImage} />
    </View>
  </View>
</ScrollView>
  );
}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F3',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 5,
    left: 16,
    zIndex: 10,
    padding: 4,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginBottom: 8,
  },
  titleContainer: {
    backgroundColor: '#E8DFD8',  // cor bege clara
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4E1F14',  // marrom café
    textDecorationLine: 'underline',
  },
  content: {
    backgroundColor: '#CDA77A',  // bege cappuccino
    margin: 20,
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4E1F14',
  },
  descriptionText: {
    fontSize: 14,
    color: '#4E1F14',
    marginBottom: 20,
  },
  gallery: {
    flexDirection: 'column',
    gap: 12,
  },
  galleryImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  
});