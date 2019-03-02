import React from 'react'
import ReactDOM from 'react-dom'

import useBoard from './hooks/useBoard'
import IsYourTurn from './views/isYourTurn'
import RepentanceButton from './views/repentanceButton'
import ShowWinner from './views/showWinner'
import CanvasBoardView from './views/canvas/boardView'
import DOMBoardView from './views/dom/boardView'
import isCanvasSupported from './utils/isCanvasSupported';

function App() {
	const board = useBoard()
	const BoardView = isCanvasSupported ? CanvasBoardView : DOMBoardView
	return (
		<>
			<IsYourTurn who={board.whosTurn()} />
			<ShowWinner gaming={board.gaming} who={board.whoWin()} />
			<RepentanceButton repentance={board.repentance} />
			<BoardView {...board} />
		</>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))
