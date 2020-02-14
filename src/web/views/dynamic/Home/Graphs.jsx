import React from 'react';

class Graphs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
    };
    this.containerRef = React.createRef()
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleContainerResize);
    this.handleContainerResize();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleContainerResize);
  };

  handleContainerResize = e => {
    const width = this.containerRef.current.offsetWidth;
    this.setState({ width });
  };

  render() {
    return (
      <div ref={this.containerRef}>
        <p>{this.state.width}</p>
      </div>
    )
  };
};

export default Graphs;
