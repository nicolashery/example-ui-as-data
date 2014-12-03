var React = require('react');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

var TodoItem = React.createClass({
  propTypes: {
    todo: React.PropTypes.object.isRequired,
    editing: React.PropTypes.bool.isRequired,
    onToggle: React.PropTypes.func.isRequired,
    onDestroy: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      editText: this.props.todo.title
    };
  },

  handleChange: function(e) {
    this.setState({editText: e.target.value});
  },

  handleSubmit: function(e) {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  },

  handleEdit: function () {
    this.props.onEdit();
    this.setState({editText: this.props.todo.title});
  },

  handleKeyDown: function (e) {
    if (e.which === ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel(e);
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit(e);
    }
  },

  render: function() {
    if (this.props.editing) {
      return (
        <p>
          <input
            value={this.state.editText}
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </p>
      );
    } else {
      return (
        <p>
          <input
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle} />
          {' '}
          <span onDoubleClick={this.handleEdit}>{this.props.todo.title}</span>
          {' '}
          <button onClick={this.props.onDestroy}>Delete</button>
        </p>
      );
    }
  }
});

module.exports = TodoItem;
