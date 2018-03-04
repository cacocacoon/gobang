import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './app.scss'
import BoardController from './controllers/boardController'
import BoardView from './views/board/boardView'

const App: React.SFC = () => (
	<BoardController>
		{(boardData, gaming, controller) => (
			<BoardView
				boardData={boardData}
				gaming={gaming}
				controller={controller}
			/>
		)}
	</BoardController>
)

ReactDOM.render(<App />, document.getElementById('app'))
