import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header,NewsLetter,Featured, BlogGrid, Profile } from './components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from "./components/Header/context/Theme.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [themeMode, setThemeMode] = useState("light");

  const lightmode = () => {
    setThemeMode("light");
  };
  const darkmode = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          // console.log("UserData",userData);
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  //actual theme change
  useEffect(() => {
    var theme = document.querySelector("html").classList;
    theme.remove("light", "dark");
    theme.add(themeMode);
  }, [themeMode]);

  return !loading ? (

    <ThemeProvider value={{ themeMode, lightmode, darkmode }}>
      <Header />
      <main id="main-content" className="flex-1 relative ">
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  ) :
  null;
}

export default App

