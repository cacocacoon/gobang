import React from 'react'
import ReactDOM from 'react-dom'
import 'core-js/fn/array/fill'

import BoardController from './controllers/boardController'
import IsYourTurn from './views/isYourTurn'
import RepentanceButton from './views/repentanceButton'
import ShowWinner from './views/showWinner'
import CanvasBoardView from './views/canvas/boardView'
import DOMBoardView from './views/dom/boardView'
const App: React.SFC = () => (
	<BoardController>
		{controller => (
			<>
				<IsYourTurn who={controller.whosTurn()} />
				<ShowWinner
					gaming={controller.gaming}
					who={controller.whoWin()}
				/>
				<RepentanceButton />
				{isCanvasSupported() ? (
					<CanvasBoardView controller={controller} />
				) : (
					<DOMBoardView controller={controller} />
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
