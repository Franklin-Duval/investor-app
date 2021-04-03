import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

import { API_URL } from '../layouts/constants'
import '../../assets/css/header.css'
import Navigation from '../layouts/navigation_bar'

class All_project extends Component {

    state = {
        isLoading: true,
        projets: []
    }
    
    componentDidMount(){
        this.fetchProjet()
    }

    fetchProjet = () => {
        fetch(API_URL + 'all-investor-project/')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.success){
                this.setState({
                    projets: responseJson.data,
                    isLoading: false
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="top-header-investor">
                    <div style={styles.headBox}>
                        <p style={styles.headTitle}>Devenez vous aussi un investisseur d'un projet innovant.</p>

                    </div>
                </div>

                <div className="container" style={{paddingBottom: 50}}>
                    <p className="home-title">Liste des Projets</p>
                    
                    <div className="row">
                        {
                            this.state.isLoading
                            ?
                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                <BeatLoader loading={this.state.isLoading} size={20} color="#66bb6a" />
                            </div>
                            :
                            this.state.projets.length === 0
                            ?
                            <div>
                                <h4 style={{fontFamily: 'Montserrat'}} className="text-center" >Aucun Projet n'est enregistré pour l'instant</h4>
                            </div>
                            :
                            this.state.projets.map((item, index) => {
                                return (
                                    <div key={index} className="card" style={{width: '20rem', margin: 10}}>
                                        <img src={item.image} className="card-img-top" alt="..." height={200} />
                                        <div className="card-body">
                                            <h5 className="card-title" style={styles.text} >{item.nom} </h5>
                                            <p className="card-text" style={{minHeight: 100}} >{item.description.substring(0, 130)}... </p>
                                            <hr/>
                                            <span className="card-text" >Par : <span style={{fontWeight: 'bold', fontStyle: 'italic'}}>{item.porteur}</span> </span>
                                            
                                            <p className="card-text">Statut : 
                                                <span style={{
                                                    color: item.statut === "En attente de validation" ? 'blueviolet':
                                                    item.statut === "En attente de financement" ? '#ffa000' :
                                                    item.statut === "Financé" ? 'green' : 'red',

                                                    fontWeight: 'bold', fontStyle: 'italic'
                                                }}> {item.statut}</span>
                                            </p>

                                            <Link
                                                to={{
                                                    pathname: "/investisseur/projet",
                                                    state: item
                                                }}
                                                className="btn btn-primary"
                                            >
                                                Détails
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                            
                        }
                    </div>
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
        textAlign: 'center',
        color: 'white'
    },

    text:{
        fontFamily: 'Montserrat'
    },
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(All_project)
