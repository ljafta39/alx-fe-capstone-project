Weather Dashboard
A responsive weather dashboard built with React that provides real-time weather information. Features dark mode support, geolocation, search history, and unit conversion.
🌟 Features

Real-time Weather Data: Get current weather conditions for any city
Geolocation Support: Automatically fetch weather for user's current location
Dark Mode: Toggle between light and dark themes with persistent preferences
Search History: Recent searches are saved for quick access
Responsive Design: Works seamlessly across desktop and mobile devices
Unit Conversion: Support for both metric and imperial units
Error Handling: User-friendly error messages and loading states

🚀 Getting Started
Prerequisites

Node.js (v14.0.0 or higher)
npm or yarn
OpenWeatherMap API key

Installation

Clone the repository:

bashCopygit clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard

Install dependencies:

bashCopynpm install

Create a .env file in the root directory and add your OpenWeatherMap API key:

CopyREACT_APP_WEATHER_API_KEY=your_api_key_here

Start the development server:

bashCopynpm start
The application will be available at http://localhost:3000
🛠️ Built With

React
Tailwind CSS
Lucide React Icons
OpenWeatherMap API

📦 Project Structure
Copysrc/
  ├── components/        # React components
  │   ├── Alert.jsx     # Custom alert component
  │   ├── SearchBar.jsx # Search functionality
  │   └── WeatherCard.jsx # Weather display component
  ├── hooks/            # Custom React hooks
  │   └── useTheme.js   # Dark mode functionality
  ├── App.jsx           # Main application component
  └── index.js          # Application entry point
🔑 Environment Variables
The following environment variables are required:
CopyREACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
🎨 Customization
Theme Customization
The application uses Tailwind CSS for styling. You can customize the theme by modifying the tailwind.config.js file.
API Configuration
The weather data is fetched from OpenWeatherMap API. You can modify the API configuration in the App.jsx file:
javascriptCopyconst BASE_URL = "https://api.openweathermap.org/data/2.5";
📱 Browser Support
The dashboard supports all modern browsers:

Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)

🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

OpenWeatherMap for providing the weather data API
Lucide for the beautiful icons
Tailwind CSS team for the styling framework

📫 Contact
Lungellihle - lungaj39@gmail.com
Project Link: https://github.com/ljafta39/weather-dashboard