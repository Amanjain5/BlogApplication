import "./App.css";
import Navbar from "./App/navbar/Navbar";
import Login from "./App/components/auth/Login";
import Signup from "./App/components/auth/Signup";
import Page404error from './App/page404/Page404error';
import Bloglist from "./App/components/blog/Bloglist";
import BlogDetails from "./App/components/blog/Blogdetail";
import ResetPassword from "./App/components/auth/Resetpassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Forgotpassword from "./App/components/auth/Forgotpassword";
import Post from "./App/components/blog/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/navbar" element={<Navbar />}></Route>
        <Route path="/mypost" element={<Post />}></Route>
        <Route path="/*" element={<Page404error />}></Route>
        <Route path="/bloglist" element={<Bloglist />}></Route>
        <Route path="/blogdetail/:id" element={<BlogDetails />}></Route>
        <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
        <Route path="/api/user/reset/:id/:token" element={<ResetPassword />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
