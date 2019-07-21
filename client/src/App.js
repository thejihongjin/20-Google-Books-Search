import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Header from "./components/Header";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import API from "./utils/API"

class App extends Component {
    state = {
        searchQuery: "",
        searchResults: [],
        savedBooks: []
    };

    componentDidMount() {
        this.searchBooks("Harry Potter");
        this.loadBooks();
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
        this.setState({ [name]: value }, () => { console.log(this.state) });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.searchQuery) {
            this.searchBooks(this.state.searchQuery);
            this.setState({ searchQuery: "" }, () => { console.log(this.state) });
        } else {
            alert("Please input search term first!");
        }
    };

    handleSaveClick = book => {
        API.saveBook({
            title: book.title,
            authors: book.authors,
            description: book.description,
            image: book.image,
            link: book.link
        })
            .then(response => {
                // console.log(JSON.parse(response.config.data).title);
                if (response.data.upserted) {
                    this.loadBooks();
                    alert(JSON.parse(response.config.data).title + " saved!");
                } else {
                    alert("Book already saved.")
                }
            })
            .catch(error => console.log(error));
    }

    loadBooks = () => {
        API.getBooks()
            .then(response => this.setState({ savedBooks: response.data }))
            .catch(error => console.log(error));
    }

    handleDeleteClick = bookId => {
        API.deleteBook(bookId)
            .then(() => this.loadBooks())
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey="search" transition={false} id="noanim-tab-example">
                    <Tab eventKey="home" title="Google Books" disabled />
                    <Tab eventKey="search" title="Search">
                        <Header />
                        <Search searchResults={this.state.searchResults} searchQuery={this.state.searchQuery} handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit} handleSaveClick={this.handleSaveClick} />
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