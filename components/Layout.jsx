
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Suspense } from "react";
import ForgotPassModal from "./Builder/ForgotPassModal";
import SignInModal from "./Builder/SignInModal";
import SignUpModal from "./Builder/SignUpModal";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />

      <Suspense fallback={<div>loading</div>}>
        <SignInModal />
        <SignUpModal />
        <ForgotPassModal />
      </Suspense>
      <ToastContainer />
    </>
  );
}
