import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navigation from './navigation_bar'
import '../../assets/css/home.css'
import logo from '../../assets/images/logo.PNG'
import home from '../../assets/images/home2.svg'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <div className="home">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-7" style={styles.center}>
                                <img src={logo} alt="" style={{width: 200, height: 200, borderRadius: 100}} />
                                <p className="big-title">MY GREENBOND <br/> SOLUTION </p>
                                <div style={{paddingLeft: 100, paddingRight: 100}}>
                                    <p className="sub-title">
                                        Greenbond solution est une startup dont l'objectif est de promouvoir l'avancé du numérique.
                                        Cette plateforme a pour but de permettre à des porteur de projet de présenter leurs projets a 
                                        des différents investisseurs afin d'obtenir des financement et de l'aide.
                                    </p>
                                </div>
                                
                            </div>
                            <div className="col-md-5">
                                <img src={home} alt="" style={{width: 400, height: 400,}} />

                                <Link className="top-button" to="/login">CONNEXION</Link>
                            </div>
                        </div>
                        
                    </div>
                    
                    
                </div>
            </div>
        )
    }
}

const styles = {
    center: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    }
}
