import './App.css';
import 'antd/dist/antd.css'

import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Home from './components/layouts/home'
import Login from './components/layouts/login'
import Register from './components/layouts/register'

import PorteurRoutes from './components/porteur_projet/routes'
import AdminRoutes from './components/admin/routes'
import InvestisseurRoutes from './components/investisseur/routes'


function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				
				<Route path="/porteur" render={() => <PorteurRoutes/>} />
				<Route path="/admin" render={() => <AdminRoutes/>} />
				<Route path="/investisseur" render={() => <InvestisseurRoutes/>} />
				
			</Switch>
		</BrowserRouter>
	);
}

export default App;
