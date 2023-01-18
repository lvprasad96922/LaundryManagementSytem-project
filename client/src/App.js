import { Route, Switch, Redirect } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Home from "./components/Home";
import Profile from "./components/Profile"
import NotFound from "./components/NotFound";
// import ProtectedRoute from './components/ProtectedRoute'

import "./App.css";

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/register" component={RegistrationForm} />
    <Route exact path="/forgot-password" component={ForgotPasswordForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/profile" component={Profile} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
);

export default App;
