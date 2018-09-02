import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
  let input
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
              // 空白以外に文字が入っていなければスルー
            return
          }
          // inputの値を送信
          dispatch(addTodo(input.value))
          // inputを初期化
          input.value = ''
        }}
      >
        <input
        // 入力値をinputに渡す
          ref={node => {
            input = node
          }}
        />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo
