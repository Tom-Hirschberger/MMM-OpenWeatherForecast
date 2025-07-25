# MMM-OpenWeatherForecast

**MMM-OpenWeatherForecast** is a weather module for [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror).

It displays current, hourly and daily forecast information using data from the OpenWeather One Call API.

![Screenshot](MMM-OpenWeatherForecast.png "Screenshot of the module showing a weather forecast")

## Installation

Just clone the module into your modules directory and install the dependencies:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/Tom-Hirschberger/MMM-OpenWeatherForecast
cd MMM-OpenWeatherForecast
npm ci
```

## Update

Just enter the module's directory, pull the update and install the dependencies:

```bash
cd ~/MagicMirror/modules/MMM-OpenWeatherForecast
git pull
npm ci
```

## Configuration

At a minimum you need to supply the following required configuration parameters:

* `apikey`
* `latitude`
* `longitude`

`apikey` needs to be specified as a string, while `latitude` and `longitude` can be specified as either a string or a number. Both work fine.


You need to create a free account with OpenWeather in order to get an API key: <https://home.openweathermap.org/users/sign_up>.

Make sure to subscribe to the new 3.0 API first and wait a couple hours till the subscription is activated. You will need to provide payment information for the new subscription but as long as you stay under the daily free limit (1000 calls at the moment) you will not be charged.

Find out your latitude and longitude here:
<https://www.latlong.net/>.

### Minimal Configuration

```js
  {
    module: "MMM-OpenWeatherForecast",
    position: "top_right",
    header: "Forecast",
    config: {
      apikey: "a1b2c3d4e5f6g7h8j9k0", // only string here
      latitude: 51.490230,            // number works here
      longitude: "-0.258810"          // so does a string
    }
  },
```

### Other optional parameters

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>apiBaseURL</code></td>
      <td>An alternative API URL you want to use. I.e. <code>https://api.openweathermap.org/data/3.0/onecall?</code> for the new One Call 3.0 API.<br><br><strong>Type</strong> <code>String</code><br>Defaults to <code>https://api.openweathermap.org/data/3.0/onecall?</code></td>
    </tr>
    <tr>
      <td><code>updateInterval</code></td>
      <td>How frequently, in minutes, to poll for data.<br><br><strong>Type</strong> <code>Number</code><br>Defaults to <code>10</code></td>
    </tr>
    <tr>
      <td><code>requestDelay</code></td>
      <td>In milliseconds, how long to delay the request.  If you have multiple instances of the module running, set one of them to a delay of a second or two to keep the API calls from being too close together.<br><br><strong>Type</strong> <code>Number</code><br>Defaults to <code>250</code></td>
    </tr>
    <tr>
      <td><code>updateFadeSpeed</code></td>
      <td>How quickly in milliseconds to fade the module out and in upon data refresh.  Set this to <code>0</code> for no fade.<br><br><strong>Type</strong> <code>Number</code><br>Defaults to <code>500</code> (i.e., 1/2 second).</td>
    </tr>
    <tr>
      <td><code>language</code></td>
      <td>The language to be used for display.<br><br><strong>Type</strong> <code>String</code><br>Defaults to the language set for MagicMirror, but can be overridden with any of the language codes listed here: <a href="https://openweathermap.org/api/one-call-api#multi">https://openweathermap.org/api/one-call-api#multi</a></td>
    </tr>
    <tr>
      <td><code>units</code></td>
      <td>One of the following: <code>standard</code> (e.g., degrees Kelvin), <code>metric</code> (e.g., degress Celcius), or <code>imperial</code> (e.g., degrees Fahrenheit).<br><br><strong>Type</strong> <code>String</code><br>Defaults to <code>"metric"</code><br /></td>
    </tr>
    <tr>
      <td><code>displayKmhForWind</code></td>
      <td>When <code>"standard"</code> or <code>"metric"</code> are used for <code>units</code> OpenWeather's API returns wind speed in m/s.  Set this to <code>true</code> if you would like to see wind speed displayed in km/h.  This parameter has no effect if <code>units</code> is set to <code>"imperial"</code>.<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>false</code><br /></td>
    </tr>
    <tr>
      <td><code>concise</code></td>
      <td>When set to <code>true</code>, this presents less information.  (e.g., no precipitation accumulation, no wind gusts, etc.)<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>true</code></td>
    </tr>
    <tr>
      <td><code>iconset</code></td>
      <td>Which icon set to use.  See below for previews of the icon sets.<br><br><strong>Type</strong> <code>String</code><br>Defaults to <code>"1c"</code></td>
    </tr>
    <tr>
      <td><code>colored</code></td>
      <td>Whether to present the module in colored or black-and-white.  Note, if set to <code>false</code>, the monochromatic version of your chosen icon set will be forced.<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>true</code></td>
    </tr>
    <tr>
      <td><code>useAnimatedIcons</code></td>
      <td>Whether to use the animated icon set.  When set to true, this will override your choice for <code>iconset</code>. However, flat icons will still be used in some instances.  For example if you set the <code>animateMainIconOnly</code> parameter to <code>true</code>, daily and hourly forecasts will not be animated and instead will use your choice for <code>iconset</code>.  Inline icons (i.e. used to prefix weather extras) will always be flat.  A good <code>iconset</code> match for the animated set is <code>1c</code>. NOTE: This may lead to higher than normal CPU usage on low-powered devices such as a Raspberry Pi.  You may also want to set <code>animateMainIconOnly</code> to <code>true</code> to keep things under control.<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>true</code></td>
    </tr>
    <tr>
      <td><code>animateMainIconOnly</code></td>
      <td>When set to <code>true</code>, only the main current conditions icon is animated. The rest use your choice for <code>iconset</code> (<code>1c</code> is a good match for the animated icon).  If you are running on a low-powered device like a Raspberry Pi, performance may suffer if you set this to <code>false</code>.  In my testing on a Pi 3b, enabling this ramped up CPU temperature by 15° - 20°, and fade transitions were not smooth.<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>true</code></td>
    </tr>
    <tr>
      <td><code>animatedIconStartDelay</code></td>
      <td>If you're using animated icons and they are not appearing, it might be timing issue, especially if you're using a slower system like a Raspberry Pi.  Add a delay before the call to start the animation is made, in milliseconds<br><br><strong>Type</strong> <code>Number</code><br>Defaults to <code>1000</code></td>
    </tr>
    <tr>
      <td><code>showFeelsLikeTemp</code></td>
      <td>Makes the temperature display for current conditions and hourly forecast show the "feels like" temperature instead of the actual temperature.<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>false</code></td>
    </tr>
    <tr>
      <td><code>showCurrentConditions</code></td>
      <td>Whether to show current temperature and current conditions icon.<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>true</code></td>
    </tr>
    <tr>
      <td><code>showSummary</code></td>
      <td>Whether to show the forecast summary. Weather alerts will also appear here.<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>true</code></td>
    </tr>
    <tr>
      <td><code>showExtraCurrentConditions</code></td>
      <td>Whether to show additional current conditions such as high/low temperatures, precipitation and wind speed.<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>true</code></td>
    </tr>
    <tr>
      <td><code>extraCurrentConditions</code></td>
      <td>What items to show when <code>showExtraCurrentConditions</code> is set to <code>true</code>.  See the Extras section below for details on how to specify this.<br><br><strong>Type</strong> <code>Object</code><br>Defaults to Hi/Lo Temp, Sunrise/Sunset, Precipitation, Wind and UV Index</td>
    </tr>
    <tr>
      <td><code>forecastHeaderText</code></td>
      <td>Text for the header above the forecast display.  Set to <code>""</code> to hide this header altogether.  Also doesn't appear if
      <code>showHourlyForecast</code> and
      <code>showDailyForecast</code> are both set to <code>false</code>.<br><br><strong>Type</strong> <code>String</code><br>Defaults to
      <code>"Forecast"</code></td>
    </tr>
    <tr>
      <td><code>forecastLayout</code></td>
      <td>Can be set to <code>tiled</code> or <code>table</code>. How to display hourly and forecast information.  See below for screenshot examples of each.<br><br><strong>Type</strong> <code>String</code><br>Defaults to <code>tiled</code></td>
    </tr>
    <tr>
      <td><code>showHourlyForecast</code></td>
      <td>Whether to show hourly forecast information. when set to <code>true</code> it works with the <code>hourlyForecastInterval</code> and <code>maxHourliesToShow</code> parameters.<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>true</code></td>
    </tr>
    <tr>
      <td><code>showHourlyTableHeaderRow</code></td>
      <td>Whether to show the table header text and icon column headers on the hourly forecast table.<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>true</code></td>
    </tr>
    <tr>
      <td><code>hourlyForecastTableHeaderText</code></td>
      <td>The title text to be used for the hourly forecast table.  Set to <code>""</code> if you do not want a title.<br><br><strong>Type</strong> <code>String</code><br>Defaults to <code>"Hourly"</code></td>
    </tr>
    <tr>
      <td><code>hourlyForecastInterval</code></td>
      <td>How many hours apart each listed hourly forecast is.<br><br><strong>Type</strong> <code>Number</code><br>Defaults to <code>3</code></td>
    </tr>
    <tr>
      <td><code>maxHourliesToShow</code></td>
      <td>How many hourly forecasts to list. This is a maximum.  The API returns 48 hours of hourly forecast data.  So if this in combination with <code>hourlyForecastInterval</code> exceeds what's available in the API, you'll only see what's provided.  You won't get an error.  You'll just see less than what you might have been expecting.<br><br><strong>Type</strong> <code>Number</code><br>Defaults to <code>3</code></td>
    </tr>
    <tr>
      <td><code>hourlyExtras</code></td>
      <td>Hourly forecast items will always show the temperature (either actual or "feels like" depending on your setting for <code>showFeelsLikeTemp</code>).  You can configure additional items to be shown. See the "Extras" section below for details on how to specify this.<br><br><strong>Type</strong> <code>Object</code><br>Defaults to Precipitation and Wind.</td>
    </tr>
    <tr>
      <td><code>showDailyForecast</code></td>
      <td>Whether to show daily forecast information. when set to <code>true</code> it works with the <code>maxDailiesToShow</code> parameter.<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>true</code></td>
    </tr>
    <tr>
      <td><code>showDailyTableHeaderRow</code></td>
      <td>Whether to show the table header text and icon column headers on the daily forecast table.<br><br><strong>Type</strong> <code>Boolean</code><br>Defaults to <code>true</code></td>
    </tr>
    <tr>
      <td><code>dailyForecastTableHeaderText</code></td>
      <td>The title text to be used for the daily forecast table.  Set to <code>""</code> if you do not want a title.<br><br><strong>Type</strong> <code>String</code><br>Defaults to <code>"Daily"</code></td>
    </tr>
    <tr>
      <td><code>maxDailiesToShow</code></td>
      <td>How many daily forecasts to list.  This is a maximum.  The API returns 7 days of daily forecast data.  So if you set this greater than 7, you'll only see 7 days. (actually 6, because the current day is not shown within the dailies -- current day conditions are covered in the hourlies and the current conditions displays.)<br><br><strong>Type</strong> <code>Number</code><br>Defaults to <code>3</code></td>
    </tr>
    <tr>
      <td><code>dailyExtras</code></td>
      <td>Daily forecast items will always show the high/low temperature predictions.  You can configure additional items to be shown. See the "Extras" section below for details on how to specify this.<br><br><strong>Type</strong> <code>Object</code><br>Defaults to Precipitation and Wind.</td>
    </tr>
    <tr>
      <td><code>label_maximum</code></td>
      <td>The label you wish to display for prefixing wind gusts.<br><br><strong>Type</strong> <code>String</code><br>Defaults to <code>"max"</code>.</td>
    </tr>
    <tr>
      <td><code>label_high</code></td>
      <td>The label you wish to display for prefixing high temperature.<br><br><strong>Type</strong> <code>String</code><br>Defaults to <code>"H"</code>.</td>
    </tr>
    <tr>
      <td><code>label_low</code></td>
      <td>The label you wish to display for prefixing low temperature.<br><br><strong>Type</strong> <code>String</code><br>Defaults to <code>"L"</code>.</td>
    </tr>
    <tr>
      <td><code>label_hourlyTimeFormat</code></td>
      <td>How you want the time formatted for hourly forecast display.  Accepts any valid moment.js format (<a href="https://momentjs.com/docs/#/displaying/format/">https://momentjs.com/docs/#/displaying/format/</a>). For example, specify short 24h format with <code>"k[h]"</code> (e.g.: <code>14h</code>)<br><br><strong>Type</strong> <code>String</code><br>Defaults to <code>"h a"</code> (e.g.: <code>9 am</code>)</td>
    </tr>
    <tr>
      <td><code>label_sunriseTimeFormat</code></td>
      <td>How you want the time formatted for sunrise/sunset display.  Accepts any valid moment.js format (https://momentjs.com/docs/#/displaying/format/). For example, specify short 24h format with <code>"k[h]"</code> (e.g.: <code>14h</code>)<br><br><strong>Type</strong> <code>String</code><br>Defaults to <code>"h:mm a"</code> (e.g.: <code>6:45 am</code>)</td>
    </tr>
    <tr>
      <td><code>label_days</code></td>
      <td>How you would like the days of the week displayed for daily forecasts.  Assumes index <code>0</code> is Sunday.<br><br><strong>Type</strong> <code>Array of Strings</code><br>Defaults to <code>["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]</code></td>
    </tr>
    <tr>
      <td><code>label_ordinals</code></td>
      <td>How you would like wind direction to be displayed.  Assumes index <code>0</code> is North and proceeds clockwise.<br><br><strong>Type</strong> <code>Array of Strings</code><br>Defaults to <code>["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]</code></td>
    </tr>
  </tbody>
</table>

## Extras

For each of current conditions, hourly forecast and daily forecast, there are additional data that can be optionally displayed. Set the corresponding value for each key to either `true` or `false` to show or hide the item respectively.

### Valid options for `extraCurrentConditions`

This shows all available options:

```js
  extraCurrentConditions: {
    highLowTemp: true,
    precipitation: true,
    sunrise: true,
    sunset: true,
    wind: true,
    barometricPressure: true,
    humidity: true,
    dewPoint: true,
    uvIndex: true,
    visibility: true
  },
```

This shows just Hi/Low temp display and precipitation:

```js
  extraCurrentConditions: {
    highLowTemp: true,
    precipitation: true,
    sunrise: false,
    sunset: false,
    wind: false,
    barometricPressure: false,
    humidity: false,
    dewPoint: false,
    uvIndex: false,
    visibility: false
  },
```

### Valid options for `hourlyExtras`

```js
  hourlyExtras: {
    precipitation: true,
    wind: true,
    barometricPressure: true,
    humidity: true,
    dewPoint: true,
    uvIndex: true,
    visibility: true
  },
```

### Valid options for `dailyExtras`

```js
  dailyExtras: {
    precipitation: true,
    sunrise: true,
    sunset: true,
    wind: true,
    barometricPressure: true,
    humidity: true,
    dewPoint: true,
    uvIndex: true
  },
```

## Sample Configuration

```js
  {
    module: "MMM-OpenWeatherForecast",
    position: "top_right",
    header: "Forecast",
    config: {
      apikey: "********************",
      latitude: 43.653225,
      longitude: -79.383186,
      units: "metric",
      iconset: "3c",
      colored: true,
      concise: true,
      requestDelay: "2000",
      showFeelsLikeTemp: true,
      showCurrentConditions: true,
      showSummary: true,
      showExtraCurrentConditions: true,
      extraCurrentConditions: {
        highLowTemp: true,
        precipitation: true,
        sunrise: true,
        sunset: true,
        wind: true,
        barometricPressure: false,
        humidity: true,
        dewPoint: false,
        uvIndex: true,
        visibility: false
      },
      forecastLayout: "table",
      forecastHeaderText: "",
      hourlyForecastTableHeaderText: "By the hour",
      showHourlyForecast: true,
      showHourlyTableHeaderRow: true,
      hourlyForecastInterval: 1,
      maxHourliesToShow: 10,
      hourlyExtras: {
        precipitation: true,
        wind: true,
        barometricPressure: false,
        humidity: false,
        dewPoint: false,
        uvIndex: false,
        visibility: false
      },
      dailyForecastTableHeaderText: "Throughout the week",
      showDailyForecast: true,
      showDailyTableHeaderRow: true,
      maxDailiesToShow: 5,
      dailyExtras: {
        precipitation: true,
        sunrise: false,
        sunset: false,
        wind: true,
        barometricPressure: false,
        humidity: false,
        dewPoint: false,
        uvIndex: false
      },
    }
  },
```

## Icon Sets

![Icon Sets](iconsets.png "Icon Sets")

## Layouts

![Layouts](forecast-layouts.jpg "Layouts")

## Styling

This module is set to be 320px wide by default. If you wish to override it, you can add the following to your `custom.css` file:

```css
.MMM-OpenWeatherForecast .module-content {
  width: 500px; /* adjust this as desired */
}
```

Most important elements of this module have one or more class names applied. Examine the `MMM-OpenWeatherForecast.css`, `mmm-openweather-forecast.njk`, or inspect elements directly with your browser of choice to determine what class you would like to override (Pro tip: If you start MagicMirror with `npm start dev` you'll get Chrome dev tools that will allow you to directly inspect any HTML element in the module).

## For Module Developers

This module broadcasts a notification when it receives a weather update. The notification is `OPENWEATHER_FORECAST_WEATHER_UPDATE` and the payload contains OpenWeather's JSON weather forecast object for the One Call API. For details on the weather object, see <https://openweathermap.org/api/one-call-3>.

## Contributing

If you find any problems, bugs or have questions, please open a GitHub issue in this repository.

Pull requests are of course also very welcome 🙂

### Developer commands

- `node --run lint` - Run linting checks.
- `node --run lint:fix` - Fix linting issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## Credits

This module based on [MMM-DarkSkyForecast](https://github.com/jclarke0000/MMM-DarkSkyForecast) from [Jeff Clarke](https://github.com/jclarke0000).
