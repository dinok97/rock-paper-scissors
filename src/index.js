import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const logic = {
  rock: { w: 'scissors', l: 'paper'},
  paper: {w:'rock', l:'scissors'},
  scissors: {w:'paper', l:'rock'},
}

function generateComputerChoice(){
  let randomInt = Math.random();
  if (randomInt >= 0 && randomInt <= 0.33) {
    return "rock";
  } else if (randomInt >= 0.34 && randomInt <= 0.66) {
    return "paper";
  } else {
    return "scissors"
  };
}


class History extends React.Component{
  render(){
    const historyList = this.props.historyList;
    const listItems = historyList.map((history, index) =><li key={index}><p>{history}</p></li>);
    return(
      <div className="history">
        <h2>history</h2>
        <div >
          <ul>{listItems}</ul>
        </div>
      </div>
    );
  }
}

class Info extends React.Component{
  render(){
    return (
      <div>
        <h3> (You) {this.props.info.userChoice} VS {this.props.info.computerChoice} (Computer)</h3>
        <h3> Result: {this.props.info.result} </h3>
        <h3> (You) {this.props.info.userScore} : {this.props.info.computerScore} (Computer)</h3>
      </div>
    );
  }
}

class UserElementChoise extends React.Component{
  constructor(props){
    super(props)
    this.onUserChoice = this.onUserChoice.bind(this);
  }

  onUserChoice(userChoise){
    this.props.compare(userChoise);
  }
  
  render(){
    return(
      <div className="user-choice">
        <div>
        <button name="Rock" className="symbol add-margin add-padding" onClick={() => this.onUserChoice("rock")} disabled={this.props.buttonFlag}>
            <span role="img" aria-label="rock">👊</span>
          </button>
          <button name="Paper" className="symbol add-margin add-padding" onClick={() => this.onUserChoice("paper")} disabled={this.props.buttonFlag}>
            <span role="img" aria-label="paper">✋️</span>
          </button>
          <button name="Scissors" className="symbol add-margin add-padding" onClick={() => this.onUserChoice("scissors")} disabled={this.props.buttonFlag}>
            <span role="img" aria-label="scissors">✌️</span>
          </button>
        </div>
      </div>
  );}
}

class Application extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      computerChoice: "",
      userChoice: "",
      result: "",
      winner: "",
      visible: false,
      buttonFlag: true,
      userScore: 0,
      computerScore: 0,
      timer: 0,
      history: []
    };

    this.compare = this.compare.bind(this);    
  }

  compare(userChoice_){
    let computerChoice_ = generateComputerChoice();
    
    this.setState({
      userChoice: userChoice_,
      computerChoice: computerChoice_
    });

    if(userChoice_ === computerChoice_){
      let history_ = this.state.history;
      history_.push("Draw");
      this.setState({
        result: "Draw",
        winner: "",
        visible: true,
        history: history_
      });
    } else {
      if(logic[userChoice_].w === computerChoice_) {
        let newUserScore = this.state.userScore + 1;
        let newComputerScore = this.state.computerScore;
        let history_ = this.state.history;
        history_.push("You Win! ");
        this.setState({
          result: "You Win",
          winner: "User",
          visible: true,
          userScore: newUserScore,
          computerScore: newComputerScore,
          history: history_
        });
      } else {
        let newUserScore = this.state.userScore;
        let newComputerScore = this.state.computerScore + 1;
        let history_ = this.state.history;
        history_.push("You Lose!");
        this.setState({
          result: "Computer Win",
          winner: "Computer",
          visible: true,
          userScore: newUserScore,
          computerScore: newComputerScore,
          history: history_
        });
      }
    }
  }

  tick(){
    this.setState({
      timer: this.state.timer + 1
    })
  }

  onButtonClick(){
    this.setState({
      buttonFlag: !this.state.buttonFlag
    });

    if(this.state.buttonFlag){
      this.interval = setInterval( () => this.tick(), 1000);
    } else {
      clearInterval(this.interval);
      this.setState({
        computerChoice: "",
        userChoice: "",
        result: "",
        winner: "",
        visible: false,
        buttonFlag: true,
        userScore: 0,
        computerScore: 0,
        timer: 0,
        history: []
      });
    }
  }

  render(){
    let buttonControl;

    if(this.state.buttonFlag){
      buttonControl = <button onClick={()=>this.onButtonClick()}> Start </button>;
    } else {
      buttonControl = <button onClick={()=>this.onButtonClick()}> Stop </button>;
    }

    return(
      <div className="container">
        <div className="center-text">
          <h1>Rock - Paper - Scissors</h1>
          <h4>{this.state.timer}</h4>
          {buttonControl}
          <h1></h1>
        </div>
        <UserElementChoise compare={this.compare} buttonFlag={this.state.buttonFlag}/>
        <Info info={this.state} />
        <History historyList={this.state.history}/>
      </div>
    )
  }
}

ReactDOM.render(
    <Application />,
  document.getElementById('root')
);
