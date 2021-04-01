
import { Route, } from 'react-router-dom'

import Projet from './all_project'

const Routes = () => {
    return(
        <>
            <Route exact path="/investiseur/acceuil" component={Projet} />
        </>
    )
}

export default Routes