import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL, CROSS_DOMAIN } from "../constants";
import {CurrentDay, UpcomingDays, Suggestion, Loading} from "../types"

const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;

const useForecast = () => {
  const [currentDay, setCurrentDay] = useState<CurrentDay>({
    todayDate:"",
    city:"",
    stateName:"",
    temperature: 0,
    icon: 'c',
    wind: 0,
    celciusOrfahrenheit: "°C",
    humidity: 0,
    airPressure: 0,
    visibility: '',
  } as CurrentDay);
  const [upcomingDays, setUpcomingDays] = useState<UpcomingDays[]>([]);

  const [isLoading, setLoading] = useState<Loading>({
    loading: true,
    message: "Loading...",
    icon: "fa fa-spinner icon",
  });

  const [suggestion, setSuggestion] = useState<Suggestion[]>([]);

  useEffect(() => {
    // declare the data fetching function

    const fetchData = async () => {
      await submitRequest({ params: { query: "sydney" } });
    };

    // call the function
    fetchData()
      .then(() => setLoading({...isLoading,  loading: false }))

      // make sure to catch any error
      .catch(console.error);
  }, []);

  const getWoeid = async (location:any) => {
    let { params } = location;
    const { data } = await axios(`${REQUEST_URL}/search`, {
      params,
    });

    if (!data || data.length === 0) {
      setLoading({
        loading: true,
        message: "There is no such location",
        icon: "fa-solid fa-circle-exclamation icon",
      });

      setTimeout(() => {
        setLoading({...isLoading,  loading: false });
      }, 3000);

      return;
    }
    let { woeid } = data[0];

    return woeid;
  };

  const getForcastData = async (woeid:any) => {
    const { data } = await axios(`${REQUEST_URL}/${woeid}`);

    return data;
  };

  const getDayInfo = (date:any, format:any):string => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day:string = "";
    // it will return the date in this format ex: Friday
    if (format === "dayName") {
      const d = new Date(date);

      day = weekday[d.getDay()];

    }

    // it will return the date in this format ex: Fri 01 Apr
    if (format === "todayDate") {
      const d = new Date();

      let temp_date = d.toString().split(" ");

      day = `${temp_date[0]} ${parseInt(temp_date[2])} ${temp_date[1]}`;

    }
    
    return day;
  };

  const gatherForecastData = (data:any) => {
    let weather = data.consolidated_weather;
    let newUpcomingDays = new Array<UpcomingDays>();

    let todayDate = getDayInfo(weather[0].applicable_date, "todayDate");

    for (let i = 1; i < 6; i++) {
      newUpcomingDays = [
        ...newUpcomingDays,
        {
          icon: weather[i].weather_state_abbr,
          minTemp: weather[i].min_temp,
          maxTemp: weather[i].max_temp,
          dayName: getDayInfo(weather[i].applicable_date, "dayName"),
          celciusOrfahrenheit: "°C",
        },
      ];
    }

    let newCurrentDay = {
      todayDate: todayDate,
      city: data.parent
        ? `${data.title} / ${data.parent.title}`
        : `${data.title}`,
      stateName: weather[0].weather_state_name,
      temperature: weather[0].the_temp,
      icon: weather[0].weather_state_abbr,
      wind: Math.round(weather[0].wind_speed),
      celciusOrfahrenheit: "°C",
      humidity: Math.round(weather[0].humidity),
      airPressure: Math.round(weather[0].air_pressure),
      visibility: parseFloat(weather[0].visibility)
        .toFixed(2)
        .replace(".", ","),
    } as CurrentDay;

    setCurrentDay(newCurrentDay);
    setUpcomingDays(newUpcomingDays);
    setLoading({...isLoading,  loading: false });
  };

  const submitRequest = async (location: any) => {
    setLoading({
      loading: true,
      message: "Loading...",
      icon: "fa fa-spinner icon",
    });
    let woeid = await getWoeid(location);
    let data = await getForcastData(woeid);
    let forecast = await gatherForecastData(data);

    return forecast;
  };

  const handleSearchSuggestion = async (location: any) => {
    let { params } = location;

    let { data } = await axios(`${REQUEST_URL}/search`, {
      params,
    });

    let suggestion = [] as Suggestion[];

    for (let i = 0; i < 8; i++) {
      suggestion = [
        ...suggestion,
        {
          city: data[i].title,
        },
      ];
    }

    setSuggestion(suggestion);
  };

  const convertTemp = async (temp:string) => {
    
    // Convert fahrenheit to celcius
    if (currentDay.celciusOrfahrenheit === "°F" && temp !== "°F") {
      let celcius = ((currentDay.temperature - 32) * 5) / 9 ;

      // Updated currentDay object
      setCurrentDay({...currentDay, celciusOrfahrenheit: "°C",temperature: celcius});

      // copying the old datas array
      let newUpcomingDays = [...upcomingDays]; 
      // Updated upcomingDays object
      newUpcomingDays.forEach((element) => {
        // here it will return min and max fahrenheit temperature for the upcomingdays
        let minTemp = ((element.minTemp - 32) * 5) / 9;
        let maxTemp = ((element.maxTemp - 32) * 5) / 9;

        for (let i = 0; i < newUpcomingDays.length; i++) {
          element.minTemp = minTemp;
          element.celciusOrfahrenheit = "°C";
          element.maxTemp = maxTemp;
        }
      });

      setUpcomingDays(newUpcomingDays);
    }
    // Convert celcius to fahrenheit
    if (currentDay.celciusOrfahrenheit === "°C" && temp !== "°C") {
      let fahrenheit = (currentDay.temperature * 9) / 5 + 32;

       // Updated currentDay object
       setCurrentDay({...currentDay, celciusOrfahrenheit: "°F",temperature: fahrenheit});
      
      // Updated upcomingDays object
      // copying the old datas array
      let newUpcomingDays = [...upcomingDays]; 

      newUpcomingDays.forEach((element) => {
        // here it will return min and max fahrenheit temperature for the upcomingdays
        let minTemp = (element.minTemp * 9) / 5 + 32;
        let maxTemp = (element.maxTemp * 9) / 5 + 32;

        for (let i = 0; i < newUpcomingDays.length; i++) {
          element.minTemp = minTemp;
          element.celciusOrfahrenheit = "°F";
          element.maxTemp = maxTemp;
        }
      });

      setUpcomingDays(newUpcomingDays);
    }

  };
  return {
    submitRequest,
    gatherForecastData,
    handleSearchSuggestion,
    currentDay,
    upcomingDays,
    isLoading,
    suggestion,
    convertTemp,
  };
};

export default useForecast;
