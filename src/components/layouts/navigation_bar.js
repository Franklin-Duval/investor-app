import React from 'react'
import logo from '../../assets/images/logo.PNG'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import '../../assets/css/navigation.css'

export default class Navigation extends React.Component{

    render(){
        return(
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
                <Link to="/" className="row">
                    <img src={logo} alt="logo" style={styles.image} />
                    <p style={styles.text} >Greenwood Solution</p>
                </Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navmenu" aria-controls="navmenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
    
                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/" style={styles.text} >Acceuil</Link></li>

                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/" style={styles.text} >A Propos</Link></li>

                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/" style={styles.text} >Contact</Link></li>

                        <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end',}}>
                            <FaUserCircle color="white" size={40} />
                            <p style={{fontFamily: 'Tauri', fontSize: 16, color: 'white', marginLeft: 10, textAlign: 'center', marginTop: 5}}>
                                Franklin Duval
                            </p>
                        </div>
                    </ul>                    
                </div>
            </nav>
        )
    }
    
}

const styles = {

    image:{
        height: 40,
        width: 40,
        borderRadius: 20,
        marginLeft: 20
    },

    text: {
        marginTop: 5,
        marginLeft: 10,
        color: 'white',
        fontSize: 20,
        fontFamily: 'Tauri',
        marginRight: 40
    }
    
}
