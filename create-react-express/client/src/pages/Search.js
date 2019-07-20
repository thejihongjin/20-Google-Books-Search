import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const cardStyle = {
    margin: "25px"
}

const Search = ({ searchResults }) => {
    return (
        <div style={{ margin: "0 auto" }}>
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title>Book Search</Card.Title>
                    <Form>
                        <Form.Group controlId="formBookSearch">
                            <Form.Label>Book</Form.Label>
                            <Form.Control type="text" placeholder="e.g., Harry Potter" name="searchQuery" />
                        </Form.Group>
                        <Button className="float-right">Search</Button>
                    </Form>
                </Card.Body>
            </Card>
            {/* // results */}
            <div>
                <Card style={cardStyle}>
                    <Card.Body>
                        <Card.Title>Results</Card.Title>
                        {searchResults.length ? (
                            searchResults.map(book => (
                                <Card style={cardStyle} key={book.searchId}>
                                    <Card.Header></Card.Header>
                                    <Card.Body>
                                        <div className="float-right">
                                            <a href={book.link} target="_blank" rel="noopener noreferrer"><Button>View</Button></a> <Button>Save</Button>
                                        </div>
                                        <Card.Title>{book.title}</Card.Title>
                                        <Card.Text>By {book.authors}</Card.Text>
                                        <Card.Text><img src={book.image} alt={book.title + " book cover"} className="float-left" style={{ paddingRight: "15px" }} />{book.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                                <h3>No Search Results</h3>
                            )
                        }
                    </Card.Body>
                </Card>
            </div>
        </div >
    );
}

export default Search;