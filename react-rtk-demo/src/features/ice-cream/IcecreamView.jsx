import React from 'react'
import { useSelector } from 'react-redux'

export const IcecreamView = () => {
    const numOfIceCreams = useSelector((state) => state.icecream.numOfIceCreams)
    return (
        <div>
            <h2>Number of ice Creams - {numOfIceCreams}</h2>
            <button>Order ice cream</button>
            <button>Restock ice cream</button>
        </div>
    )
}