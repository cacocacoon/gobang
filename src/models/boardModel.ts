import { List } from 'immutable'
import Chess from './chess'
import ChessInfo from './chessInfo';

export default function BoardModel() {
	const eventTarget = new EventTarget()
	let chessInfoHistory: List<ChessInfo> = List<ChessInfo>();

	function movePiece(x: number, y: number, chess: Chess) {
		const chessInfo: ChessInfo = { x, y, chess }
		chessInfoHistory = chessInfoHistory.push(chessInfo)
		eventTarget.dispatchEvent(new Event('change'));
	}

	function notYetMove(): boolean {
		return chessInfoHistory.count() === 0
	}

	function repentance() {
		chessInfoHistory = chessInfoHistory.pop()
		eventTarget.dispatchEvent(new Event('change'));
	}

	function lastChessInfo(): ChessInfo {
		return chessInfoHistory.last()
	}

	function subscribe(callback: EventListener) {
		eventTarget.addEventListener('change', callback)
	}

	function unSubscribe(callback: EventListener) {
		eventTarget.removeEventListener('change', callback)
	}

	function toJS(): ChessInfo[] {
		return chessInfoHistory.toJS()
	}

	return Object.freeze({
		movePiece,
		notYetMove,
		repentance,
		lastChessInfo,
		subscribe,
		unSubscribe,
		toJS
	})
}
