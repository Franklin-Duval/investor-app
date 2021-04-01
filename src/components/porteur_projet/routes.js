
import { Route, } from 'react-router-dom'

import Home from './acceuil'
import CreerProjet from './creerProjet'

const Routes = () => {
    return(
        <>
            <Route exact path="/porteur/acceuil" component={Home} />
            <Route exact path="/porteur/creer-projet" component={CreerProjet} />
        </>
    )
}

export default Routes