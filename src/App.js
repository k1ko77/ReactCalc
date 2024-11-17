// В сценарии используется
// виток "применить состояние"
import { useState } from "react";

function App() {
	const [calc, setCalc] = useState("");
	const [result, setResult] = useState("");

	const ops =['/', '*', '+', '-', '.'];

    // Ввод заперета на использование операций 
	// больше одного раза и на использование
	// их раньше, чем ввод чисел
	const updateCalc = value => {
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
  
	// Функция для создания цифр от 1 до 9
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
	
	// Для получения результата "="
	const calculate = () => {
		setCalc(eval(calc).toString());
	}
	
	// Для удаления всего
	const deleteAll = () => {
		setResult('');
		setCalc('');
	}
	
	// Для удаления части
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

				<div className="display">
					{result ? <span>({result})</span> : '' } { calc || "0"}
				</div>
        
				{/* Создание кнопок математических операций */}
				<div className="operators">
					<button onClick={() => updateCalc('/')}>/</button>
					<button onClick={() => updateCalc('*')}>*</button>
					<button onClick={() => updateCalc('+')}>+</button>
					<button onClick={() => updateCalc('-')}>-</button>
          
					<button onClick={deleteLast}>DEL</button>
					<button onClick={deleteAll}>C</button>
				</div>
        
				{/* Создание кнопки "0", "точки", "=", 
					а также остальных цифр */ }
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