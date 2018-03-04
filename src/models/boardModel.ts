import { List } from 'immutable'
import Chess from './chess'
import Config from '../config'

export default class BoardData {
	private board: List<List<Chess>>
	constructor() {
		const COORDINATE = Config.COORDINATE
		this.board = List(
			Array(COORDINATE.Y).fill(List(Array(COORDINATE.X).fill(Chess.None)))
		)
	}
	
	toJS(): Chess[][] {
		return this.board.toJS()
	}
}
