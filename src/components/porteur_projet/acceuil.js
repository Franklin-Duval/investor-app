import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ToolkitProvider, { Search, } from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'

import '../../assets/css/header.css'
import Navigation from '../layouts/navigation_bar'

class Acceuil extends Component {

    state = {
        projets: []
    }
    
    render() {
        const { SearchBar } = Search
        return (
            <div>
                <Navigation />
                <div className="top-header">
                    <div style={styles.headBox}>
                        <p style={styles.headTitle}>Avez-vous une idée de projet ?</p>
                        <p style={styles.headSubtitle}>Devenez vous aussi un porteur de projet innovant afin d'obtenir des financements.</p>

                        <Link className="head-button" to="/porteur/creer-projet">Créer un Projet</Link>
                    </div>
                </div>

                <div className="container">
                    <p className="home-title">Mes Projets</p>

                    <ToolkitProvider
                        keyField="id"
                        data={this.state.projets}
                        columns={this.columns}
                        search
                    >
                        {(props) => (
                            <div>
                                <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end', marginRight: 30}}>
                                    
                                    <SearchBar {...props.searchProps} style={{width: 350, height: 50, fontFamily: 'Tauri'}} placeholder="Rechercher" />
                                </div>
                                <hr/>
                                <BootstrapTable
                                    hover
                                    bootstrap4
                                    {...props.baseProps}
                                    noDataIndication="Aucun projet n'est enregisté pour l'instant"
                                    bordered={false}
                                    rowStyle={{}}
                                    
                                />
                            </div>
                        )}
                    </ToolkitProvider>
                </div>
            </div>
        )
    }

    
    styles = {
        header:{
            backgroundColor: '#66bb6a',
            color: '#fff',
            fontFamily: 'Montserrat',
            fontSize: 16,
            minWidth: 150
        },

        headerSort:{
            backgroundColor: '#e0e0e0',

        },
    }

    columns = [
        {
            dataField: 'nom',
            text: 'Nom',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'date_creation',
            text: 'Date de création',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'technologie',
            text: 'Technologie',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'montant',
            text: 'Montant',
            sort: true,
            formatter: this.priorityFormatter,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'duree',
            text: 'Durée (mois)',
            sort: true,
            formatter: this.etatFormatter,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'statut',
            text: 'Statut',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },
    ]
}

const styles = {

    headBox:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 700,
        padding: 20
    },

    headTitle:{
        fontFamily: 'Montserrat',
        fontSize: 45,
        textAlign: 'center'
    },

    headSubtitle:{
        fontFamily: 'Montserrat',
        fontSize: 30,
        textAlign: 'center'
    },
}

export default Acceuil
