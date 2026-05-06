/**
 ********************************
 *
 *Node Helper for MMM-OpenWeatherForecast.
 *
 *This helper is responsible for the data pull from OpenWeather's
 *One Call API. At a minimum the API key, Latitude and Longitude
 *parameters must be provided.  If any of these are missing, the
 *request to OpenWeather will not be executed, and instead an error
 *will be output the the MagicMirror log.
 *
 *Additional, this module supplies two optional parameters:
 *
 *  units - one of "standard", "metric" or "imperial"
 *  lang - Any of the languages OpenWeather supports, as listed here: https://openweathermap.org/api/one-call-api#multi
 *
 *The OpenWeather OneCall API request looks like this:
 *
 *  https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=minutely&appid={API key}&units={units}&lang={lang}
 *
 ********************************
 */

const Log = require("logger");
const NodeHelper = require("node_helper");
const moment = require("moment");

module.exports = NodeHelper.create({

  start () {
    Log.log(`Starting node_helper for: ${this.name}`);
  },

  async socketNotificationReceived (notification, payload) {
    if (notification === "OPENWEATHER_FORECAST_GET") {
      if (payload.apikey === null || payload.apikey === "") {
        Log.error(`[MMM-OpenWeatherForecast] ${moment().format("D-MMM-YY HH:mm")} ** ERROR ** No API key configured. Get an API key at https://openweathermap.org/`);
      } else if (payload.latitude === null || payload.latitude === "" || payload.longitude === null || payload.longitude === "") {
        Log.error(`[MMM-OpenWeatherForecast] ${moment().format("D-MMM-YY HH:mm")} ** ERROR ** Latitude and/or longitude not provided.`);
      } else {
        // make request to OpenWeather One Call API
        const url = `${payload.apiBaseURL
        }lat=${payload.latitude
        }&lon=${payload.longitude
        }&exclude=minutely` +
        `&appid=${payload.apikey
        }&units=${payload.units
        }&lang=${payload.language}`;

        if (typeof this.config !== "undefined") {
          Log.debug(`[MMM-OpenWeatherForecast] Fetching url: ${url}`);
        }

        try {
          const response = await fetch(url);

          if (response.status !== 200) {
            Log.error(`[MMM-OpenWeatherForecast] API response error: ${response.status} ${response.statusText}`);
            return;
          }

          const data = await response.json();

          if (typeof data !== "undefined") {
            data.instanceId = payload.instanceId;
// --- START: Home Assistant Temperature Integration ---
            // Check config.js
            if (this.config.haUrl && this.config.haToken && this.config.haSensor) {
              try {
                const haUrl = `${this.config.haUrl}/api/states/${this.config.haSensor}`;
                
                // Wir holen die Daten von Home Assistant
                const haResponse = await fetch(haUrl, {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${this.config.haToken}`,
                    'Content-Type': 'application/json'
                  }
                });

                if (haResponse.ok) {
                  const haData = await haResponse.json();
                  
                  // Overwrite Openweather Temo
                  if (haData && haData.state) {
                    const haTemp = parseFloat(haData.state);
                    if (!isNaN(haTemp) && data.current) {
                      data.current.temp = haTemp; 
                      // Optional "feels like" override:
                      // data.current.feels_like = haTemp; 
                    }
                  }
                } else {
                  Log.warn(`[MMM-OpenWeatherForecast] Home Assistant API Fehler: ${haResponse.status}`);
                }
              } catch (haError) {
                // Log HA unavailability                
                Log.error(`[MMM-OpenWeatherForecast] Error connecting to HA: ${haError}`);
              }
            }
// --- END: Home Assistant Temperature Integration ---
            this.sendSocketNotification("OPENWEATHER_FORECAST_DATA", data);
          }
        } catch (error) {
          Log.error(`[MMM-OpenWeatherForecast] ${moment().format("D-MMM-YY HH:mm")} ** ERROR ** ${error}\n${error.stack}`);
        }
      }
    } else if (notification === "CONFIG") {
      this.config = payload;
    }
  }
});
