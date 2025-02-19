import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput, Animated } from "react-native";
import { useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';


const { width, height } = Dimensions.get('window');

export default function NutritionScreen() {
  const translateX = useRef(new Animated.Value(100)).current;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Basic animation setup
  Animated.timing(translateX, {
    toValue: 0,
    duration: 500,
    useNativeDriver: true,
  }).start();
 const renderCard = (imageSource: any) => (
    <TouchableOpacity style={styles.card1}>
      <Image source={imageSource} style={styles.cardImage1} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/33.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>
      <TextInput style={styles.searchBar} placeholder="Rechercher..." />
      
      
      <ScrollView contentContainerStyle={styles.content}>
         {/* Toutes les catégories Section */}
         <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommondation</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Wrapping the cards inside ScrollView */}
            <Animated.View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Recette')}>
  <Image source={require("@/assets/images/diet menu (2).jpg")} style={styles.cardImage} />
</TouchableOpacity>

              <TouchableOpacity style={styles.card}>
                <Image source={require("@/assets/images/juce.jpg")} style={styles.cardImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Image source={require("@/assets/images/Valentine's Day Grain-Free Sugar Cookies - Eat Yourself Skinny.jpg")} style={styles.cardImage} />
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </View>
        {/* Thèmes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Recipe</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            
            {/* Wrapping the cards inside ScrollView */}
            <Animated.View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={styles.card}>
                <Image
                  source={require("@/assets/images/New Recipe autre healthy (1).jpg")}
                  style={styles.cardImage}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Image source={require("@/assets/images/7 façons étonnantes de cuisiner avec du yaourt grec.jpeg")} style={styles.cardImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Image source={require("@/assets/images/The Best Creamy Coffee Smoothie.jpg")} style={styles.cardImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Image source={require("@/assets/images/Creamy Vegan Mushroom Soup.jpeg")} style={styles.cardImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Image source={require("@/assets/images/Lemon Crinkle Cookies (Easy Recipe).jpg")} style={styles.cardImage} />
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </View>

 <View style={styles.section}>
  <Text style={styles.sectionTitle}>All categories</Text>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <Animated.View style={{ flexDirection: "row" }}>
      {[
        { image: require("@/assets/images/Lemon Crinkle Cookies (Easy Recipe).jpg"), text: "Cookies" },
        { image: require("@/assets/images/Aesthetic Avocado Toast Recipe for Brunch.jpg"), text: "Toast" },
        { image: require("@/assets/images/Refreshing Greek Salad_ A Fall Favorite.jpg"), text: " Salad" },
        { image: require("@/assets/images/Tarte aux Pommes Maison - Recette Classique et Réconfortante.jpg"), text: "Tarte" },
        { image: require("@/assets/images/Banana Cherry Smoothie.jpg"), text: "Smoothie" },
      ].map((item, index) => (
        <View key={index} >
          {renderCard(item.image)}
          <View style={styles.categoryOverlay}>
            <Text style={styles.ratingText}>{item.text}</Text>
          </View>
        </View>
      ))}
    </Animated.View>
  </ScrollView>
</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Prend toute la hauteur disponible
    backgroundColor: "#FFFFFF", // Fond blanc pour la lisibilité
    paddingHorizontal: 0, // Espacement horizontal standard
    paddingVertical: 10, // Espacement vertical
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: width * 0.05,
    paddingTop: 10,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerLogo: {
    width: width * 0.13,
    height: height * 0.031,
    resizeMode: "contain",
  },
  searchBar: {
    marginTop: height * 0.08,
    marginHorizontal: width * 0.05,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
  },
  content: {
    flexGrow: 1,
    padding: width * 0.05,
    paddingTop: height * 0.05,
  },
  section: {
    marginBottom: height * 0.04,
  },
  card1: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,  // Changé à 12 pour toutes les cartes
    width: width * 0.4,
    marginRight: width * 0.04,
    alignItems: "center",
  },
  cardImage1: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 12,  // Appliqué sur l'image également
  },
  sectionTitle: {
    fontSize: height * 0.02,
    fontWeight: "600",
    marginBottom: height * 0.02,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    overflow: "hidden",
    width: width * 0.4, // Cards should have the same width as before
    marginRight: width * 0.03, // Space between the cards
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  categoryOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  ratingText: {
    fontSize: 25, 
    color: "#fff", 
    textTransform: "uppercase", // Convertit le texte en majuscules  
    fontWeight: "bold",
  },
});
