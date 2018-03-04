import * as React from 'react'
import BoardModel from '../models/boardModel'

type Props = {
	children?: any
}
type State = any

export default class BoardController extends React.Component<Props, State> {
	private model: BoardModel = new BoardModel()

	state: State = {
		boardData: this.model.toJS()
	}

	render() {
		return this.props.children(this.state.boardData)
	}
}
