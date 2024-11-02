
# Weather App

## Overview
The **Weather App** is a web-based application that provides real-time weather information for your current location or any city you search for. It utilizes the OpenWeatherMap API to fetch and display weather data, including temperature, wind speed, humidity, and cloud cover.

## Features
- **Current Location Weather**: Get the weather for your current location by granting access to your device's location.
- **City Search**: Search for the weather in any city worldwide.
- **Weather Details**: View detailed weather information, including temperature, wind speed, humidity, and cloud coverage.
- **Dynamic UI**: A responsive and dynamic user interface that updates based on user interactions.

## Technologies Used
- **HTML**: Structure and layout of the app.
- **CSS**: Styling and responsive design.
- **JavaScript**: Handling user interactions, fetching weather data, and updating the UI.
- **OpenWeatherMap API**: Fetching real-time weather data.

## How to Use
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Open `index.html`** in your browser:
   ```bash
   open index.html
   ```

3. **Use the App**:
   - **Your Weather Tab**: Click on "Your Weather" and allow location access to view the weather in your current location.
   - **Search Weather Tab**: Switch to the "Search Weather" tab, enter a city name, and click the search button to get weather details for that city.

## Code Structure
- **index.html**: Main HTML file that includes the structure of the app.
- **styles.css**: CSS file containing styles for the app.
- **script.js**: JavaScript file responsible for handling interactions and fetching data.
- **assets/**: Folder containing images and icons used in the app.

## API Integration
The app uses the **OpenWeatherMap API** to fetch weather data. The API key is stored in the `script.js` file. You can replace the existing API key with your own:

```javascript
const API_KEY = "YOUR_API_KEY";
```

## Acknowledgments
- **OpenWeatherMap**: For providing the weather API.
- **Google Fonts**: For fonts used in the app.

## RepoMap
![image](https://github.com/user-attachments/assets/fdbe47dc-eadc-47b0-b10a-cd2afbfb89ea)
