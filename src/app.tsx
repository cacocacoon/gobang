import React from 'react'
import ReactDOM from 'react-dom'

import BoardController, { BoardControllerProps } from './controllers/boardController'
import IsYourTurn from './views/isYourTurn'
import RepentanceButton from './views/repentanceButton'
import ShowWinner from './views/showWinner'
import CanvasBoardView from './views/canvas/boardView'
import DOMBoardView from './views/dom/boardView'
import isCanvasSupported from './utils/isCanvasSupported';

function App() {
	return (
		<BoardController>
			{(props: BoardControllerProps) => (
				<>
					<IsYourTurn who={props.whosTurn()} />
					<ShowWinner
						gaming={props.gaming}
						who={props.whoWin()}
					/>
					<RepentanceButton />
					{isCanvasSupported ? (
						<CanvasBoardView {...props} />
					) : (
						<DOMBoardView {...props} />
					)}
				</>
			)}
		</BoardController>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))
