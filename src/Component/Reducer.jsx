import React, { useReducer } from 'react'

const Reducer = () => {
  const intialValue = { count: 1 };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'increase':
        return { count: state.count + 1 };
      case 'decrease':
        return { count: state.count - 1 };
      case 'divide':
        return { count: state.count / 10 };
      case 'multiple':
        return { count: state.count * 5 };
      default:
        return intialValue;
    }
  }
  const [state, dispatch] = useReducer(reducer, intialValue);


  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: 'increase' })} >Increase</button>
      <button onClick={() => dispatch({ type: 'decrease' })} >decrease</button>
      <button onClick={() => dispatch({ type: 'divide' })} >divide</button>
      <button onClick={() => dispatch({ type: 'multiple' })} >Multiple</button>
    </div>
  )
};

export default Reducer;