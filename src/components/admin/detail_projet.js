import React, { Component } from 'react'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import { BeatLoader } from 'react-spinners'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

import Navigation from '../layouts/navigation_bar'
import '../../assets/css/pages.css'
import { connect } from 'react-redux'
import { API_URL } from '../layouts/constants'
import { Redirect } from 'react-router'

class Detail_projet extends Component {

    state = {
        projet: this.props.location.state,
        finish: false,
        taches: [],
        isLoading: true,
        showModal: false,
        image: null
    }

    componentDidMount(){
        this.fetchTache()
    }

    fetchTache = () => {
        fetch(API_URL + 'get-taches/' + this.state.projet.id + '/')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.success){
                this.setState({
                    taches: responseJson.data,
                    isLoading: false
                })
            }
        })
    }

    validerProjet = () => {
        fetch(API_URL + 'validate-project/' + this.state.projet.id + '/')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.success){
                this.setState({finish: true})
            }
        })
    }

    rejeterProjet = () => {
        fetch(API_URL + 'rejeter-project/' + this.state.projet.id + '/')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.success){
                this.setState({finish: true})
            }
        })
    }


    render() {
        return (
            this.state.finish
            ?
            <Redirect to="/admin/acceuil" />
            :
            <div>
                <Navigation />

                <div className="top-header">
                    <div style={styles.headBox}>
                        <p style={styles.headTitle}>Adminstrateur de la plateforme.</p>

                    </div>
                </div>

                <div className="container" style={{paddingBottom: 50}}>
                    <p className="home-title">Détail du Projet</p>

                    <h1 className="text-center">{this.state.projet.nom} </h1>

                    <hr/>
                    
                    <div className="box">
                        <div className="row" style={{marginTop: 30}}>
                            <div className="col-md-4" style={{marginBottom: 20}}>
                                <img src={this.state.projet.image} alt="..." height={300} width={330} />
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <button type="submit" className="detail-button" onClick={() => this.rejeterProjet()} >Rejeter le Projet</button>
                                    <button type="submit" className="button" onClick={() => this.validerProjet()} >Valider le Projet</button>
                                    <div style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: 10}}>
                                        <a href={this.state.projet.document} className="detail-button2">Télécharger le document</a>
                                    </div>
                                    
                                </div>
                                <div style={{marginLeft: -15}}>
                                    <p style={{fontFamily: 'Montserrat'}}>Autheur : <span style={{fontWeight: 'bold', fontSize: 25}}>{this.state.projet.porteur} </span> </p>
                                    <p style={{fontFamily: 'Montserrat'}}>{this.state.projet.description} </p>
                                </div>
                                
                            </div>
                        </div>

                        <p style={styles.text}>Statut : <span style={{
                                                    color: this.state.projet.statut === "En attente de validation" ? 'blueviolet':
                                                    this.state.projet.statut === "En attente de financement" ? '#ffa000' :
                                                    this.state.projet.statut === "Financé" ? 'green' : 'red',

                                                    fontWeight: 'bold',
                                                }}> {this.state.projet.statut}</span> </p>

                        <p style={styles.text}>Technologie : {this.state.projet.technologie} </p>
                        <p style={styles.text}>Durée : {this.state.projet.duree} mois </p>
                        <p style={styles.text}>Montant : {this.state.projet.montant} FCFA</p>
                        
                        <hr/>

                        <p style={styles.textTache}>Taches</p>

                        {
                            this.state.isLoading
                            ?
                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                <BeatLoader loading={this.state.isLoading} size={20} color="#66bb6a" />
                            </div>
                            :
                            <ToolkitProvider
                                keyField="id"
                                data={this.state.taches}
                                columns={this.columns}
                                search
                            >
                                {(props) => (
                                    <div>
                                        <BootstrapTable
                                            hover
                                            bootstrap4
                                            {...props.baseProps}
                                            rowEvents={this.rowEvent}
                                            noDataIndication="Aucune tache n'est enregisté pour l'instant"
                                            bordered={false}
                                            rowStyle={{}}
                                            
                                        />
                                    </div>
                                )}
                            </ToolkitProvider>
                        }

                    </div>
                    
                </div>
                
                <Modal isOpen={this.state.showModal} toggle={() => this.setState({showModal: !this.state.showModal})}>
                    <ModalHeader>Image</ModalHeader>
                    <ModalBody>
                        {
                            this.state.image
                            ?
                            <img src={this.state.image} className="card-img-top" alt="..." height={300} />
                            :
                            <p>Aucune image de cette tache n'est disponible</p>
                        }
                        
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.setState({showModal: !this.state.showModal})}>Fermer</Button>
                    </ModalFooter>
                </Modal>

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

    rowEvent = {
        onClick: (e, row, rowIndex) => {
            this.setState({
                image: row.image,
                showModal: true
            })    
        }
    }
    
    finFormatter = (cell, row) => {
        if (row.fin) {
            return(
                <span>
                    {cell}
                </span>
            )
        }
        else {
            return(
                <span>
                    Non défini
                </span>
            )
        }
    }

    debutFormatter = (cell, row) => {
        if (row.debut) {
            return(
                <span>
                    {cell}
                </span>
            )
        }
        else {
            return(
                <span>
                    Non défini
                </span>
            )
        }
    }

    etatFormatter = (cell, row) => {
        if (row.statut === "En cours"){
            return(
                <span>
                    <strong style={{color: 'green', fontSize: 18}}>{cell}</strong>
                </span>
            )
        }
        else if (row.statut === "Terminé"){
            return(
                <span>
                    <strong style={{color: 'red', fontSize: 18}}>{cell}</strong>
                </span>
            )
        }
        else{
            return(
                <span style={{color: '#03a9f4', fontSize: 18}}>
                    {cell}
                </span>
            )
        }
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
            dataField: 'duree',
            text: 'Durée (jours)',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'statut',
            text: 'Statut',
            sort: true,
            formatter: this.etatFormatter,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'avancement',
            text: 'Etat d\'avancement (%)',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'debut',
            text: 'Debut',
            sort: true,
            formatter: this.debutFormatter,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'fin',
            text: 'Fin',
            sort: true,
            formatter: this.finFormatter,
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
        textAlign: 'center',
        color: 'white'
    },

    text:{
        fontFamily: 'Montserrat',
        fontSize: 18
    },

    textTache:{
        fontFamily: 'Tauri',
        fontSize: 22,
        textAlign: 'center',
        textDecoration: 'underline'
    },
}


const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(Detail_projet)
