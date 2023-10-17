import React from "react";
import '../navbar/NavBar.css'

function NavBar(){
    return(
        <div className="NavBar">
            <div className="Title">
                <a href="/">DEVPOST</a>
            </div>
            <div className="ItemNav">
                <ul>
                    <a href="/">Home</a>
                    <a href="/posts">Posts</a>
                    <a href="/newpost">Newpost</a>
                    <a href="/sobre">Sobre</a>
                </ul>
            </div>
        </div>
    )
}

export default NavBar
