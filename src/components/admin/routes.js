
import { Route, } from 'react-router-dom'

import Projet from './all_project'
import Detail from './detail_projet'

const Routes = () => {
    return(
        <>
            <Route exact path="/admin/acceuil" component={Projet} />
            <Route exact path="/admin/projet" component={Detail} />
        </>
    )
}

export default Routes