import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

class App extends Component {
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="search" transition={false} id="noanim-tab-example">
                    <Tab eventKey="home" title="Google Books" disabled />
                    <Tab eventKey="search" title="Search">
                        search tab
                    </Tab>
                    <Tab eventKey="contact" title="Saved">
                        saved tab
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default App;
