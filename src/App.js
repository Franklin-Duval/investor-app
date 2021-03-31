import './App.css';
import 'antd/dist/antd.css'

import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Home from './components/layouts/home'
import Login from './components/layouts/login'
import Register from './components/layouts/register'

/* import AdminRoutes from './components/admin/routes'
import TechnicienRoutes from './components/technicien/routes'
import UserRoutes from './components/user/routes' */


function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				
				{/* <Route path="/admin" render={() => <AdminRoutes/>} />
				<Route path="/user" render={() => <UserRoutes/>} />
				<Route path="/technicien" render={() => <TechnicienRoutes/>} /> */}
				
			</Switch>
		</BrowserRouter>
	);
}

export default App;
