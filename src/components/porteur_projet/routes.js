
import { Route, } from 'react-router-dom'

import Home from './acceuil'
import CreerProjet from './creerProjet'
import CreerTache from './creerTache'
import Detail from './detail_projet'

const Routes = () => {
    return(
        <>
            <Route exact path="/porteur/acceuil" component={Home} />
            <Route exact path="/porteur/creer-projet" component={CreerProjet} />
            <Route exact path="/porteur/creer-tache" component={CreerTache} />
            <Route exact path="/porteur/detail-projet" component={Detail} />
        </>
    )
}

export default Routes