// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Navbar from "./Components/Navbar/Navbar"
import { Box, Container, makeStyles} from "@material-ui/core"
import Hero from "./Components/Hero/Hero";
import Auth from "./Components/Auth/Auth";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Dashboard/Dashboard";
import User from "./Components/User/User";
import Account from "./Components/Account/Account";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#E6F0FF",
    minHeight: "100vh",
    padding: 0
  }
});

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
    <Box className={classes.root}>
      <Container>
        <Navbar />
        <ToastContainer autoClose={2000} />
          <Routes>
            <Route path="/" exact element={<Hero />} />
            <Route path="/auth" exact element={<Auth />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/users/:username" exact element={<User />} />
            <Route path="/account" exact element={<Account />} />
          </Routes>
      </Container>
    </Box>
    </BrowserRouter>
  )
}

export default App