import React from 'react'
import Chess from '../models/chess'

type Props = {
    who: Chess
    gaming: boolean
}

export default (props: Props) => <h4>Winner: {!props.gaming ? props.who: Chess.None}</h4>