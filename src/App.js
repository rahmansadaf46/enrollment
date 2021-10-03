import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import Login from './components/Login/Login';
import StudentsInfo from './components/StudentsInfo/StudentsInfo/StudentsInfo';
import PrivateRoute from './components/Login/PrivateRoute';
import EnrollStudent from './components/StudentsInfo/EnrollStudent/EnrollStudent';
import StudentProfile from './components/StudentsInfo/StudentProfile/StudentProfile';
import NoMatch from './components/NotAccess/NoMatch/NoMatch';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("user")) || {});

  }, []);


  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" >
            <StudentsInfo></StudentsInfo>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/student/allStudent">
            <StudentsInfo></StudentsInfo>
          </Route>
          <Route path="/students/enrollment">
            <EnrollStudent />
          </Route>
          <Route path="/students/profile/:department/:roll">
            <StudentProfile></StudentProfile>
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
