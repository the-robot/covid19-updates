import React from 'react';

class Graphs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
    };
  }

  componentDidMount() {
    this.setState({
      width: 10000,
    });
  };

  render() {
    return (
      <p> {this.state.width } </p>
    )
  }
};

export default Graphs;
