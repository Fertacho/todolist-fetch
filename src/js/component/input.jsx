import React from "react";
import { useState, useEffect } from "react";

const Input = () => {
	const [inputValue, setinputValue] = useState("");
	const [Task, setTask] = useState([]);
    const [Tarea, setTarea] = useState("");
    const List = [{label:Tarea,done:false}]
    useEffect(()=>{
        getTask ()
    }, [])
    function getTask () {

        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
};

        fetch("https://assets.breatheco.de/apis/fake/todos/user/felipin", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result),
        setTarea(result);
        })
        .catch(error => console.log('error', error));
    } 
    function fetchPut (List){
        var raw = JSON.stringify(List);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'PUT',
            header: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch("https://assets.breatheco.de/apis/fake/todos/user/felipin", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
        
        
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
                                fetchPut(List);
							}
						}}
					/>
                    <button
                    onClick={() => {
                        fetchPut(List);
                    }}>
                    Agregar tarea
                </button>
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
