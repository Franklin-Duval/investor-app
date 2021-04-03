
import { Route, } from 'react-router-dom'

import Projet from './all_project'
import Detail from './detail_projet'

const Routes = () => {
    return(
        <>
            <Route exact path="/investisseur/acceuil" component={Projet} />
            <Route exact path="/investisseur/projet" component={Detail} />
        </>
    )
}

export default Routes