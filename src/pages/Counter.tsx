import { useState } from "react";

const CounterPage = () => {
  const [counter, setCounter] = useState(0);
  
  return (
      <>
         <p>Counter {counter}</p>
         <button
            onClick={() => {
               setCounter(counter + 1);
            }}
         >
         Increase
         </button>
      </>
   );
};

export default CounterPage;