import React from 'react'

type Props = {
	repentance: () => void
}

export default function RepentanceButton(props: Props) {
	return (
		<button
			style={{ display: 'block' }}
			onClick={props.repentance}
		>
			悔棋
		</button>
	)
}
