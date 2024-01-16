import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "./iceCreamSlice";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

export const IcecreamView = () => {
  // will allow user to input how many ice creams to restock but keep that state stores locally in this component
  const [value, setValue] = React.useState(1);
  const numOfIceCreams = useAppSelector((state) => state.icecream.numOfIceCreams);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h2>Number of ice Creams - {numOfIceCreams}</h2>
      <button onClick={() => dispatch(ordered())}>Order ice cream</button>
      <input
        type="number"
        value={value} //value equal to state variable value
        onChange={(e) => setValue(parseInt(e.target.value))} //get hold of event and call setValue passing in pareint(e.target.value)
      />
      <button onClick={() => dispatch(restocked(value))}>Restock ice cream</button>
      {/* here using value with the action creator, so passing value into restocked value; value of input element does not have to be part of the redux store, if something is not needed outside a component is can stay as local state, !!do not unnecessarily complicate the redux store!! */}
    </div>
  );
};
