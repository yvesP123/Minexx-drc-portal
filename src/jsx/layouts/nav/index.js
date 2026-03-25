import React, { Fragment, useState, useEffect } from "react";
import SideBar from "./SideBar";
import NavHader from "./NavHader";
import Header from "./Header";
import ChatBox from "../ChatBox";

const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3, onCountryChange: parentOnCountryChange }) => {
   const [toggle, setToggle] = useState("");
   const [language, setLanguage] = useState(localStorage.getItem(`_lang`) || 'en');
   
   // Get initial country from localStorage (always DRC)
   const getInitialCountry = () => {
      return localStorage.getItem(`_country`) || 'DRC';
   };
   
   const [country, setCountry] = useState(getInitialCountry());
   
   // Sync country with localStorage on mount
   useEffect(() => {
      const currentCountry = getInitialCountry();
      if (currentCountry !== country) {
         setCountry(currentCountry);
         localStorage.setItem('_country', currentCountry);
      }
   }, []);
   
   const onClick = (name) => setToggle(toggle === name ? "" : name);
   
   const handleLanguageChange = (newLang) => {
     setLanguage(newLang);
   };
   
   const handleCountryChange = (newCountry) => {
      setCountry(newCountry);
      localStorage.setItem('_country', newCountry);
      if (parentOnCountryChange) {
        parentOnCountryChange(newCountry);
      }
   };
   
   return (
      <Fragment>
         <NavHader />
         <SideBar 
           onClick={() => onClick2()} 
           onClick3={() => onClick3()} 
           language={language}
           country={country}
         />
         <Header
            onNote={() => onClick("chatbox")}
            onNotification={() => onClick("notification")}
            onProfile={() => onClick("profile")}
            toggle={toggle}
            title={title}
            onBox={() => onClick("box")}
            onClick={() => ClickToAddEvent()}
            onLanguageChange={handleLanguageChange}
            onCountryChange={handleCountryChange}
            country={country}
         />
         <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
      </Fragment>  
   );
};

export default JobieNav;