import { List } from 'immutable'
import Chess from './chess'
import ChessInfo from './chessInfo';
import Config from '../config'

type Board = List<List<Chess>>

export default class BoardData {
	private board: Board
	private chessInfoHistory: List<ChessInfo>
	constructor() {
		const COORDINATE = Config.COORDINATE
		this.board = List(
			Array(COORDINATE.Y + 1).fill(List(Array(COORDINATE.X + 1).fill(Chess.None)))
		)
		this.chessInfoHistory = List<ChessInfo>()
	}

	public movePiece(x: number, y: number, chess: Chess) {
		const chessInfo: ChessInfo = { x, y, chess }
		this.chessInfoHistory = this.chessInfoHistory.push(chessInfo)
		this.board = this.board.setIn([y, x], chess)
	}

	public notYetMove(): boolean {
		return this.chessInfoHistory.count() === 0
	}

	public repentance() {
		const lastChessInfo = this.lastChessInfo
		const { x, y } = lastChessInfo
		this.board = this.board.setIn([y, x], Chess.None)
		this.chessInfoHistory = this.chessInfoHistory.pop()
	}

	public get lastChessInfo(): ChessInfo {
		return this.chessInfoHistory.last()
	}

	public toJS(): Chess[][] {
		return this.board.toJS()
	}
}
