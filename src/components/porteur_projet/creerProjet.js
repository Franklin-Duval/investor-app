import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../assets/css/header.css'
import Navigation from '../layouts/navigation_bar'

export class CreerProjet extends Component {
    
    state = {
        nom: "",
        description: "",
        technologie: "",
        montant: "",
        duree: "",
        image: undefined,
        document: undefined
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
                    <p className="home-title">Formulaire</p>

                    <form style={{padding: 50}}>
                        <div className="form-group">
                            <label style={styles.label}>Nom du projet</label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Nom du Projet"
                                value={this.state.nom}
                                style={styles.textInput}
                                onChange={(event) => {
                                    this.setState({nom: event.target.value})
                                }}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label style={styles.label}>Description</label>
                            <textarea 
                                type="text" 
                                className="form-control"
                                rows={7}
                                placeholder="Description brève ou objectif du Projet"
                                value={this.state.description}
                                style={styles.textInput}
                                onChange={(event) => {
                                    this.setState({description: event.target.value})
                                }}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label style={styles.label}>Technologie</label>
                            <select className="form-control" >
                                <option>testin</option>
                                <option>test</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label style={styles.label}>Montant</label>
                            <input 
                                type="number" 
                                className="form-control"
                                placeholder="Montant"
                                value={this.state.montant}
                                style={styles.textInput}
                                onChange={(event) => {
                                    this.setState({montant: event.target.value})
                                }}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label style={styles.label}>Durée (mois)</label>
                            <input 
                                type="number" 
                                className="form-control"
                                placeholder="Durée (mois)"
                                value={this.state.duree}
                                style={styles.textInput}
                                onChange={(event) => {
                                    this.setState({duree: event.target.value})
                                }}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label style={styles.label}>Document du Projet</label>
                            <input 
                                type="file" 
                                className="form-control-file"
                                value={this.state.document}
                                style={styles.textInput}
                                onChange={(event) => {
                                    this.setState({nom: event.target.value})
                                }}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label style={styles.label}>Image descriptif du Projet</label>
                            <input 
                                type="file" 
                                className="form-control-file"
                                value={this.state.image}
                                style={styles.textInput}
                                onChange={(event) => {
                                    console.log(event.target.value)
                                    this.setState({nom: event.target.value})
                                }}
                            />
                        </div>
                        
                        <div style={{marginTop: 30, display: 'flex', justifyContent: 'center'}}>
                            <button type="submit" className="button" >Valider</button>
                        </div>
                                                
                    </form>
                </div>
            </div>
        )
    }
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

    textInput:{
        fontFamily: 'Tauri',
        fontSize: 16,
        
    },

    label:{
        fontFamily: 'Montserrat',
        fontSize: 16,
    }
}

export default CreerProjet
