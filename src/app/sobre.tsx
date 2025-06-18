import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
 
export default function SobreScreen() {
  return (
<ScrollView style={styles.container}>
      {/* Título da página */}
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
<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
<Image source={require('../../assets/images/detox.jpg')} style={styles.galleryImage} />
<Image source={require('../../assets/images/detox.jpg')} style={styles.galleryImage} />
<Image source={require('../../assets/images/detox.jpg')} style={styles.galleryImage} />
</ScrollView>
</View>
</ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EEE9',  // fundo claro
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
    flexDirection: 'row',
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
});