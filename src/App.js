import './App.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import routes from "./configs/routes";
import {Provider} from "react-redux";
import store  from "./configs/store"
import Nav from './components/Navbar'
import Jumbotron from './components/JumbotronComponent';

function App() {
    return (
        <Provider store={store}>
        <Router>
          <Nav/>
            <Switch>
                {routes.map((route, index) =>
                    <Route key={index} path={route.path} exact>
                        {route.component}
                    </Route>)}
            </Switch>
        </Router>
        </Provider>
    );
}

export default App;
