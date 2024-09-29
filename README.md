# DUI Risk Heatmap

## Description

DUI Risk Heatmap is a web application designed to visualize DUI risk areas using a heatmap overlay on a Google Map. Users can report incidents, and the application tracks and displays high-risk zones based on user-generated data. The app leverages Google Maps API and Firebase for data storage and retrieval.

## Features

- **User-Friendly Map Interactions**
- **Interactive DUI Reporting**
- **Real-Time Heatmap Visualization**
- **High-Risk Zone Identification**

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Google Maps API**: For rendering the map and heatmap functionalities.
- **Firebase**: For storing user reports and incident data.
- **Axios**: For handling HTTP requests to the backend for audio transcription.
- **CSS**: For styling the application.

## Clone GitHub

```bash
 https://github.com/ascarola17/DUI.git
```

## Frontend Dependencies
Make sure Node.js and npm are installed. You can download and install them from [nodejs.org](https://nodejs.org/).

To set up this project locally, follow these steps:

1. Navigate to the project directory:

   ```bash
     cd frontend
2. Install dependenies:

   ```bash
     npm install

3. Create your .env file in the root of the project and add you Google API key:

   ```makefile
     REACT_APP_GOOGLE_MAPS_API_KEY = your_google_maps_api_key
   
4. Start the development server:

   ```bash
     npm start

### Google Maps & Cloud Speech-to-Text API Help
This is a small tutorial regarding how to use the API key with the Google Vision API.
* Visit [console.cloud.google.com](https://console.cloud.google.com/welcome/ )
* Create a new project by selecting "Select a project".
* Ensure your project is selected before developing.
* At the search bar type in "Google Maps Platform" and click "Enable".
* Do the same for the "Cloud Speech-to-Text" and click "Enable".
* From the Navigation Menu:
  * Hover over the "APIs & Services" tab.
  * Click on "Credentials.
  * Click "+ Create Credentials".
  * Select API key and within the restrictions enable both Google Maps Platform and Cloud Speech-to-Text

## About Us

Sun City Solutions - suncitysolutions2024@gmail.com

[https://github.com/ascarola17/DUI](https://github.com/ascarola17/DUI)

