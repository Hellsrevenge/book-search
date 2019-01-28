import React, {Component} from "react";
import Book from "../Book";
import "./style.css";

class Booklist extends Component {
    render() {
        return (
            <div className="books-container">
                {
                    this.props.books ? (
                        this.props.books.map((item, index) => {
                            return (
                                <Book book={item} key={index}/>
                            )
                        })
                    ) : null
                }
            </div>
        )
    }
}

export default Booklist;
