import React from 'react'
import Chess from '../models/chess'

type Props = {
    who: Chess
    gaming: boolean
}

export default function ShowWinner(props: Props) {
    return (
        <h4>Winner: {!props.gaming ? props.who: Chess.None}</h4>
    )
}