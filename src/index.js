import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import memoryUtil from './utils/memoryUtils'
import storageUtil from './utils/storageUtils'

const user = storageUtil.getUser()
memoryUtil.user = user
ReactDOM.render(<App/>, document.getElementById('root'))