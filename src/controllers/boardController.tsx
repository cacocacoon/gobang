import * as React from 'react'
import BoardModel from '../models/boardModel'
import Chess from '../models/chess'

type Props = {
	children: any
}
type State = {
	boardData: Chess[][],
	turn: boolean
}

export default class BoardController extends React.Component<Props, State> {
	private model: BoardModel = new BoardModel()

	state: State = {
		boardData: this.model.toJS(),
		turn: true
	}

	public canMovePiece(x: number, y: number): boolean {
		return this.state.boardData[y][x] === Chess.None
	}

	public whosTurn = (): Chess => {
		return this.state.turn ? Chess.Black : Chess.White
	}

	public movePiece = (x: number, y: number) => {
		const chess: Chess = this.whosTurn()
		this.model.movePiece(x, y, chess)
		this.setState(state => ({ boardData: this.model.toJS(), turn: !state.turn }))
	}

	render() {
		return this.props.children(this.state.boardData, this)
	}
}
