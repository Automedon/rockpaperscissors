import React, { useState } from "react";
import paper from "./img/paper.png";
import rock from "./img/rock.png";
import scissors from "./img/rock-paper-scissors-icon-5.jpg";
import styled from "styled-components";

//Yes, I know that it need to be refactored. Sorry about that. It just like a playground.

const Choice = styled.div`
  display: inline-block;
  margin: 1px;

  img:hover {
    cursor: pointer;
  }
  img {
    width: 100px;
    height: 100px;
  }
`;
const Choices = styled.div`
  margin: 50px 0;
  text-align: center;
`;

const ScoreBoard = styled.div`
  border: 3px solid white;
  width: 200px;
  margin: 20px auto;
  color: white;
  font-size: 40px;
  border-radius: 40px;
  text-align: center;
  padding: 15px 20px;
  font-family: "Asap";
  position: relative;
`;
const Body = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Asap:400,500,700");
  height: 100vh;
  background: #24272e;
  header {
    padding: 20px;
    background: white;
    h1 {
      color: #24272e;
      text-align: center;

      font-family: "Asap";
    }
  }
  #action-msg {
    color: white;
    text-align: center;
    font-family: "Asap";
    font-weight: bold;
    font-size: 20px;
  }
`;
const Badge = styled.div`
  background: #e25840;
  color: white;
  font-size: 14px;
  padding: 2px 10px;
  font-family: "Asap";
  position: absolute;
  text-align: center;
  left: ${props => (props.id === "user-label" ? "-25px" : "215px")};
  top: 30px;
`;
const Result = styled.div`
  font-size: 32px;
  color: white;
  font-weight: bold;
  p {
    text-align: center;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

function App() {
  let [score, setScore] = useState("Choose your weapon");
  let [user, setUser] = useState(0);
  let [comp, setComp] = useState(0);
  let [weapons, setWeapons] = useState({
    user: "",
    computer: ""
  });
  let whichWeapon = weapon => {
    if (weapon === "s") return "scissors";
    if (weapon === "p") return "paper";
    if (weapon === "r") return "rock";
  };
  const whoWin = u => {
    const arr = ["p", "s", "r"];
    const c = arr[Math.abs(Math.round(Math.random() * arr.length - 1))];
    if (u === c) setScore(`Tie`);
    if (u === "p" && c === "s") {
      setScore("Paper is cut by scissors. You lost :(");
      setComp(comp + 1);
    }
    if (u === "s" && c === "p") {
      setScore("Scissors cut paper. You won :)");
      setUser(user + 1);
    }
    if (u === "r" && c === "p") {
      setScore("Paper is covered by paper. You lost :(");
      setComp(comp + 1);
    }
    if (u === "p" && c === "r") {
      setScore("Paper covers rock. You won :)");
      setUser(user + 1);
    }
    if (u === "s" && c === "r") {
      setScore("Scissors is broken by rock. You lost :(");
      setComp(comp + 1);
    }
    if (u === "r" && c === "s") {
      setScore("Rock break scissors. You won :)");
      setUser(user + 1);
    }
    setWeapons({ ...weapons, user: whichWeapon(u), computer: whichWeapon(c) });
  };
  const getWeapon = e => {
    const u = e.currentTarget.id;
    whoWin(u);
  };

  return (
    <Body>
      <header>
        <h1>Rock Paper Scissors</h1>
      </header>
      <ScoreBoard>
        <Badge id="user-label" className="badge">
          user
        </Badge>
        <Badge id="computer-label" className="badge">
          comp
        </Badge>
        <span id="user-score">{user}</span>:
        <span id="computer-score">{comp}</span>
      </ScoreBoard>
      <Result>
        <p>{score}</p>
      </Result>
      <Choices>
        <Choice id="r" onClick={getWeapon}>
          <img src={rock} alt="rock" />
        </Choice>
        <Choice id="s" onClick={getWeapon}>
          <img src={scissors} alt="scissors" />
        </Choice>
        <Choice id="p" onClick={getWeapon}>
          <img src={paper} alt="paper" />
        </Choice>
      </Choices>

      {weapons.user ? (
        <p id="action-msg">
          Your weapon is '{weapons.user}'. Computer weapon is '
          {weapons.computer}'.
        </p>
      ) : (
        <h1 style={{ color: "green", textAlign: "center" }}>
          Created by Automedon
        </h1>
      )}
    </Body>
  );
}

export default App;
