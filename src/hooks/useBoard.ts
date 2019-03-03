import { useState, useEffect } from 'react'
import BoardModel from '../models/boardModel'
import Chess from '../models/chess'
import Config from '../config'
import ChessInfo from '../models/chessInfo';

export type BoardHook = {
	whosTurn: () => Chess,
	gaming: boolean,
	whoWin: () => Chess,
	movePiece: (x: number, y: number) => void,
	repentance: () => void,
	chessInfos: ChessInfo[]
}
const model = BoardModel()
export default function useBoard(): BoardHook {
	const [ state, setState ] = useState({
		chessInfos: model.getChessInfoHistory(),
		gaming: true,
		turn: true
	})

	function findChessInfo(x: number, y: number) {
		const chessInfo = state.chessInfos.find(chessInfo => chessInfo.x === x && chessInfo.y === y)
		if (!chessInfo) {
			return Object.create({ chess: Chess.None })
		}

		return chessInfo
	}

	function canMovePiece(x: number, y: number): boolean {
		return findChessInfo(x, y).chess === Chess.None
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
	}

	function movePiece(x: number, y: number) {
		if (!canMovePiece(x, y)) {
			return;
		}

		const chess = whosTurn()
		model.movePiece(x, y, chess)
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
		const maxScore = directions.reduce((maxScore, d) => (
			Math.max(maxScore, 1 + getDirScore(d[0], chess, position) + getDirScore(d[1], chess, position))
		), 1)
		const win = maxScore >= 5
		return win
	}

	function getDirScore(
		dir: [number, number],
		chess: Chess,
		position: { x: number; y: number }
	): number {
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
				findChessInfo(moveAStep.x, moveAStep.y).chess !== chess
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

	function setChessInfos() {
		setState(state => ({ ...state, chessInfos: model.getChessInfoHistory() }))
	}

	// check win if chessInfos change
	useEffect(() => {
		const lastChessInfo = model.lastChessInfo()
		if (!lastChessInfo) {
			return
		}

		if (checkWin(lastChessInfo.x, lastChessInfo.y, lastChessInfo.chess)) {
			gameOver()
			return
		}

		turn();
	}, [state.chessInfos]);

	// subscribe model of chessInfos
	useEffect(() => {
		model.subscribe(setChessInfos)
		return () => model.unSubscribe(setChessInfos)
	}, [])

	return Object.freeze({
		whosTurn,
		gaming: state.gaming,
		whoWin,
		movePiece,
		repentance,
		chessInfos: state.chessInfos
	})
}
