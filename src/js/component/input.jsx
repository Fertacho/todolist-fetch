import React from "react";
import { useState } from "react";

const Input = () => {
	const [inputValue, setinputValue] = useState("");
	const [Task, setTask] = useState([]);
	const deleteTask = (currentTask) => {};
	console.log(inputValue, Task);
	return (
		<div className="contenedor">
			<ul>
				<li className="inputli">
					<input
						id="myInput"
						placeholder="Agregar tarea"
						onChange={(e) => {
							setinputValue(e.target.value);
						}}
						value={inputValue}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								setTask(Task.concat(inputValue));
								setinputValue(" ");
							}
						}}
					/>
				</li>
				{Task.map((value, index) => {
					return (
						<li className="task" key={index}>
							{value}{" "}
							<button
								className="deleter"
								onClick={() =>
									setTask(
										Task.filter(
											(t, currentIndex) =>
												index != currentIndex
										)
									)
								}>
								X
							</button>
						</li>
					);
				})}
			</ul>
			<div className="tareas">{Task.length} Tareas añadidas</div>
		</div>
	);
};

export default Input;
