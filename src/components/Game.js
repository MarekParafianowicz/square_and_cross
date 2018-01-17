import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: -1,
        xIsNext: true,
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  };
  
  // componentDidMount(console.log('bacon'));

  handleClick(i) {
    console.log('clicked!')
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const position = i;
    const squaresHtml = document.querySelectorAll('button.square');    
    
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    
    // if ( !squares[i] ) {
      // squaresHtml[i].style.backgroundColor = bgChange(this.state.xIsNext);
    // }
    // squaresHtml[i].disabled = true;
    //console.log(squaresHtml[i].style.backgroundColor)
    
    //console.log(squaresHtml[i])
    
    function bgChange(pupa) {
      const col = (pupa ? '#FF8D33' : '#FF3339')
            //pupa ? '#FF8D33' : '#FF3339'  
        // 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
      return col;
    }
       
    function random(number) {
      return Math.floor(Math.random()*number);
    }
    
    squares[i] = this.state.xIsNext ? 'X' : '0';
    this.setState({
      history: history.concat([{
        squares: squares,
        position: position,
        xIsNext: this.state.xIsNext,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
    const history = this.state.history.slice();
    const current = history[step];
    console.log(current)
    const squares = current.squares.slice();
    const squaresHtml = document.querySelectorAll('button.square') ;


    for (i = 0; i < squaresHtml.length; i++) {
      if (!squares[i]) {
        squaresHtml[i].style.backgroundColor = '#fff'
      }
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares).winner;
    const winnerLine = calculateWinner(current.squares).winnerLine;
    //const position = this.state.position;
 
   console.log(`const winner= ${winner}`, winner)
    
    function moveXorY(pupa) {
      if( pupa === true) {
        return 'X'
      } else {
        return 'O'
      }
    }
    
    function col(pupa) {
      if(pupa === 0  || pupa === 3 || pupa === 6 ) {
        return '1'
      } else if (pupa === 1 || pupa === 4 || pupa === 7 ) {
        return '2'
      } else {
        return '3'
      }
    }
  
    function row(pupa) {
      if(pupa === 0 || pupa ===  1 || pupa === 2 ) {
        return '1'
      } else if (pupa === 3 || pupa ===  4 || pupa === 5 ) {
        return '2'
      } else {
        return '3'
      }
    }

    const moves = history.map((step, move) => {
    //console.log(step.xIsNext)
      const desc = move ?
        'Go to move'+ moveXorY(step.xIsNext) 
         +';'+ ' move number:' + move +';'+ ' position:'
         + 'col' + col(step.position) + ', ' + 'row' 
         + row(step.position) :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move) }>{desc}</button>
        </li>
      );
    });
    let status;
  
    if (winner) {
      status = 'Winner: ' + winner;
      
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
   
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerLine={winnerLine}
            onClick={(i) => this.handleClick(i)}
          />
        
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      
      return {
        winner: squares[a],
        winnerLine: lines[i],
      }
    }
    //console.log(`${i}: ${squares[a]}`)
  }
  return {
    winner: null,
    winnerLine: [],
  };
}

export default Game;
