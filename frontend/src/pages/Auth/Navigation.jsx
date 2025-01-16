import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="border-2 border-gray-600 fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 w-[30%] p-3 rounded-xl shadow-lg">
      <section className="flex justify-between items-center text-sm">
        {/* Section 1 */}
        {!isAuthPage && (
          <div className="flex justify-center items-center gap-6">
            <Link
              to="/"
              className="flex items-center text-white transition-transform transform hover:scale-110 hover:text-blue-400"
            >
              <AiOutlineHome className="mr-2" size={22} />
              <span className="hidden md:inline">Home</span>
            </Link>

            <Link
              to="/movies"
              className="flex items-center text-white transition-transform transform hover:scale-110 hover:text-blue-400"
            >
              <MdOutlineLocalMovies className="mr-2" size={22} />
              <span className="hidden md:inline">Movie</span>
            </Link>
          </div>
        )}

        {/* Section 2 */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-white text-lg font-medium"
          >
            {userInfo ? (
              <span className="mr-1">{userInfo.username}</span>
            ) : null}

            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transform transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul
              className={`absolute right-0 mt-2 w-40 bg-gray-700 text-white rounded-lg shadow-md transition-all ${userInfo.isAdmin ? "-top-28" : "-top-24"}`}
            >
              {userInfo.isAdmin && (
                <li>
                  <Link
                    to="/admin/movies/dashboard"
                    className="block px-3 py-2 hover:bg-gray-600"
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/profile"
                  className="block px-3 py-2 hover:bg-gray-600"
                >
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-3 py-2 text-left hover:bg-gray-600"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!userInfo && (
            <ul className="flex gap-4">
              <li>
                <Link
                  to="/login"
                  className="flex items-center text-white transition-transform transform hover:scale-110 hover:text-blue-400"
                >
                  <AiOutlineLogin className="mr-2" size={22} />
                  <span className="hidden md:inline">Login</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center text-white transition-transform transform hover:scale-110 hover:text-blue-400"
                >
                  <AiOutlineUserAdd size={22} />
                  <span className="hidden md:inline">Register</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
