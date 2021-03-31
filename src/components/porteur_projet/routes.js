
import { Route, } from 'react-router-dom'

import Statistics from './statistics'
import Dashboard from './Dashboard'
import Technicien from './Technicien'
import NouveauTicket from './NouveauTicket'
import TicketAttente from './TicketAttente'
import TicketResolu from './TicketResolu'
import TicketRelancer from './TicketRelancer'

const Routes = () => {
    return(
        <>
            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route exact path="/admin/statistics" component={Statistics} />
            <Route exact path="/admin/technicien" component={Technicien} />
            <Route exact path="/admin/new-ticket" component={NouveauTicket} />
            <Route exact path="/admin/ticket-en-attente" component={TicketAttente} />
            <Route exact path="/admin/ticket-resolu" component={TicketResolu} />
            <Route exact path="/admin/ticket-relancer" component={TicketRelancer} />
        </>
    )
}

export default Routes