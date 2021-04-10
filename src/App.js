import './App.css';
import 'antd/dist/antd.css'

import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './components/layouts/home'
import Login from './components/layouts/login'
import Register from './components/layouts/register'
import Unauthorized from './components/layouts/unauthorized'

import PorteurRoutes from './components/porteur_projet/routes'
import AdminRoutes from './components/admin/routes'
import InvestisseurRoutes from './components/investisseur/routes'


function App(props) {
	console.log(props.path)
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				
				{
					props.user.authentifie
					?

						props.user.userType === "Admin" ? <Route path="/admin" render={() => <AdminRoutes/>} /> :

						props.user.userType === "Porteur Projet" ? <Route path="/porteur" render={() => <PorteurRoutes/>} /> :

						props.user.userType === "Investisseur" ? <Route path="/investisseur" render={() => <InvestisseurRoutes/>} /> : <Route component={Unauthorized} />
					
					:
					<Route component={Unauthorized} />
				}
				
			</Switch>
		</BrowserRouter>
	);
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(App)
