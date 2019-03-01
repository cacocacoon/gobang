import React, { useEffect } from 'react'

import Emitter from '../../utils/eventEmitter'
import Config from '../../config'
import Chess from '../../models/chess'
import { BoardControllerProps } from '../../controllers/boardController'
import './boardView.scss'

const COORDINATE = Config.COORDINATE
const BLOCK_LENGTH = Config.BLOCK_LENGTH
const BOARD_WIDTH = COORDINATE.Y * BLOCK_LENGTH
const BOARD_HEIGHT = COORDINATE.Y * BLOCK_LENGTH

type Props = BoardControllerProps

export default function BoardView(props: Props) {
	function getCoordinate(offsetX: number, offsetY: number) {
		return {
			x: Math.floor(offsetX / BLOCK_LENGTH) + Math.round((offsetX % BLOCK_LENGTH) / BLOCK_LENGTH),
			y: Math.floor(offsetY / BLOCK_LENGTH) + Math.round((offsetY % BLOCK_LENGTH) / BLOCK_LENGTH)
		}
	}

	function movePiece(e: React.MouseEvent<HTMLDivElement>) {
		if (!props.gaming) {
			return;
		}

		const offsetX = e.nativeEvent.offsetX
		const offsetY = e.nativeEvent.offsetY
		const { x, y } = getCoordinate(offsetX, offsetY)

		props.movePiece(x, y)
	}

	function getChessPosition(x: number, y: number): { top: string; left: string } {
		return {
			top: (y - 0.5) * BLOCK_LENGTH + 'px',
			left: (x - 0.5) * BLOCK_LENGTH + 'px'
		}
	}

	function repentance() {
		props.repentance()
	}

	useEffect(() => {
		Emitter.on('repentance', repentance)
		return () => Emitter.off('repentance', repentance)
	}, [])

	return (
		<div
			className="board-view"
			style={{
				margin: `${BLOCK_LENGTH}px`,
				height: `${BOARD_HEIGHT}px`,
				width: `${BOARD_WIDTH}px`
			}}
		>
			<div
				className="surface"
				onClick={movePiece}
			>
				{props.boardData.map((row, y) =>
					row.map((chess, x) => {
						const { top, left } = getChessPosition(x, y)
						switch (chess) {
							case Chess.Black:
								return <Black top={top} left={left} />
							case Chess.White:
								return <White top={top} left={left} />
							default:
								return null
						}
					})
				)}
			</div>
			<Grid />
		</div>
	)
}

type ChessProps = {
	top: string
	left: string
}

function White(props: ChessProps) {
	return (
		<div
			className="chess white"
			style={{
				width: `${BLOCK_LENGTH - 2}px`,
				height: `${BLOCK_LENGTH - 2}px`,
				top: props.top,
				left: props.left
			}}
		/>
	)
}

function Black(props: ChessProps) {
	return (
		<div
			className="chess black"
			style={{
				width: `${BLOCK_LENGTH - 2}px`,
				height: `${BLOCK_LENGTH - 2}px`,
				top: props.top,
				left: props.left
			}}
		/>
	)
}

function Grid() {
	return (
		<table>
			<tbody>
				{Array(COORDINATE.Y).fill(1).map((_, y) => (
					<tr key={y}>
						{Array(COORDINATE.X).fill(1).map((_, x) => (
							<td
								key={x}
								style={{
									height: `${BLOCK_LENGTH - 2}px`,
									width: `${BLOCK_LENGTH - 2}px`
								}}
							/>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
