import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Center from "react-center";
import { Button } from 'react-bootstrap';

const imgMyimageexample = require('./k.jpg');
const divStyle = {
    width: '100%',
    height: '100vh',
    // minHeight: '640px',
    backgroundImage: `url(${imgMyimageexample})`,
    backgroundSize: 'cover'
};



class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem("token");
        this.state = {}
    }
    render() {
        return (
            <div style={divStyle} >

                <div  >
                    <Center>
                        <h1 style={{ marginTop: "200px", color: "white" }}>Vous avez déconnecté de SYROS!!!</h1>
                    </Center>
                    <Center>
                        <Link to="/"><Button style={{
                            height: "200px", width: "200px", borderColor: "rgb(220, 0, 78)", fontSize: "30px",
                            borderRadius: "50%", backgroundColor: "rgb(220, 0, 78)", color: "white"
                        }}>Login ...</Button></Link>
                    </Center>
                </div>
            </div>);
    }
}

export default Logout;