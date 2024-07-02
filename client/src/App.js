import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import PageNotFound from "./Pages/NotFoundPage";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Homepage from "./Pages/Homepage";
import PublicRoute from "./components/routes/PublicRoute";
import ApplyPandith from "./Pages/ApplyPandith";
import Notification from "./Pages/Notification";
import Users from "./Pages/admin/Users";
import Pandiths from "./Pages/admin/Pandiths";
import PandithProfile from "./Pages/pandith/PandithProfile";
import BookingPage from "./Pages/BookingPage";
import Poojas from "./Pages/Poojas";
import PandithPoojas from "./Pages/pandith/PandithPoojas";
import UserProfile from "./Pages/UserProfile";
import DonationForm from "./Pages/DonationForm";
import AboutPage from "./Pages/AboutPage";
import Map from "./components/Map";
import Main from "./main/Main";
import DharshanPage from './Pages/DharshanPage';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Spinner />
      <Routes>
        {/***** PROTECTED ROUTES *******/}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-pandith"
          element={
            <ProtectedRoute>
              <ApplyPandith />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pandiths"
          element={
            <ProtectedRoute>
              <Pandiths />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pandith/profile/:id"
          element={
            <ProtectedRoute>
              <PandithProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pandith/poojas"
          element={
            <ProtectedRoute>
              <PandithPoojas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pandith/book-pooja/:pandithId"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/poojas"
          element={
            <ProtectedRoute>
              <Poojas />
            </ProtectedRoute>
          }
        />

       <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <DonationForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
          <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />

      <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Map />
            </ProtectedRoute>
          }
        />
        <Route
        path="/main"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />

    <Route
        path="/dharshan"
        element={
          <ProtectedRoute>
            <DharshanPage />
          </ProtectedRoute>
        }
      />
        {/******* PUBLIC ROUTES ******/}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
