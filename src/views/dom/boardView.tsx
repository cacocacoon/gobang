import * as React from 'react'

import Chess from '../../models/chess'
import BoardController from '../../controllers/boardController'

type Props = {
	boardData: Chess[][]
	gaming: boolean
	controller: BoardController
}
type State = {}

export default class BoardView extends React.Component<Props, State> {
	render() {
		return null
	}
}
