import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import { BeatLoader } from 'react-spinners'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

import { API_URL } from '../layouts/constants'
import Navigation from '../layouts/navigation_bar'

class CreerTache extends Component {

    state = {
        projet: this.props.location.state,
        taches: [],
        isLoading: true,
        nom: "",
        duree: 0
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

    submitForm = (event) => {
        event.preventDefault()
        this.setState({isLoading: true})

        fetch(API_URL + 'tache/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nom: this.state.nom,
                projet: this.state.projet.url,
                duree: this.state.duree
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({isLoading: false})
            console.log(responseJson)
            this.fetchTache()
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    render() {
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
                    <p className="home-title">Création des Taches</p>

                    {
                        this.state.isLoading
                        ?
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingBottom: 50}}>
                            <BeatLoader loading={this.state.isLoading} size={20} color="#66bb6a" />
                        </div>
                        :
                        <div>
                            <p>Renseigner les taches ou étapes de votre projet</p>
                            <p style={styles.exemple}>Exemple : "Mise en place du système électrique ;  durée : 5 jours</p>

                            <form style={{padding: 50}} onSubmit={(event) => this.submitForm(event)} >
                                <div className="form-group">
                                    <label style={styles.label}>Nom</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        placeholder="Nom de la tache"
                                        value={this.state.nom}
                                        style={styles.textInput}
                                        required
                                        onChange={(event) => {
                                            this.setState({nom: event.target.value})
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={styles.label}>Durée de la tache (jours)</label>
                                    <input 
                                        type="number" 
                                        className="form-control"
                                        placeholder="Durée"
                                        value={this.state.duree}
                                        style={styles.textInput}
                                        required
                                        onChange={(event) => {
                                            this.setState({duree: event.target.value})
                                        }}
                                    />
                                </div>

                                <div style={{marginTop: 30, display: 'flex', justifyContent: 'center'}}>
                                    <button type="submit" className="button" >Valider</button>
                                </div>

                            </form>

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

                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingBottom: 50}}>
                                <Link to="/porteur/acceuil" className="terminer" >Terminer</Link>
                            </div>

                        </div>
                                                
                    }
                    
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

    headSubtitle:{
        fontFamily: 'Montserrat',
        fontSize: 30,
        textAlign: 'center',
        color: 'white'
    },

    textInput:{
        fontFamily: 'Tauri',
        fontSize: 16,
        
    },

    label:{
        fontFamily: 'Montserrat',
        fontSize: 16,
    },

    exemple:{
        fontStyle: 'italic',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#777',
        marginTop: -10
    }

}

export default CreerTache
