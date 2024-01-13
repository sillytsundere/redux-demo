import React from 'react'
import { useSelector } from 'react-redux'

export const CakeView = () => {
    // hook accepts function as its parameter
    // selector function, received redux state as its argument, function can then return a value
    // state refers to redux state which contains multiple reducers
    // cakeReducer is one of them and is refered to by the key 'cake'
    // then tap into numOfCakes property which can be seen in the slice
    // useSelector hook returns whatever is returned by the selector function
    const numOfCakes = useSelector((state) => state.cake.numOfCakes)
    return (
        <div>
            <h2>Number of cakes - {numOfCakes}</h2>
            <button>Order cake</button>
            <button>Restock cakes</button>
        </div>
    )
}