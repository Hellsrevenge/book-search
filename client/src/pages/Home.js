import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import Booklist from "../components/Booklist";
import Navbar from "../components/Navbar";

class Home extends Component {
    render() {
        return (
            <Wrapper>
                <Navbar />
                <Booklist />
            </Wrapper>
        );
    }
}

export default Home;
