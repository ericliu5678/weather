
export const toggleSlideMenu = () => {
    let container = document.getElementById("container");
    let body = document.getElementsByTagName("body")[0];

    if (container){
      if (container.className === "search-container") {
        container.className = "slide-out";
        body.className = "";
      } else {
        container.className = "search-container";
        body.className = "stop-scrolling";
      }
    }
  };