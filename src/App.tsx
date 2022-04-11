import "./App.css";
import * as React from "react";
import { Loader } from "./components/loader";
import { Main } from "./components/main-section";
import Search from "./components/search";
import {Side} from "./components/side-section";
import useForecast from "./hooks/useForecast";
function App() {
  const {
    submitRequest,
    isLoading,
    handleSearchSuggestion,
    currentDay,
    upcomingDays,
    suggestion,
    convertTemp,
  } = useForecast();

  return (
    <div className="App">
      <Loader loading={isLoading.loading} icon={isLoading.icon} message = {isLoading.message} />
      <Search
        submitRequest={submitRequest}
        handleSearchSuggestion={handleSearchSuggestion}
        suggestion={suggestion}
      />

      <Side submitRequest={submitRequest} currentDay={currentDay} />
      <Main
        currentDay={currentDay}
        upcomingDays={upcomingDays}
        convertTemp={convertTemp}
      />
    </div>
  );
}

export default App;
