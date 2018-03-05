import * as React from 'react'

import Emitter from '../../utils/eventEmitter'
import Config from '../../config'
import Chess from '../../models/chess'
import BoardController from '../../controllers/boardController'
import './board.scss'

const COORDINATE = Config.COORDINATE
const BLOCK_LENGTH = Config.BLOCK_LENGTH
const BOARD_LENGTH = (COORDINATE.Y - 1) * BLOCK_LENGTH
type Props = {
	boardData: Chess[][]
	gaming: boolean
	controller: BoardController
}
type State = any

export default class BoardView extends React.Component<Props, State> {
	private boardRef: HTMLCanvasElement

	// 畫水平線
	private drawY(ctx: CanvasRenderingContext2D) {
		Array(COORDINATE.Y)
			.fill(1)
			.forEach((v, i) => {
				ctx.moveTo(BLOCK_LENGTH, (i + 1) * BLOCK_LENGTH)
				ctx.lineTo(BLOCK_LENGTH + BOARD_LENGTH, (i + 1) * BLOCK_LENGTH)
			})
	}
	// 畫垂直線
	private drawX(ctx: CanvasRenderingContext2D) {
		Array(COORDINATE.X)
			.fill(1)
			.forEach((v, i) => {
				ctx.moveTo((i + 1) * BLOCK_LENGTH, BLOCK_LENGTH)
				ctx.lineTo((i + 1) * BLOCK_LENGTH, BLOCK_LENGTH + BOARD_LENGTH)
			})
	}

	private drawBoard() {
		// 畫棋盤
		const ctx = this.boardRef.getContext('2d')
		this.drawX(ctx)
		this.drawY(ctx)
		ctx.stroke()
	}

	private movePiece = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const offsetX = e.nativeEvent.offsetX
		const offsetY = e.nativeEvent.offsetY
		const { x, y } = this.getCoordinate(offsetX, offsetY)

		if (this.props.controller.canMovePiece(x, y)) {
			this.drawChessTo(x, y, this.props.controller.whosTurn())
			this.props.controller.movePiece(x, y)
		}
	}

	private drawChessTo(x: number, y: number, who: Chess) {
		if (who === Chess.None) {
			return
		}
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

	private getCoordinate(offsetX: number, offsetY: number) {
		offsetX = offsetX - BLOCK_LENGTH
		offsetY = offsetY - BLOCK_LENGTH

		offsetX = offsetX >= 0 ? offsetX : 0
		offsetY = offsetY >= 0 ? offsetY : 0

		const x =
			Math.floor(offsetX / BLOCK_LENGTH) +
			((offsetX % BLOCK_LENGTH) / BLOCK_LENGTH > 0.5 ? 1 : 0)
		const y =
			Math.floor(offsetY / BLOCK_LENGTH) +
			((offsetY % BLOCK_LENGTH) / BLOCK_LENGTH > 0.5 ? 1 : 0)

		return { x, y }
	}

	private async repentance() {
		if (!this.props.controller.notYetMove()) {
			await this.props.controller.repentance()
			this.reDraw()
		}
	}

	private reDraw() {
		const ctx = this.boardRef.getContext('2d')
		ctx.clearRect(0, 0, this.boardRef.width, this.boardRef.height)
		ctx.beginPath()
		this.drawBoard()
		this.props.boardData.forEach((row, y) => {
			row.forEach((chess, x) => {
				this.drawChessTo(x, y, chess)
			})
		})
	}

	componentDidMount() {
		this.drawBoard()
		Emitter.on('repentance', this.repentance)
	}

	componentWillUnmount() {
		Emitter.off('repentance')
	}

	render() {
		return (
			<canvas
				height={BOARD_LENGTH + 2 * BLOCK_LENGTH}
				width={BOARD_LENGTH + 2 * BLOCK_LENGTH}
				ref={boardRef => (this.boardRef = boardRef)}
				onClick={this.props.gaming ? this.movePiece : null}
			/>
		)
	}
}
