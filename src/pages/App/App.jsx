import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getUser } from "../../utils/users-service";

import NavBar from "../../components/NavBar/NavBar";
import LoginPage from "../AuthPage/LoginPage";
import SignUpPage from "../AuthPage/SignUpPage";
import LandingPage from "../LandingPage/LandingPage";
import Dashboard from '../DashboardPage/Dashboard';
import JobApplicationForm from '../JobApplicationForm/JobApplicationForm';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import CompanyCreationForm from '../CompanyCreationForm/CompanyCreationForm';
import JobApplicationDetails from '../JobApplicationDetails/JobApplicationDetails';
import InterviewCreationForm from '../InterviewCreationForm/InterviewCreationForm';
import OfferCreationForm from '../OfferCreationForm/OfferCreationForm';

export default function App() {
  const [ user, setUser ] = useState(getUser());

  return (
      <main className="App">
        <div className='container-fluid justify-content-center' style={{width: "70%"}}>
        <NavBar user={user} setUser={setUser} />
        <Routes>
        {user ? (
          <>
            {user.isAdmin ? (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/create-company" element={<CompanyCreationForm />} />
              </>
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard setUser={setUser} user={user} />} />
                <Route path="/job-application" element={<JobApplicationForm setUser={setUser} user={user} />} />
                <Route path="/job-application-details/:id" element={<JobApplicationDetails setUser={setUser} user={user} />} />
                <Route path="job-application-details/:id/create-interview" element={<InterviewCreationForm setUser={setUser} user={user} />} />
                <Route path="job-application-details/:id/create-offer" element={<OfferCreationForm setUser={setUser} user={user} />} />
              </>
          )}
          </>
          ) : (
          <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/sign-up" element={<SignUpPage user={user} setUser={setUser}/>} />
              <Route path="/login" element={<LoginPage setUser={setUser}/>} />
          </>
        )}
        </Routes>
        <hr/>
        <footer className="text-center text-dark text-opacity-50" style={{ marginTop: "10px"}}>
          <small>
            BearlyHired&trade; (est 2023)
            <br />A project by{" "}
            <a
						className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
						href="https://github.com/darylcty">
						darylcty
            </a>
          </small>
        </footer>
        </div>
      </main>
  );
}
