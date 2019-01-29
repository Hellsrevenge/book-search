import React, {Component} from "react";
import "./style.css";

class Menubar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar">
                    <div className="opacity">
                        <div className="links">
                            <a href="/">Home</a> | <a >Saved</a>
                        </div>
                        <div className="title">Book Google Search</div>
                        <h1>My Saved Books</h1>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Menubar;
