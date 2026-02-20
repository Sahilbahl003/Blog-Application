import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import LogoutModal from "./logoutModal";

const Navbar = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    else setUser(null);
  }, [location.pathname]);

  const confirmLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
  
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className='fixed top-0 left-0 w-full flex justify-between p-5 bg-black z-50'>
      <h1 className='text-3xl text-white cursor-pointer' onClick={() => navigate("/")}>Blog App</h1>
      <div className='flex gap-4 justify-center items-center text-xl text-white '>
        <div className='cursor-pointer hover:text-blue-300' onClick={() => navigate("/")}>Home</div>
        <div className='cursor-pointer hover:text-blue-300' onClick={() => navigate("/allblogs")}>All Blogs</div>
        {token && <div className='cursor-pointer hover:text-blue-300' onClick={() => navigate("/myblogs")}>My Blogs</div>}
        <div className='flex justify-center items-center cursor-pointer hover:text-blue-300' onClick={() => navigate("/write")}>Write</div>
        <div className='cursor-pointer hover:text-blue-300' onClick={() => navigate("/contact")}>Contact Us</div>

        {!token && (
          <button className='bg-blue-500 hover:bg-blue-600 text-white w-24 px-2 py-2 rounded-sm font-[16px] cursor-pointer' onClick={() => navigate("/register")}>
            Register
          </button>
        )}

        {!token ? (
          <button className='bg-blue-500 hover:bg-blue-600 text-white w-20 px-2 py-2 rounded-sm font-[16px] cursor-pointer' onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <button
            className='bg-blue-500 cursor-pointer hover:bg-blue-600 text-white w-20 px-2 py-2 rounded-sm font-[16px]'
           onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </button>
        )}

        {token && user && (
          <div onClick={() => navigate("/profile")} className="cursor-pointer">
            {user.profileImage ? (
              <img src={user.profileImage} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black">
                {user.name?.[0]}
              </div>
            )}
          </div>
        )}
      </div>
      {showLogoutModal && (
              <LogoutModal
                onCancel={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
              />
            )}
    </div>
  )
}

export default Navbar;
