export type CurrentDay = {
    todayDate: string,
    city: string,
    stateName: string,
    temperature: number,
    icon: any,
    wind: number,
    celciusOrfahrenheit: string,
    humidity: number,
    airPressure: number,
    visibility: string,
  };
  
  export type UpcomingDays = {
    icon: any,
    minTemp: number,
    maxTemp: number,
    dayName: string,
    celciusOrfahrenheit: string,
  };
  
  export type Loading = {
    loading: boolean,
    message: string,
    icon: any,
  }
  
  export type Suggestion = {
    city: string,
    woeid?: any,
  };
