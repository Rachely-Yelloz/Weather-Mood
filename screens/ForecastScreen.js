
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Linking,
} from "react-native";
import dayjs from "dayjs";
import { getWeather } from "../utils/weather.js";
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get("window");

// פונקציה לפישוט שם עיר
function simplifyCityName(fullName) {
  if (!fullName) return "";
  const parts = fullName.split(",").map(p => p.trim());
  if (parts.length === 1) return parts[0];
  return `${parts[0]}, ${parts[parts.length - 1]}`;
}

// מפה של קודי מזג אוויר
function getWeatherInfo(weatherCode) {
  switch (weatherCode) {
    case 0: return { icon: "☀️", text: "Sunny", bg: require('../assets/images/cloudy.jpg') };
    case 1: return { icon: "🌤️", text: "Mainly Clear", bg: require('../assets/images/cloudy.jpg') };
    case 2: return { icon: "⛅", text: "Partly Cloudy", bg: require('../assets/images/cloudy.jpg') };
    case 3: return { icon: "☁️", text: "Overcast", bg: require('../assets/images/cloudy.jpg') };
    case 45: return { icon: "🌫️", text: "Fog", bg: require('../assets/images/cloudy1.jpg') };
    case 48: return { icon: "🌁", text: "Rime Fog", bg: require('../assets/images/cloudy1.jpg') };
    case 51: return { icon: "🌦️", text: "Light Drizzle", bg: require('../assets/images/raini.jpg') };
    case 61: return { icon: "🌧️", text: "Light Rain", bg: require('../assets/images/raini.jpg') };
    case 71: return { icon: "🌨️", text: "Light Snow", bg: require('../assets/images/snow.jpg') };
    case 95: return { icon: "⛈️", text: "Thunderstorm", bg: require('../assets/images/snow.jpg') };
    default: return { icon: "❓", text: "Unknown", bg: require('../assets/images/Clear_weather.jpg') };
  }
}


export default function ForecastScreen({ route }) {
  let { city, lat, lon, isCelsius } = route.params;
  city = simplifyCityName(city);

  const [weatherData, setWeatherData] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const now = dayjs();
      const date = now.format("YYYY-MM-DD");
      const hour = now.format("HH");

      const data = await getWeather(lat, lon, date, hour);
      if (data) {
        setWeatherData(data);
        setWeatherInfo(getWeatherInfo(data.weatherCode));
      }
    };
    fetchData();
  }, []);

  if (!weatherData || !weatherInfo) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
<ImageBackground source={weatherInfo.bg} style={styles.bg} resizeMode="cover">
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Weather in {city}</Text>

            <View style={styles.infoContainer}>
              <Text style={styles.dataText}>🌡️ Temperature: {weatherData.temperature}°{isCelsius ? "C" : "F"}</Text>
              <Text style={styles.dataText}>💧 Moisture: {weatherData.humidity}%</Text>
              <Text style={styles.dataText}>{weatherInfo.icon} {weatherInfo.text}</Text>
            </View>

            <TouchableOpacity style={styles.infoButton} onPress={() => setModalVisible(true)}>
              <Text style={{ color: "white" }}>About the app</Text>
            </TouchableOpacity>
          </ScrollView>

          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modal}>
              <View style={styles.modalBox}>
                <Text style={styles.modalText}>The Weather Mood app creates a forecast based on your city 😄</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ color: "blue" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width, justifyContent: "center", alignItems: "center" },
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginTop: 40, textAlign: "center" },
  infoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    gap: 12,
    width: "85%",
    marginTop: 30,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  dataText: { fontSize: 18, color: "#333", fontWeight: "500", textAlign: "center" },
  infoButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  modal: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalBox: { backgroundColor: "white", borderRadius: 15, padding: 20, width: "80%" },
  modalText: { fontSize: 16, textAlign: "center", marginBottom: 10 },
});

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   ImageBackground,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
//   Modal,
//   ScrollView,
//   KeyboardAvoidingView,
// } from "react-native";
// import dayjs from "dayjs";
// import { getWeather } from "../utils/weather.js";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ActivityIndicator, Card, Text, Button, Dialog, Portal, Paragraph } from "react-native-paper";

// const { width } = Dimensions.get("window");

// // פונקציה לפישוט שם עיר
// function simplifyCityName(fullName) {
//   if (!fullName) return "";
//   const parts = fullName.split(",").map(p => p.trim());
//   if (parts.length === 1) return parts[0];
//   return `${parts[0]}, ${parts[parts.length - 1]}`;
// }

// // מפה של קודי מזג אוויר
// function getWeatherInfo(weatherCode) {
//   switch (weatherCode) {
//     case 0: return { icon: "☀️", text: "Sunny", bg: require('../assets/images/cloudy.jpg') };
//     case 1: return { icon: "🌤️", text: "Mainly Clear", bg: require('../assets/images/cloudy.jpg') };
//     case 2: return { icon: "⛅", text: "Partly Cloudy", bg: require('../assets/images/cloudy.jpg') };
//     case 3: return { icon: "☁️", text: "Overcast", bg: require('../assets/images/cloudy.jpg') };
//     case 45: return { icon: "🌫️", text: "Fog", bg: require('../assets/images/cloudy1.jpg') };
//     case 48: return { icon: "🌁", text: "Rime Fog", bg: require('../assets/images/cloudy1.jpg') };
//     case 51: return { icon: "🌦️", text: "Light Drizzle", bg: require('../assets/images/raini.jpg') };
//     case 61: return { icon: "🌧️", text: "Light Rain", bg: require('../assets/images/raini.jpg') };
//     case 71: return { icon: "🌨️", text: "Light Snow", bg: require('../assets/images/snow.jpg') };
//     case 95: return { icon: "⛈️", text: "Thunderstorm", bg: require('../assets/images/snow.jpg') };
//     default: return { icon: "❓", text: "Unknown", bg: require('../assets/images/Clear_weather.jpg') };
//   }
// }

// export default function ForecastScreen({ route }) {
//   let { city, lat, lon, isCelsius } = route.params;
//   city = simplifyCityName(city);

//   const [weatherData, setWeatherData] = useState(null);
//   const [weatherInfo, setWeatherInfo] = useState(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const now = dayjs();
//       const date = now.format("YYYY-MM-DD");
//       const hour = now.format("HH");

//       const data = await getWeather(lat, lon, date, hour);
//       if (data) {
//         setWeatherData(data);
//         setWeatherInfo(getWeatherInfo(data.weatherCode));
//       }
//     };
//     fetchData();
//   }, []);

//   if (!weatherData || !weatherInfo) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <ActivityIndicator size="large" animating={true} />
//         <Text>Loading forecast...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <ImageBackground source={weatherInfo.bg} style={styles.bg} resizeMode="cover">
//           <ScrollView contentContainerStyle={styles.container}>
//             <Card style={styles.card}>
//               <Card.Title title={`Weather in ${city}`} subtitle={dayjs().format("dddd, MMM D")} />
//               <Card.Content>
//                 <Text style={styles.weatherIcon}>{weatherInfo.icon}</Text>
//                 <Text style={styles.weatherText}>{weatherInfo.text}</Text>
//                 <Text style={styles.dataText}>🌡️ {weatherData.temperature}°{isCelsius ? "C" : "F"}</Text>
//                 <Text style={styles.dataText}>💧 {weatherData.humidity}% Humidity</Text>
//               </Card.Content>
//               <Card.Actions>
//                 <Button mode="contained" onPress={() => setVisible(true)}>
//                   About the App
//                 </Button>
//               </Card.Actions>
//             </Card>
//           </ScrollView>

//           <Portal>
//             <Dialog visible={visible} onDismiss={() => setVisible(false)}>
//               <Dialog.Title>About Weather Mood 🌦️</Dialog.Title>
//               <Dialog.Content>
//                 <Paragraph>
//                   The Weather Mood app shows real-time weather forecasts based on your chosen city.
//                 </Paragraph>
//               </Dialog.Content>
//               <Dialog.Actions>
//                 <Button onPress={() => setVisible(false)}>Close</Button>
//               </Dialog.Actions>
//             </Dialog>
//           </Portal>
//         </ImageBackground>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   bg: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   container: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   card: {
//     width: "95%",       // יותר רחב
//     maxWidth: 600,
//     backgroundColor: "rgba(255,255,255,0.9)",
//     borderRadius: 15,
//     padding: 10,
//     elevation: 5,
//   },
//   weatherIcon: {
//     fontSize: 64,
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   weatherText: {
//     fontSize: 22,
//     textAlign: "center",
//     fontWeight: "600",
//     marginBottom: 10,
//   },
//   dataText: {
//     fontSize: 18,
//     textAlign: "center",
//     color: "#333",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
