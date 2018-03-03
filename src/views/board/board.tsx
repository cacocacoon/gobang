import * as React from 'react'

import './board.scss'
import Config from '../../config'

const COORDINATE = Config.COORDINATE
const BLOCK_LENGTH = Config.BLOCK_LENGTH
const BOARD_LENGTH = (COORDINATE.Y - 1) * BLOCK_LENGTH
type Props = any
type State = any

export default class Board extends React.Component<Props, State> {
	boardRef?: HTMLCanvasElement

	componentDidUpdate() {
		// const ctx = this.boardRef.getContext('2d')
		// ctx.beginPath()
		// ctx.arc(BLOCK_LENGTH, BLOCK_LENGTH, BLOCK_LENGTH / 2, 0, 2 * Math.PI)
		// ctx.fillStyle = 'black'
		// ctx.fill()
		// ctx.stroke()
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
		this.drawX(ctx);
		this.drawY(ctx);
		ctx.stroke()
	}

	componentDidMount() {
		this.drawBoard();
		this.forceUpdate()
	}

	render() {
		return (
			<canvas
				height={BOARD_LENGTH + 2 * BLOCK_LENGTH}
				width={BOARD_LENGTH + 2 * BLOCK_LENGTH}
				ref={blackRef => (this.boardRef = blackRef)}
			/>
		)
	}
}
