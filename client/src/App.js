import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";

import setAuthToken from "./utilities/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import store from './store';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import PrivateRoute from "./components/private-route/PrivateRoute";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

// user token configuration & expiry check
if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);

    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000; // milliseconds

    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />

                        <Switch>
                            <PrivateRoute exact path="/posts" component={Posts} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/posts/:id" component={Post} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;