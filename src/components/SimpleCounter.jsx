import { useEffect, useState } from "react"

export const SimpleCounter = ({ limit = 10 }) => {
  const [counter, setCounter] = useState(0);
  const [warning, setWarning] = useState('');
  const increment = () => {
    if (counter < limit) {
      setCounter(c => ++c);
    }
  }
  const decrement = () => {
    if (counter > 0) {
      setCounter(c => --c);
    }
  }

  useEffect(() => {
    if (counter === limit) {
      setWarning('Reached maximum');
    } else if (counter === 0) {
      setWarning('Reached minimum');
    } else if (warning) {
      setWarning('');
    }
  }, [counter]);
  return (
    <>
      <div>
        <button onClick={increment}>+</button>
        <span>{counter}</span>
        <button onClick={decrement}>-</button>
        <div>
          { new Array(counter).fill('').map((el, i) => <span key={i}>{el}</span>) }
        </div>
      </div>
      { warning && (
        <div style={{ color: 'red' }}>
          {warning}
        </div>
      )}
    </>
  )
}