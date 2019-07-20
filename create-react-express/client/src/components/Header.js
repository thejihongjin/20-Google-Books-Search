import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

const jumbotronStyle = {
    textAlign: "center",
    margin: "25px"
}

const Header = () => {
    return (
        <Jumbotron style={jumbotronStyle}>
            <h1>(React) Google Books Search</h1>
            <h2>Search for and Save Books of Interest</h2>
        </Jumbotron>
    );
}

export default Header;