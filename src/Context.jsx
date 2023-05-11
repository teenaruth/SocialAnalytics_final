import { createContext, useContext, useState } from "react";
import { data } from "./data";
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const uniqueStream = [];

  data.map((item)=>{
     item.stream.map((stream)=>{
      if(uniqueStream.indexOf(stream)===-1){
        uniqueStream.push(stream)
      }
     })
  })
  
  var uniqueheader = [];
  data.map((item)=>{
    if(uniqueheader.indexOf(item.header)===-1){
      uniqueheader.push(item.header)
    }
  })
  
  const [currentItem, setCurrentItem] = useState(uniqueStream[0]);
  
  const uniqueParams = uniqueheader.map((items) => {
    return data
      .filter(
        (item) => item.header == items && item.stream.includes(currentItem)
      )
      .map((items) => {
        return items.header;
      });
  });

  
  const uniqueParamsLen = uniqueParams.map((items) => {
    return items.length;
  });
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        currentItem,
        setCurrentItem,
        uniqueStream,
        uniqueheader,
        uniqueParamsLen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
