import React from 'react'
import BoardModel from '../models/boardModel'
import Chess from '../models/chess'
import Config from '../config'

type Props = {
	children: (controller: BoardController) => React.ReactNode
}
type State = {
	boardData: Chess[][]
	gaming: boolean
	turn: boolean
}

export default class BoardController extends React.Component<Props, State> {
	private model: BoardModel = new BoardModel()

	state: State = {
		boardData: this.model.toJS(),
		gaming: true,
		turn: true
	}

	public get boardData() {
		return this.state.boardData
	}

	public get gaming() {
		return this.state.gaming
	}

	private canMovePiece = (x: number, y: number): boolean => {
		return this.state.boardData[y][x] === Chess.None
	}

	private notYetMove(): boolean {
		return this.model.notYetMove()
	}

	public whosTurn = (): Chess => {
		return this.state.turn ? Chess.Black : Chess.White
	}

	public whoWin = (): Chess => {
		return this.state.turn ? Chess.White : Chess.Black
	}

	public repentance = (callback?: () => void) => {
		if (!this.notYetMove()) {
			this.model.repentance()
			this.setState(
				state => ({
					boardData: this.model.toJS(),
					turn: !state.turn,
					gaming: true
				}),
				callback
			)
		}
	}

	public movePiece = (x: number, y: number, callback?: () => void) => {
		if (this.canMovePiece(x, y)) {
			const chess: Chess = this.whosTurn()
			this.model.movePiece(x, y, chess)
			this.setState({ boardData: this.model.toJS() }, () => {
				callback && callback()
				this.checkWin(x, y, chess)
			})
		}
	}

	private checkWin(x: number, y: number, chess: Chess) {
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
				this.getDirScore(d[0], chess, position) +
				this.getDirScore(d[1], chess, position)
			maxScore = Math.max(maxScore, score)
		})
		const win = maxScore >= 5

		if (win) {
			this.setState(state => ({ gaming: false, turn: !state.turn }))
		} else {
			this.setState(state => ({ turn: !state.turn }))
		}
	}

	private getDirScore(
		dir: [number, number],
		chess: Chess,
		position: { x: number; y: number }
	): number {
		const boardData = this.state.boardData
		let score = 0
		let moveAStep = { x: position.x, y: position.y }
		while (true) {
			//移動一格
			moveAStep = { x: moveAStep.x + dir[0], y: moveAStep.y + dir[1] }
			// 假如在牆外或是棋子不同
			if (
				this.outsideOfBoard(moveAStep) ||
				boardData[moveAStep.y][moveAStep.x] !== chess
			) {
				break
			}
			score++
		}
		return score
	}

	private outsideOfBoard(position: { x: number; y: number }): boolean {
		const { COORDINATE } = Config
		return (
			position.x < 0 ||
			position.y < 0 ||
			position.x > COORDINATE.X ||
			position.y > COORDINATE.Y
		)
	}

	render() {
		return this.props.children(this)
	}
}
