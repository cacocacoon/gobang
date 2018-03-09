import React from 'react'

import Emitter from '../../utils/eventEmitter'
import Config from '../../config'
import Chess from '../../models/chess'
import BoardController from '../../controllers/boardController'
import './boardView.scss'

const COORDINATE = Config.COORDINATE
const BLOCK_LENGTH = Config.BLOCK_LENGTH
const BOARD_WIDTH = COORDINATE.Y * BLOCK_LENGTH
const BOARD_HEIGHT = COORDINATE.Y * BLOCK_LENGTH
type Props = {
	boardData: Chess[][]
	gaming: boolean
	controller: BoardController
}
type State = {}

export default class BoardView extends React.Component<Props, State> {
	private getCoordinate(offsetX: number, offsetY: number) {
		const x =
			Math.floor(offsetX / BLOCK_LENGTH) +
			Math.round((offsetX % BLOCK_LENGTH) / BLOCK_LENGTH)
		const y =
			Math.floor(offsetY / BLOCK_LENGTH) +
			Math.round((offsetY % BLOCK_LENGTH) / BLOCK_LENGTH)

		return { x, y }
	}

	private movePiece = (e: React.MouseEvent<HTMLDivElement>) => {
		const offsetX = e.nativeEvent.offsetX
		const offsetY = e.nativeEvent.offsetY
		const { x, y } = this.getCoordinate(offsetX, offsetY)

		this.props.controller.movePiece(x, y)
	}

	private getChessPosition(
		x: number,
		y: number
	): { top: string; left: string } {
		const top = (y - 0.5) * BLOCK_LENGTH + 'px'
		const left = (x - 0.5) * BLOCK_LENGTH + 'px'
		return { top, left }
	}

	private repentance = () => {
		this.props.controller.repentance()
	}

	componentDidMount() {
		Emitter.on('repentance', this.repentance)
	}

	componentWillUnmount() {
		Emitter.off('repentance', this.repentance)
	}

	render() {
		const { boardData } = this.props
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
					onClick={this.props.gaming ? this.movePiece : null}
				>
					{boardData.map((row, y) =>
						row.map((chess, x) => {
							const { top, left } = this.getChessPosition(x, y)
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
}

type ChessProps = {
	top: string
	left: string
}

const White = (props: ChessProps) => (
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

const Black = (props: ChessProps) => (
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

const Grid = () => (
	<table>
		<tbody>
			{Array(COORDINATE.Y)
				.fill(1)
				.map((_, y) => (
					<tr key={y}>
						{Array(COORDINATE.X)
							.fill(1)
							.map((_, x) => (
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
