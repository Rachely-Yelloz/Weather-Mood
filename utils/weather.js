
export async function getCoordinates(cityName) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`,
      {
        headers: {
          "User-Agent": "WeatherMoodApp/1.0 (your_email@example.com)" // חובה כדי לא להיחסם
        }
      }
    );

    const data = await response.json();

    if (data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}

export async function getWeather(lat, lon) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,weathercode&timezone=auto`
    );
    const data = await response.json();

    // לוקחים את השעה הנוכחית
    const now = new Date();
    const hour = now.getHours();

    return {
      temperature: data.hourly.temperature_2m[hour],
      humidity: data.hourly.relative_humidity_2m[hour],
      weatherCode: data.hourly.weathercode[hour],
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

