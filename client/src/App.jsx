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
import Friends from "./Components/Friends/Friends";
import NotFound from "./Components/NotFound/NotFound";

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
    <Box className={classes.root} style={{padding: 0}}>
      <Container maxWidth={false} style={{padding: 0}}>
          <Navbar />
        <ToastContainer autoClose={2000} />
        <Container>
          <Routes>
            <Route path="/" exact element={<Hero />} />
            <Route path="/auth" exact element={<Auth />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/users/:username" exact element={<User />} />
            <Route path="/account" exact element={<Account />} />
            <Route path="/friends" exact element={<Friends />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </Container>
      </Container>
    </Box>
    </BrowserRouter>
  )
}

export default App
