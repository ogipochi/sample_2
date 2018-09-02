import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {

    case 'SHOW_ALL':
    // すべて見せるのでそのままのtodosを返す
      return todos
    case 'SHOW_COMPLETED':
    // 完了したタスクを見せるのでcompleted=Trueでfilter
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
    // 未完了のタスクを見せるのでcompleted=Falseでfilter
      return todos.filter(t => !t.completed)
  }
}

// stateを伝える関数だけでなくactionをdispatchする関数も必要
const mapStateToProps = state => {
    // callback関数を返す
  return {
      // 現在のstateをfilterで計算した後伝える
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // クリックしたもののidを受け取りそれをtoggleTodoでdispatch
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList