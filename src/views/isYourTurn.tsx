import React from 'react'
import Chess from '../models/chess'

type Props = {
	who: Chess
}

export default function IsYourTurn(props: Props) {
	return (
		<h3>Is Your Turn: {props.who}</h3>
	)
}
