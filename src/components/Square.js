import React from 'react';

class Square extends React.Component {
  color() {
    if (this.props.isWinner) {
      return 'green';
    } else if (this.props.value === 'X') {
    // if (this.props.value == 'X') {
      return '#FF8D33';
    } else if (this.props.value === '0') {
      return '#FF3339';
    }
    return '#fff';
  }

  render() {
    const divStyle = { backgroundColor: this.color() };

    return (
      <button className="square" onClick={this.props.onClick} style={divStyle}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
