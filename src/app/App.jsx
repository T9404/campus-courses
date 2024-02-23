import React from 'react';
import Header from "../shared/components/header/Header";
import PrivateRoute from "../util/PrivateRoute";
import {Route, Routes} from "react-router-dom";
import Footer from "../shared/components/footer/Footer";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import RegistrationPage from "../pages/registrationPage/RegistrationPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from "../pages/profilePage/ProfilePage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import GroupCoursePage from "../pages/groupCoursePage/GroupCoursePage";
import CourseListGroup from "../pages/courseListGroup/CourseListGroup";

function App() {
  return (
      <>
          <Header/>
          <div className="container">
              <ToastContainer />
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route element={<PrivateRoute/>}>
                      <Route path="/profile" element={<ProfilePage/>}/>
                      <Route path="/groups" element={<GroupCoursePage/>}/>
                      <Route path="/groups/:id" element={<CourseListGroup/>}/>
                  </Route>
                  <Route path="/registration" element={<RegistrationPage/>}/>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="*" element={<NotFoundPage/>}/>
              </Routes>
          </div>
          <Footer/>
      </>
  );
}

export default App;
