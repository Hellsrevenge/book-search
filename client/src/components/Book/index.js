import React, {Component} from "react";
import "./style.css";

class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: props.saved,
            deleted: false,
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.book.link !== this.props.book.link) {
            this.setState({ saved: false });
        }
    }

    handleSave(event) {
        event.preventDefault();

        fetch('/api/books/', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(this.props.book)
        }).then(response => response.json()
        ).then(data => {
            this.setState({ saved: true });
        });

    }

    handleDelete(event) {
        event.preventDefault();

        fetch('/api/books/'+this.props.book._id, {
            method: 'delete'
        }).then(response => response.json()
        ).then(data => {
            this.setState({ deleted: true });
        });

    }

    render() {
        if (this.state.deleted === false) {
            return (
                <div className="book-item">
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-author">{this.props.book.authors}</div>
                    <div className="book-description">
                        <img src={this.props.book.image}/>
                        <span>{this.props.book.description}</span>
                    </div>
                    <div className="book-link">
                        <a className="buy" href={this.props.book.link} target="blank">Buy book</a>
                        {this.state.saved ?
                            <div className="saved">Saved</div>
                            : [
                                (this.props.book.saved ?
                                    <button className="save" onClick={this.handleDelete}>Delete book</button>
                                    : <button className="save" onClick={this.handleSave}>Save book</button>
                                )
                            ]
                        }
                    </div>
                </div>
            )
        } else {
            return (
                null
            )
        }
    }
}

export default Book;
