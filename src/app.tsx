import React from 'react'
import ReactDOM from 'react-dom'

import './app.scss'
import BoardController from './controllers/boardController'
import IsYourTurn from './views/isYourTurn'
import RepentanceButton from './views/repentanceButton'
import CanvasBoardView from './views/canvas/boardView'
import DOMBoardView from './views/dom/boardView'
const App: React.SFC = () => (
	<BoardController>
		{(boardData, gaming, controller) => (
			<>
				<IsYourTurn who={controller.whosTurn()} />
				<RepentanceButton />
				{isCanvasSupported() ? (
					<CanvasBoardView
						boardData={boardData}
						gaming={gaming}
						controller={controller}
					/>
				) : (
					<DOMBoardView
						boardData={boardData}
						gaming={gaming}
						controller={controller}
					/>
				)}
			</>
		)}
	</BoardController>
)

function isCanvasSupported(): boolean {
	const canvas = document.createElement('canvas')
	return !!(canvas.getContext && canvas.getContext('2d'))
}

ReactDOM.render(<App />, document.getElementById('app'))
