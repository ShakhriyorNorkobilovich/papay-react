import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import '../css/App.css';
import '../css/navbar.css';
import '../css/footer.css';
import { BrowserRouter as Router, Switch, Route, Link,} from "react-router-dom";

import { RestaurantPage } from './screens/RestaurantPage';
import { CommunityPage } from './screens/CommunityPage';
import { OrdersPage } from './screens/OrdersPage';
import { MemberPage } from './screens/MembersPage';
import { HelpPage } from './screens/HelpPage';
import { LoginPage } from './screens/LoginPage';
import { HomePage } from './screens/HomePage';
import { NavbarHome } from './components/header';
import { NavbarRestaurant } from './components/header/restaurant';
import { NavbarOthers } from './components/header/others';
import { Footer } from './components/footer';
import Car from './screens/testCar';
import AuthenticationModal from './components/auth';
import { Member } from '../types/user';
import { serverApi } from '../lib/config';
import { sweetFailureProvider, sweetTopSmallSuccessAlert } from '../lib/sweetAlert';
import { Definer } from '../lib/Definer';
import MemberApiService from './apiServices/memberApiService';
import "../app/apiServices/verify";

function App() {
   /** INITIALIZATIONS */

   const [verifiedMemberdata, setVerifiedMemberData] = useState <Member | null>(null);

  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState <null | HTMLElement> (null);

  useEffect(() => {
    console.log("=== useEffect: App ===");
    const mamberDataJson: any = localStorage.getItem("member_data") 
    ? localStorage.getItem("member_data") 
    : null;
    const member_data = mamberDataJson ? JSON.parse(mamberDataJson) : null;
    if (member_data) {
      member_data.mb_image = member_data.mb_image 
      ? `${serverApi}/${member_data.mb_image}` 
      : "/auth/default_user.svg";
      setVerifiedMemberData(member_data);
    }
  }, [signUpOpen, loginOpen]);

    /** HANDLERS */

    const handleSignUpOpen = () => setSignUpOpen(true);
    const handleSignUpClose = () => setSignUpOpen(false);
    const handleLoginOpen = () => setLoginOpen(true);
    const handleLoginClose = () => setLoginOpen(false);
    const open = Boolean(anchorEl);
    
    const handleLogOutClick = (event: React.MouseEvent<HTMLElement>) =>{
        setAnchorEl(event.currentTarget);
    }
    
    
    const handleCloseLogOut = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
    }

    const handleLogOutRequest = async () => {
      try {
        const memberApiService = new MemberApiService();
        await memberApiService.logOutRequest();
        await sweetTopSmallSuccessAlert("success", 700, true);
      } catch (err: any) {
        console.log(err);
        sweetFailureProvider(Definer.general_err1);
      }
    };
  
  return (
    <Router>
      {main_path == "/" ? (
      <NavbarHome 
      open={open}
      anchorEl={anchorEl}
      handleLogOutClick={handleLogOutClick}
      handleCloseLogOut={handleCloseLogOut}
      handleLogOutRequest={handleLogOutRequest}

      setPath={setPath}
      handleLoginOpen={handleLoginOpen}
      handleSignUpOpen={handleSignUpOpen}
      verifiedMemberdata ={verifiedMemberdata}
      />
      ) : main_path.includes('/restaurant') ? (

      <NavbarRestaurant 
      open={open}
      anchorEl={anchorEl}
      handleLogOutClick={handleLogOutClick}
      handleCloseLogOut={handleCloseLogOut}
      handleLogOutRequest={handleLogOutRequest}

      setPath={setPath}
      handleLoginOpen={handleLoginOpen}
      handleSignUpOpen={handleSignUpOpen}
      verifiedMemberdata ={verifiedMemberdata}
      />
      ) : (
      <NavbarOthers 
      open={open}
      anchorEl={anchorEl}
      handleLogOutClick={handleLogOutClick}
      handleCloseLogOut={handleCloseLogOut}
      handleLogOutRequest={handleLogOutRequest}

      setPath={setPath}
      handleLoginOpen={handleLoginOpen}
      handleSignUpOpen={handleSignUpOpen}
      verifiedMemberdata ={verifiedMemberdata}
      />
      )}

      <Switch>
        <Route path="/restaurant">
          <RestaurantPage />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <MemberPage />
        </Route>
        <Route path="/help">
          <HelpPage />
          </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
            <HomePage />
        </Route>
      </Switch>

      <Footer/>


      <AuthenticationModal
        loginOpen={loginOpen}
        handleLoginOpen={handleLoginOpen}
        handleLoginClose={handleLoginClose}
        signUpOpen={signUpOpen}
        handleSignUpOpen={handleSignUpOpen}
        handleSignUpClose={handleSignUpClose}
      />


  </Router>
  );
};




export default App;



