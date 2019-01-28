import React from "react";
import "./style.css";

function Book(props) {
    return (
        <div className="book-item">
            <div className="book-title">{props.book.title}</div>
            <div className="book-author">{props.book.authors}</div>
            <div className="book-description">{props.book.description}</div>
            <img src={props.book.image}/>
            <div className="book-link">{props.book.link}</div>
        </div>
    );
}

export default Book;
