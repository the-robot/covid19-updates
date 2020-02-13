var React = require('react');
var ReactDOM = require('react-dom');
var Graphs = require('../../views/dynamic/Home/Graphs');

module.exports = function(data, containerId) {
  var container = document.getElementById(containerId || 'graphs');
  ReactDOM.render(<Graphs {...data} />, container);
};