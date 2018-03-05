import * as React from 'react'
import Chess from '../models/chess'

type Props = {
	who: Chess
}

export default (props: Props) => <h3>Is Your Turn: {props.who}</h3>
