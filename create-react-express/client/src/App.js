import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Header from "./components/Header";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import API from "./utils/API"

class App extends Component {
    state = {
        // currentPage: "Home",
        searchQuery: "",
        searchResults: [],
        savedBooks: []
    };

    componentDidMount() {
        this.searchBooks("Harry Potter");
    }

    searchBooks = query => {
        API.searchBooks(query)
            .then(response => {
                const searchResults = response.data.items.map((book, i) => {
                    return {
                        searchId: i,
                        title: book.volumeInfo.title,
                        authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "N/A",
                        description: book.volumeInfo.description ? book.volumeInfo.description : "No description available.",
                        image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "",
                        link: book.volumeInfo.previewLink
                    }
                })
                this.setState({ searchResults: searchResults })
            })
            .catch(error => console.log(error));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchBooks(this.state.searchQuery);
    };

    handleSaveClick = book => {
        // console.log("save", book);
        API.saveBook({
            title: book.title,
            authors: book.authors,
            description: book.description,
            image: book.image,
            link: book.link
        })
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    handleDeleteClick = () => {
        // handleDeleteClick = bookId => {
        console.log("delete");
        // API.deleteBook(bookId)
        //     .then(response => console.log(response))
        //     .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey="search" transition={false} id="noanim-tab-example">
                    <Tab eventKey="home" title="Google Books" disabled />
                    <Tab eventKey="search" title="Search">
                        <Header />
                        <Search searchResults={this.state.searchResults} handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit} handleSaveClick={this.handleSaveClick} />
                    </Tab>
                    <Tab eventKey="contact" title="Saved">
                        <Header />
                        <Saved savedBooks={this.state.savedBooks} handleDeleteClick={this.handleDeleteClick} />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default App;
