import React from "react";
import { useState, useEffect } from "react";

const Input = () => {
	const [inputValue, setinputValue] = useState("");
	const [Task, setTask] = useState([]);
	
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
    function fetchPut (newList){
        var raw = JSON.stringify(newList);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          fetch("https://assets.breatheco.de/apis/fake/todos/user/felipin", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
 
        
	
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
								let newList = Task.concat({label:inputValue,done:false})
								setTask(newList);
								setinputValue(" ");
                                fetchPut(newList);
							}
						}}
					/>
					<button className="myBtn"
                    onClick={() => {
                        let newList = Task.concat({label:inputValue,done:false})
								setTask(newList);
								setinputValue(" ");
                                fetchPut(newList);
                    }}>
                    Agregar tarea
                </button>
				</li>
				{Task.map((value, index) => {
					return (
						<li className="task" key={index}>
							{value.label}{" "}
							<button
								className="deleter"
								onClick={() =>{
									let delList = Task.filter(
										(t, currentIndex) =>
											index != currentIndex
									)
									setTask(delList)
									fetchPut(delList)
								}
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
