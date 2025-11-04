
// import React, { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     KeyboardAvoidingView,
//     Platform,
//     Alert,
//     StyleSheet,
//     Switch,
//     ScrollView,
//     ActivityIndicator,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getCoordinates } from "../utils/weather.js";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function HomeScreen({ navigation }) {
//     const [city, setCity] = useState("");
//     const [isCelsius, setIsCelsius] = useState(true);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const loadCity = async () => {
//             const savedCity = await AsyncStorage.getItem("lastCity");
//             if (savedCity) setCity(savedCity);
//         };
//         loadCity();
//     }, []);

//     const handleSearch = async () => {
//         if (!city.trim()) {
//             Alert.alert("שגיאה", "אנא הזיני שם עיר");
//             return;
//         }

//         setLoading(true);

//         const coordinates = await getCoordinates(city);

//         if (!coordinates) {
//             setLoading(false);
//             Alert.alert("שגיאה", "העיר לא נמצאה 😔");
//             return;
//         }

//         await AsyncStorage.setItem("lastCity", city);

//         setLoading(false);
//         navigation.navigate("Forecast", {
//             city: coordinates.displayName,
//             lat: coordinates.lat,
//             lon: coordinates.lon,
//             isCelsius,
//         });
//     };

//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <KeyboardAvoidingView
//                 style={{ flex: 1 }}
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
//             >
//                 <ScrollView contentContainerStyle={styles.scrollContainer}>
//                     <Text style={styles.title}>Welcome to Weather Mood 🌤️</Text>

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter a city name..."
//                         value={city}
//                         onChangeText={setCity}
//                     />

//                     <View style={styles.switchContainer}>
//                         <Text>Celsius</Text>
//                         <Switch value={isCelsius} onValueChange={setIsCelsius} />
//                         <Text>Fahrenheit</Text>
//                     </View>

//                     {loading ? (
//                         <ActivityIndicator size="large" color="#000" />
//                     ) : (
//                         <TouchableOpacity style={styles.button} onPress={handleSearch}>
//                             <Text style={styles.buttonText}>Check Forecast</Text>
//                         </TouchableOpacity>
//                     )}
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     scrollContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 30,
//         textAlign: "center",
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: "#aaa",
//         borderRadius: 10,
//         padding: 10,
//         width: "80%",
//         textAlign: "center",
//         marginBottom: 20,
//     },
//     switchContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 20,
//         gap: 10,
//     },
//     button: {
//         backgroundColor: "#1e90ff",
//         padding: 15,
//         borderRadius: 10,
//         alignItems: "center",
//         width: "80%",
//     },
//     buttonText: {
//         color: "#fff",
//         fontWeight: "bold",
//         textAlign: "center",
//     },
// });
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCoordinates } from "../utils/weather.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, Switch, ActivityIndicator, Card } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  const [city, setCity] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCity = async () => {
      const savedCity = await AsyncStorage.getItem("lastCity");
      if (savedCity) setCity(savedCity);
    };
    loadCity();
  }, []);

  const handleSearch = async () => {
    if (!city.trim()) {
      Alert.alert("שגיאה", "אנא הזיני שם עיר");
      return;
    }

    setLoading(true);
    const coordinates = await getCoordinates(city);
    setLoading(false);

    if (!coordinates) {
      Alert.alert("שגיאה", "העיר לא נמצאה 😔");
      return;
    }

    await AsyncStorage.setItem("lastCity", city);

    navigation.navigate("Forecast", {
      city: coordinates.displayName,
      lat: coordinates.lat,
      lon: coordinates.lon,
      isCelsius,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Card style={styles.card}>
            <Card.Title title="Weather Mood 🌤️" subtitle="Check your city's forecast" />
            <Card.Content>
              <TextInput
                label="Enter a city name..."
                value={city}
                onChangeText={setCity}
                mode="outlined"
                style={{ marginBottom: 20 }}
              />
              <View style={styles.switchRow}>
                <Text>Celsius</Text>
                <Switch value={isCelsius} onValueChange={setIsCelsius} />
                <Text>Fahrenheit</Text>
              </View>

              {loading ? (
                <ActivityIndicator animating={true} size="large" />
              ) : (
                <Button mode="contained" onPress={handleSearch}>
                  Check Forecast
                </Button>
              )}
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },
});
