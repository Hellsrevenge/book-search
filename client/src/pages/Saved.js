import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import Booklist from "../components/Booklist";
import Menubar from "../components/Menubar";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        fetch("/api/books/")
            .then(response => response.json())
            .then(data => {
                console.dir(data);
                this.setState({books: data});
            });
    }

    render() {
        return (
            <Wrapper>
                <Menubar />
                <Booklist books={this.state.books} />
            </Wrapper>
        );
    }
}

export default Home;
