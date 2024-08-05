import Navbar from "./components/Navbar";
import Home from './components/Home'
import { Discuss } from './components/Discuss'
import About from './components/About'
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PostState from "./context/PostState";
import AuthState from "./context/AuthState";
import Alert from "./assets/Alert";
import useAlert from "./hooks/useAlert";
import RouterGuard from "./middleware/RouteGuard";
import ProfilePage from "./components/ProfilePage";
import Posts from "./components/Posts";
import Anonymous from './middleware/Anonymous'
import PostPage from "./components/PostPage";

function App() {
  const { show } = useAlert()
  console.log("i am running from app component")
  return (

    <AuthState>
      <PostState>
        <BrowserRouter>
          <Navbar />
          {show && <Alert />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<RouterGuard />}>
              <Route path="/createpost" element={<Discuss />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route element={<Anonymous />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/post/:postID" element={<PostPage />} />
          </Routes>

        </BrowserRouter>
      </PostState>
    </AuthState>

  );
}

export default App;