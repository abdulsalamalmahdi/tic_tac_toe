import React from "react";
import Board from "./Board";
import calculateWinner from "./CalculateWinner";
import GetLocation from "./GetLocation";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isClicked: false,
      locationsHistory:[
        {
          locations:Array(9).fill(null),
        }
      ],
      ind:null,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const locationsHistory = this.state.locationsHistory.slice(0, this.state.stepNumber + 1);
    const currnetLocation = locationsHistory[locationsHistory.length - 1];
    const  locations = currnetLocation.locations.slice();
    const current = history[history.length - 1];
    const squares = current.squares.slice();
   // console.log(squares)
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    locations[i] =  GetLocation(i);
console.log(locations)
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      locationsHistory: locationsHistory.concat([
        {
          locations: locations,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      isClicked: !this.state.isClicked,
     ind: i
    });
   
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const locations = this.state.locationsHistory;
  //   console.log(this.state.ind)
  //  console.log(locations)
    const coord = locations.map((locs, ind) => {
      console.log(locs.locations[this.state.ind], this.state.ind)
      const desc = locs.locations[ind -1]?
        
         `(${locs.locations[this.state.ind].row}, ${locs.locations[this.state.ind].col})`
        : null;
//console.log(desc)
      return  desc? (
      <li key={ind}>
          <button>{desc}</button>
        </li>
      ):null;
     });

    const moves = history.map((step, move) => {
     
      const desc = move
        ? "Go to move #" + move 
        : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    
    

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            clicked={this.state.isClicked}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <ol className='location'>{coord}</ol>
        </div>
      </div>
    );
  }
}
