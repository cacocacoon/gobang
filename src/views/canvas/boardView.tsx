import React, { useRef, useEffect } from 'react'

import Config from '../../config'
import Chess from '../../models/chess'
import { BoardHook } from '../../hooks/useBoard'

const COORDINATE = Config.COORDINATE
const BLOCK_LENGTH = Config.BLOCK_LENGTH
const BOARD_LENGTH = COORDINATE.Y * BLOCK_LENGTH

type Props = BoardHook

export default function BoardView(props: Props) {
	const boardRef: React.MutableRefObject<HTMLCanvasElement> = useRef();

	// 畫水平線
	function drawY(context: CanvasRenderingContext2D) {
		Array(COORDINATE.Y + 1).fill(1).forEach((v, i) => {
			context.moveTo(BLOCK_LENGTH, (i + 1) * BLOCK_LENGTH)
			context.lineTo(BLOCK_LENGTH + BOARD_LENGTH, (i + 1) * BLOCK_LENGTH)
		})
	}

	// 畫垂直線
	function drawX(context: CanvasRenderingContext2D) {
		Array(COORDINATE.X + 1).fill(1).forEach((v, i) => {
			context.moveTo((i + 1) * BLOCK_LENGTH, BLOCK_LENGTH)
			context.lineTo((i + 1) * BLOCK_LENGTH, BLOCK_LENGTH + BOARD_LENGTH)
		})
	}

	// 畫棋盤
	function drawBoard() {
		const ctx = boardRef.current.getContext('2d')
		drawX(ctx)
		drawY(ctx)
		ctx.stroke()
	}

	function movePiece(e: React.MouseEvent<HTMLCanvasElement>) {
		if (!props.gaming) {
			return;
		}

		const offsetX = e.nativeEvent.offsetX
		const offsetY = e.nativeEvent.offsetY
		const { x, y } = getCoordinate(offsetX, offsetY)
		
		props.movePiece(x, y)
	}

	function drawChessTo(x: number, y: number, who: Chess) {
		if (who === Chess.None) {
			return
		}
		const ctx = boardRef.current.getContext('2d')
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

	function getCoordinate(offsetX: number, offsetY: number) {
		offsetX = offsetX - BLOCK_LENGTH
		offsetY = offsetY - BLOCK_LENGTH

		offsetX = offsetX >= 0 ? offsetX : 0
		offsetY = offsetY >= 0 ? offsetY : 0

		return {
			x: Math.floor(offsetX / BLOCK_LENGTH) + Math.round((offsetX % BLOCK_LENGTH) / BLOCK_LENGTH),
			y: Math.floor(offsetY / BLOCK_LENGTH) + Math.round((offsetY % BLOCK_LENGTH) / BLOCK_LENGTH)
		}
	}

	function reDraw() {
		const ctx = boardRef.current.getContext('2d')
		ctx.clearRect(0, 0, boardRef.current.width, boardRef.current.height)
		ctx.beginPath()
		drawBoard()
		props.chessInfos.forEach(chessInfo => {
			drawChessTo(chessInfo.x, chessInfo.y, chessInfo.chess)
		})
	}

	// componentDidMount
	useEffect(() => {
		drawBoard()
	}, []);

	// draw chess when chessInfos change
	useEffect(() => {
		reDraw()
	}, [props.chessInfos])

	return (
		<canvas
			height={BOARD_LENGTH + 2 * BLOCK_LENGTH}
			width={BOARD_LENGTH + 2 * BLOCK_LENGTH}
			ref={boardRef}
			onClick={movePiece}
		/>
	)
}
