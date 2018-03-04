import * as React from 'react'

import Config from '../../config'
import Chess from '../../models/chess'
import BoardController from '../../controllers/boardController'
import './board.scss'

const COORDINATE = Config.COORDINATE
const BLOCK_LENGTH = Config.BLOCK_LENGTH
const BOARD_LENGTH = (COORDINATE.Y - 1) * BLOCK_LENGTH
type Props = {
	boardData: Chess[][]
	controller: BoardController
}
type State = any

export default class BoardView extends React.Component<Props, State> {
	boardRef?: HTMLCanvasElement

	componentDidUpdate() {
		console.log(this.props.boardData)
	}
	// 畫水平線
	drawY(ctx: CanvasRenderingContext2D) {
		Array(COORDINATE.Y)
			.fill(1)
			.forEach((v, i) => {
				ctx.moveTo(BLOCK_LENGTH, (i + 1) * BLOCK_LENGTH)
				ctx.lineTo(BLOCK_LENGTH + BOARD_LENGTH, (i + 1) * BLOCK_LENGTH)
			})
	}
	// 畫垂直線
	drawX(ctx: CanvasRenderingContext2D) {
		Array(COORDINATE.X)
			.fill(1)
			.forEach((v, i) => {
				ctx.moveTo((i + 1) * BLOCK_LENGTH, BLOCK_LENGTH)
				ctx.lineTo((i + 1) * BLOCK_LENGTH, BLOCK_LENGTH + BOARD_LENGTH)
			})
	}

	drawBoard() {
		// 畫棋盤
		const ctx = this.boardRef.getContext('2d')
		this.drawX(ctx)
		this.drawY(ctx)
		ctx.stroke()
	}

	movePiece = e => {
		const offsetX = e.nativeEvent.offsetX
		const offsetY = e.nativeEvent.offsetY
		const { x, y } = this.getCoordinate(offsetX, offsetY)
		console.log(x, y)
		if (this.props.controller.canMovePiece(x, y)) {
			this.drawChessTo(x, y, this.props.controller.whosTurn())
			this.props.controller.movePiece(x, y)
		}
	}

	drawChessTo(x: number, y: number, who: Chess) {
		const ctx = this.boardRef.getContext('2d')
		ctx.beginPath()
		ctx.arc(
			BLOCK_LENGTH * (x + 1),
			BLOCK_LENGTH * (y + 1),
			BLOCK_LENGTH / 2,
			0,
			2 * Math.PI
		)
		switch (who) {
			case Chess.Black:
				ctx.fillStyle = 'black'
				break
			case Chess.White:
				ctx.fillStyle = 'white'
				break
			default:
				console.error('error')
				return
		}
		ctx.fill()
		ctx.stroke()
	}

	getCoordinate(offsetX: number, offsetY: number) {
		offsetX = offsetX - BLOCK_LENGTH
		offsetY = offsetY - BLOCK_LENGTH

		const x =
			Math.floor(offsetX / BLOCK_LENGTH) +
			((offsetX % BLOCK_LENGTH) / BLOCK_LENGTH > 0.5 ? 1 : 0)
		const y =
			Math.floor(offsetY / BLOCK_LENGTH) +
			((offsetY % BLOCK_LENGTH) / BLOCK_LENGTH > 0.5 ? 1 : 0)

		return {
			x: x >= 0 ? x : 0,
			y: y >= 0 ? y : 0
		}
	}

	componentDidMount() {
		this.drawBoard()
		// this.forceUpdate()
	}

	render() {
		return (
			<canvas
				height={BOARD_LENGTH + 2 * BLOCK_LENGTH}
				width={BOARD_LENGTH + 2 * BLOCK_LENGTH}
				ref={blackRef => (this.boardRef = blackRef)}
				onClick={this.movePiece}
			/>
		)
	}
}
