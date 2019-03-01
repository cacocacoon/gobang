import { useState, useRef, useEffect } from 'react'
import BoardModel from '../models/boardModel'
import Chess from '../models/chess'
import Config from '../config'

export type BoardControllerProps = {
	whosTurn: () => Chess,
	gaming: boolean,
	whoWin: () => Chess,
	movePiece: (x: number, y: number) => void,
	repentance: () => void,
	boardData: Chess[][]
}

type Props = {
	children: (props: BoardControllerProps) => JSX.Element,
}

export default function BoardController(props: React.PropsWithChildren<Props>) {
	const model: BoardModel = useRef(new BoardModel()).current
	const [ state, setState ] = useState({
		boardData: model.toJS(),
		gaming: true,
		turn: true
	})

	function canMovePiece(x: number, y: number): boolean {
		return state.boardData[y][x] === Chess.None
	}

	function notYetMove(): boolean {
		return model.notYetMove()
	}

	function whosTurn(): Chess {
		return state.turn ? Chess.Black : Chess.White
	}

	function whoWin(): Chess {
		return state.turn ? Chess.White : Chess.Black
	}

	function repentance() {
		if (notYetMove()) {
			return;
		}

		model.repentance()
		setState(state => ({
			...state,
			boardData: model.toJS()
		}))
	}

	function movePiece(x: number, y: number) {
		if (!canMovePiece(x, y)) {
			return;
		}

		const chess: Chess = whosTurn()
		model.movePiece(x, y, chess)
		setState(state => ({ ...state, boardData: model.toJS() }))
	}

	function checkWin(x: number, y: number, chess: Chess): boolean {
		// 以下棋點的八方來計算，相對方向加起來分數 >= 5 獲勝
		const directions: [number, number][][] = [
			//水平
			[[-1, 0], [1, 0]],
			// 垂直
			[[0, -1], [0, 1]],
			// 左斜
			[[-1, -1], [1, 1]],
			// 右斜
			[[1, -1], [-1, 1]]
		]
		const position: { x: number; y: number } = { x, y }
		let maxScore = 1
		directions.forEach(d => {
			const score =
				1 +
				getDirScore(d[0], chess, position) +
				getDirScore(d[1], chess, position)
			maxScore = Math.max(maxScore, score)
		})
		const win = maxScore >= 5

		return win
	}

	function getDirScore(
		dir: [number, number],
		chess: Chess,
		position: { x: number; y: number }
	): number {
		const boardData = state.boardData
		let score = 0
		let moveAStep = { x: position.x, y: position.y }
		while (true) {
			//移動一格
			moveAStep = {
				x: moveAStep.x + dir[0],
				y: moveAStep.y + dir[1]
			}
			// 假如在牆外或是棋子不同
			if (
				outsideOfBoard(moveAStep) ||
				boardData[moveAStep.y][moveAStep.x] !== chess
			) {
				break
			}
			score++
		}
		return score
	}

	function outsideOfBoard(position: { x: number; y: number }): boolean {
		const { COORDINATE } = Config
		return (
			position.x < 0 ||
			position.y < 0 ||
			position.x > COORDINATE.X ||
			position.y > COORDINATE.Y
		)
	}

	function gameOver() {
		setState(state => ({ ...state, gaming: false, turn: !state.turn }))
	}

	function turn() {
		setState(state => ({ ...state, gaming: true, turn: !state.turn }))
	}

	// check win if boardData change
	useEffect(() => {
		const lastChessInfo = model.lastChessInfo
		if (!lastChessInfo) {
			return
		}

		if (checkWin(lastChessInfo.x, lastChessInfo.y, lastChessInfo.chess)) {
			gameOver()
			return
		}

		turn();
	}, [state.boardData]);

	return props.children({
		whosTurn,
		gaming: state.gaming,
		whoWin,
		movePiece,
		repentance,
		boardData: state.boardData
	})
}
