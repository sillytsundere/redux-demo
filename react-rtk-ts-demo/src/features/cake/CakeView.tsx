import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "./cakeSlice";

import { useAppSelector, useAppDispatch } from '../../app/hooks'

export const CakeView = () => {
  // hook accepts function as its parameter
  // selector function, received redux state as its argument, function can then return a value
  // state refers to redux state which contains multiple reducers
  // cakeReducer is one of them and is refered to by the key 'cake'
  // then tap into numOfCakes property which can be seen in the slice
  // useSelector hook returns whatever is returned by the selector function
  const numOfCakes = useAppSelector((state) => state.cake.numOfCakes);
  //hook returns reference to dispatch function from redux store
  //dispatch constant can be used to dispatch actions when needed
  const dispatch = useAppDispatch();
  return (
    <div>
      <h2>Number of cakes - {numOfCakes}</h2>
      <button onClick={() => dispatch(ordered())}>Order cake</button>
      <button onClick={() => dispatch(restocked(5))}>Restock cakes</button>
    </div>
  );
};
