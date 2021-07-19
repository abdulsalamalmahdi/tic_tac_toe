import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  constructor(props){
    super(props);
    this.sqrs = Array(9).fill(null);
  }

  renderSquare(i) {

    return (
      <Square 
      key= {i}
     
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="board-row"> {this.sqrs.map((sqr, i)=> {

           return  this.renderSquare(i)

         })}


        {/* <div className="board-row">
        
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
      </div>
    );
  }
}
