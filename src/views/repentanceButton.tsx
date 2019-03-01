import React from 'react'
import Emitter from '../utils/eventEmitter'

export default function RepentanceButton() {
	return (
		<button
			style={{ display: 'block' }}
			onClick={() => Emitter.trigger('repentance', [])}
		>
			悔棋
		</button>
	)
}
