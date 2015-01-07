var React = require('react');
var app = require('../app');
var TodoItem = require('./TodoItem.jsx');
var Footer = require('./Footer.jsx');

var ENTER_KEY = 13;

var App = React.createClass({
  componentDidMount: function() {
    app.addChangeListener(this.handleChange);
  },

  componentWillUnmount: function() {
    app.removeChangeListener(this.handleChange);
  },

  handleChange: function() {
    this.forceUpdate();
  },

  handleNewTodoKeyDown: function (e) {
    if (e.which !== ENTER_KEY) {
      return;
    }
    e.preventDefault();
    var val = this.refs.newField.getDOMNode().value.trim();

    if (val) {
      app.actions.addTodo(val);
      this.refs.newField.getDOMNode().value = '';
    }
  },

  handleToggleAll: function (e) {
    var checked = e.target.checked;
    app.actions.toggleAll(checked);
  },

  render: function() {
    return (
      <div>
        {this.renderNewTodo()}
        {this.renderTodoList()}
        {this.renderFooter()}
      </div>
    );
  },

  renderNewTodo: function() {
    return (
      <p>
        <strong>New todo: </strong>
        <input
          ref="newField"
          onKeyDown={this.handleNewTodoKeyDown} />
      </p>
    );
  },

  renderTodoList: function() {
    if (!app.projections.isShowingTodoList()) {
      return null;
    }

    var nodes = app.projections.shownTodos().map(function(todo) {
      var id = todo.get('id');
      return (
        <TodoItem
          key={id}
          todo={todo.toJS()}
          editing={app.state().get('editing') === id}
          onToggle={app.actions.toggle.bind(null, id)}
          onDestroy={app.actions.destroy.bind(null, id)}
          onEdit={app.actions.openEdit.bind(null, id)}
          onSave={app.actions.save.bind(null, id)}
          onCancel={app.actions.closeEdit} />
      );
    }).toJS();

    return (
      <div>
        <p>
          <input
            type="checkbox"
            onChange={this.handleToggleAll}
            checked={app.projections.isToggleAllChecked()} />
          {' Toggle all'}
        </p>
        {nodes}
      </div>
    );
  },

  renderFooter: function() {
    if (!app.projections.isShowingFooter()) {
      return null;
    }

    return (
      <Footer
        count={app.projections.activeTodoCount()}
        completedCount={app.projections.completedTodoCount()}
        nowShowing={app.state().get('nowShowing')}
        showingClearCompleted={app.projections.isShowingClearCompleted()}
        onShow={app.actions.show}
        onClearCompleted={app.actions.clearCompleted} />
    );
  },

  renderAppState: function() {
    return (
      <div>
        <p><strong>App state:</strong></p>
        <pre style={{fontSize: '16px'}}>
          {JSON.stringify(app.state(), null, 2)}
        </pre>
      </div>
    );
  }
});

module.exports = App;
