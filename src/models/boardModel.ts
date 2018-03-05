import { List, Stack } from 'immutable'
import Chess from './chess'
import Config from '../config'

type Board = List<List<Chess>>

export default class BoardData {
	private board: Board
	private boardStack: Stack<Board>
	constructor() {
		const COORDINATE = Config.COORDINATE
		this.board = List(
			Array(COORDINATE.Y).fill(List(Array(COORDINATE.X).fill(Chess.None)))
		)
		this.boardStack = Stack<Board>()
	}

	public movePiece(x: number, y: number, chess: Chess) {
		this.boardStack = this.boardStack.push(this.board)
		this.board = this.board.setIn([y, x], chess)
	}

	public notYetMove(): boolean {
		return this.boardStack.count() === 0
	}

	public repentance = () => {
		this.board = this.boardStack.first()
		this.boardStack = this.boardStack.pop()
	}

	public toJS(): Chess[][] {
		return this.board.toJS()
	}
}
