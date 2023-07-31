import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import PrivatePage from "./components/PrivatePage";
import LayoutComponent from "./components/LayoutComponent";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<LayoutComponent />}>
          <Route
            path="/profile"
            element={
              <PrivatePage>
                <ProfilePage />
              </PrivatePage>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
