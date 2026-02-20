import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Home from './pages/Home';
import SignUp from './components/signUp';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import { ToastContainer} from 'react-toastify';
import AllBlogs from './pages/AllBlogs';
import Write from "./pages/Write";
import ProtectedRoutes from "./components/protectedRoutes";
import Blog from "./pages/Blog";
import MyBlogs from "./pages/MyBlogs";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import EditBlog from "./pages/EditBlog";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
  <BrowserRouter>
      <Navbar />
        <div className="pt-[1px]">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/allblogs" element={<AllBlogs/>} />
            <Route path="/allblogs/:id" element={<Blog/>} />
            <Route path="/myblogs" element={<ProtectedRoutes><MyBlogs/></ProtectedRoutes>}/>
            <Route path="/myblogs/:id" element={<Blog/>}/>
            <Route path="/write" element={<ProtectedRoutes><Write/></ProtectedRoutes>} />
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/editblog/:id" element={<EditBlog/>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </div>
      <Footer/>
    <ToastContainer/>
 </BrowserRouter>
  )
}

export default App
