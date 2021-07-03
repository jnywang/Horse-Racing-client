import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Pages
import login from './pages/login';
import signup from './pages/signup';
import customer from './pages/customer';
import bet from './pages/bet';
import EmployeeManager from './pages/EmployeeManager';
import EmployeeRegular from './pages/EmployeeRegular';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

axios.defaults.baseURL = 'https://www.students.cs.ubc.ca/~schung53/horse-race-api';

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Switch>
            <Route exact path="/" component={login}/>
            <Route exact path="/signup" component={signup}/>
            <Route exact path = "/customer" component = {customer}/>
            <Route exact path = "/bet" component = {bet}/>
            <Route exact path = "/EmployeeManager" component = {EmployeeManager}/>
            <Route exact path = "/EmployeeRegular" component = {EmployeeRegular}/>
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
