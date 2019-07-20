import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const cardStyle = {
    margin: "25px"
}

const imgStyle = {
    paddingRight: "15px"
}

const Saved = ({ savedBooks, handleDeleteClick }) => {
    return (
        <div>
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title>Saved Books</Card.Title>
                    {savedBooks.length ? (
                        savedBooks.map(book => (
                            <Card style={cardStyle} key={book.__v}>
                                <Card.Header></Card.Header>
                                <Card.Body>
                                    <div className="float-right">
                                        <a href={book.link} target="_blank" rel="noopener noreferrer"><Button>View</Button></a> <Button onClick={handleDeleteClick}>Delete</Button>
                                    </div>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>By {book.authors}</Card.Text>
                                    <Card.Text><img src={book.image} alt={book.title + " book cover"} className="float-left" style={imgStyle} />{book.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                            <h3>No Saved Books</h3>
                        )
                    }
                </Card.Body>
            </Card>
        </div>
    );
}

export default Saved;