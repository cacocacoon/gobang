import Chess from './chess'
import ChessInfo from './chessInfo';

export default function BoardModel() {
	const eventTarget = new EventTarget()
	let chessInfoHistory: ChessInfo[] = [];

	function movePiece(x: number, y: number, chess: Chess) {
		const chessInfo: ChessInfo = { x, y, chess }
		chessInfoHistory = [...chessInfoHistory, chessInfo]
		eventTarget.dispatchEvent(new Event('change'));
	}

	function notYetMove(): boolean {
		return chessInfoHistory.length === 0
	}

	function repentance() {
		chessInfoHistory.pop()
		chessInfoHistory = [...chessInfoHistory]
		eventTarget.dispatchEvent(new Event('change'));
	}

	function lastChessInfo(): ChessInfo {
		return chessInfoHistory[chessInfoHistory.length - 1]
	}

	function subscribe(callback: EventListener) {
		eventTarget.addEventListener('change', callback)
	}

	function unSubscribe(callback: EventListener) {
		eventTarget.removeEventListener('change', callback)
	}

	function getChessInfoHistory(): ChessInfo[] {
		return [...chessInfoHistory]
	}

	return Object.freeze({
		movePiece,
		notYetMove,
		repentance,
		lastChessInfo,
		subscribe,
		unSubscribe,
		getChessInfoHistory
	})
}
