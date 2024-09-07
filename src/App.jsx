import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import background from "../Images/blog2.jpg";
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
    <div
      className="min-h-screen flex flex-wrap content-between "
      // style={{
      //   backgroundImage: `url('${background}')`, // Ensure this path points correctly to your image
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   minHeight: "100vh", // Ensures the div covers the entire viewport height
      // }}
    >
      <div className="min-h-screen flex-col w-full flex">
        <ThemeProvider value={{ themeMode, lightmode, darkmode }}>
          <Header />
          <main className="flex-grow">
            <Outlet/>
          </main>
          <Footer />
        </ThemeProvider>
      </div>
    </div>
  ) : null;
}

export default App
