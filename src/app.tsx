import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './app.scss'
import BoardController from './controllers/boardController'
import BoardView from './views/board/boardView'

const App: React.SFC = () => (
	<BoardController>
		{(boardData, controller) => (
			<BoardView boardData={boardData} controller={controller} />
		)}
	</BoardController>
)

ReactDOM.render(<App />, document.getElementById('app'))
