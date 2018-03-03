import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './app.scss'
import Board from './views/board/board'

const App: React.SFC = () => (
	<React.Fragment>
		<Board />
	</React.Fragment>
)

ReactDOM.render(<App />, document.getElementById('app'))
