import React, {Component} from "react";
//import { Link } from 'react-dom'
import Booklist from "../Booklist";
import "./style.css";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        fetch("/api/search/" + this.state.value)
            .then(response => response.json())
            .then(data => {
                this.setState({books: data});
            });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <nav className="navbar">
                    <div className="opacity">
                        <div className="links">
                            <a >Home</a> | <a href="/saved">Saved</a>
                        </div>
                    <div className="title">Book Google Search</div>
                    <div className="search-form">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Search:
                                <input className="query" type="text" size="50" value={this.state.value} onChange={this.handleChange}/>
                            </label>
                            <input className="search" type="submit" value="Submit"/>
                        </form>
                    </div>
                    </div>
                </nav>
                <Booklist books={this.state.books} query={this.state.value}/>
            </div>
        );
    }
}

export default NavBar;
