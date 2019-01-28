import React, {Component} from "react";
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
                    <div className="title">Book Google Search</div>

                    <div className="search-form">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Name:
                                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                            </label>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </nav>
                <Booklist books={this.state.books} query={this.state.value}/>
            </div>
        );
    }
}

export default NavBar;
