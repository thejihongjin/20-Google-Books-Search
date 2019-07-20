import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Header from "./components/Header";
import Search from "./pages/Search";
// import Saved from "./pages/Saved";

class App extends Component {
    state = {
        currentPage: "Home",
        searchQuery: "",
        searchResults: [],
        savedBooks: []
    };
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="search" transition={false} id="noanim-tab-example">
                    <Tab eventKey="home" title="Google Books" disabled />
                    <Tab eventKey="search" title="Search">
                        <Header />
                        <Search searchResults={this.state.searchResults} />
                    </Tab>
                    <Tab eventKey="contact" title="Saved">
                        <Header />
                        {/* <Saved /> */}
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default App;
