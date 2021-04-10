import React from 'react'
import logo from '../../assets/images/logo.PNG'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import '../../assets/css/navigation.css'
import { connect } from 'react-redux'
import { createUser } from '../../redux/actions/action'

class Navigation extends React.Component{

    render(){
        return(
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
                <Link to="/" className="row" style={{textDecoration: 'none'}}>
                    <img src={logo} alt="logo" style={styles.image} />
                    <p style={styles.text} >Greenbond Solution</p>
                </Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navmenu" aria-controls="navmenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
    
                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/" style={styles.text} >Acceuil</Link></li>

                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/" style={styles.text} >A Propos</Link></li>

                        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show"><Link to="/" style={styles.text} >Contact</Link></li>

                        {
                            this.props.user.authentifie &&
                            (
                            <Link style={{flex: 1, display: 'flex', justifyContent: 'flex-end',}}
                                onClick={() => {
                                    this.props.save_user({
                                        authentifie: false,
                                        userType: "",
                                        id: "",
                                        nom: "",
                                        prenom: "",
                                        email: "",
                                        url: ""
                                    })
                                }}
                                to="/login"
                            >
                                <FaUserCircle color="white" size={40} />
                                <p data-toggle="tooltip" data-html="true" title="Déconnecter" style={{fontFamily: 'Tauri', fontSize: 16, color: 'white', marginLeft: 10, textAlign: 'center', marginBottom:-10}}>
                                    {this.props.user.nom}  <br/>
                                    {this.props.user.prenom}
                                </p>
                            </Link>
                            )
                        }
                        
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

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        save_user : (user) => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)