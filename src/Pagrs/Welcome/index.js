import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="welcome-root">
      <h1>W E L C O M E</h1>
      <div id="container">
        <div class="ghost">
          <div class="body">
            <div class="face">
              <div class="eyes"> </div>
              <div class="dimples"> </div>
              <div class="mouth"> </div>
            </div>
            <div class="bottom">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="wave"></div>
            </div>
          </div>
          <div class="shadow"></div>
        </div>
      </div>
      <Link to="./home" className="play-game">PLAY</Link>
    </div>
  );
}
