import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './app.scss'
import BoardController from './controllers/boardController'
import BoardView from './views/board/boardView'

const App: React.SFC = () => (
	<BoardController>
		{boardData => <BoardView boardData={boardData} />}
	</BoardController>
)

ReactDOM.render(<App />, document.getElementById('app'))
