import React from 'react'
import ReactDOM from 'react-dom'

import './app.scss'
import BoardController from './controllers/boardController'
import IsYourTurn from './views/isYourTurn'
import RepentanceButton from './views/repentanceButton'
import BoardView from './views/board/boardView'

const App: React.SFC = () => (
	<BoardController>
		{(boardData, gaming, controller) => (
			<>
				<IsYourTurn who={controller.whosTurn()} />
				<RepentanceButton />
				<BoardView
					boardData={boardData}
					gaming={gaming}
					controller={controller}
				/>
			</>
		)}
	</BoardController>
)

ReactDOM.render(<App />, document.getElementById('app'))
