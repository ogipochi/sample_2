import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'
const { SHOW_ALL } = VisibilityFilters


// filterのreducer
// こちらはfilterを返す.
// 自分の関係のあるglobal state飲みを扱う.todosとは扱うstateが異なる
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    // SET_VISIBILITY_FILTERだった場合,actionにfilter値が指定されているはずなので
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
    // そうでない場合,actionが含むのはfilterと関係のないactionに対するデータのはずなので
    // そのまま返す
      return state
  }
}


// actionのreducer
// こちらはtodoを返す
// 自分の関係のあるglobal state飲みを扱う.todosとは扱うstateが異なる
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
    // ADD_TODOの場合配列をつなげて返す
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
    // TOGGLE_TODOの場合
      return state.map((todo, index) => {
        // actionの内容が同じならcompletedを逆にして返す
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        // そうでない場合そのまま返す
        return todo
      })
    default:

      return state
  }
}


//以下と同義
// export default function todoApp(state = {}, action) {
//     return {
//       visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//       todos: todos(state.todos, action)
//     }
//   }
// combineReducersは自動で渡すべきstateを予測している??
const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp