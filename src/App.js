// Вытащили математику
import { useState } from "react";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops =['/', '*', '+', '-', '.'];

  const updateCalc = value => {
    // Заперетили спользовать операторы больше одного раза и вводить ранше чисел
    if (
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1))
    ) {
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  }
  // функция для создания цифр от 1 до 10
  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button 
          onClick={() => updateCalc(i.toString())}
          key={i}>
          {i}
        </button>
      )
    }

    return digits;
  }
// Для =
  const calculate = () => {
    setCalc(eval(calc).toString());
  }
// Для удаления всего
  const deleteAll = () =>{
    setResult('');
    setCalc('');
   }
// Для Удаления части
 const deleteLast = () => {
  if (calc == '') {
    return;
  }

  const value = calc.slice(0, -1);

  setCalc(value);
 }

  return (
    <div className="App">
      <div className="calculator">
        {/* <div className="default">
          <button onClick={deleteAll}>C</button>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
         </div> */}
        <div className="display">
          {result ? <span>({result})</span> : '' } { calc || "0"}
          <button onClick={deleteAll}>C</button>
        </div>
        {/* Создаём кнопки простейших математических операций */}
        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          
          <button onClick={deleteLast}>DEL</button>
        </div>
        {/* Создаём кнопки 0, точку и равно, а так же испоьзуем функцию создания оставшихся цифр  */}
        <div className="digits">
          { createDigits() }
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>

          <button onClick={calculate}>=</button>
        </div>

      </div>
    </div>
  );
}

export default App;
