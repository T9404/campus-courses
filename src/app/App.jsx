import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../shared/components/header/Header";
import {ToastContainer} from "react-bootstrap";
import PrivateRoute from "../util/PrivateRoute";
import {Route, Routes} from "react-router-dom";
import Footer from "../shared/components/footer/Footer";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import RegistrationPage from "../pages/registrationPage/RegistrationPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";

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
