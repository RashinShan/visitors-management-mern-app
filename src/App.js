import { useState } from 'react'

 

function App() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		let result = await fetch(
		'http://localhost:5000/register', {
			method: "post",
			body: JSON.stringify({ name, email }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		result = await result.json();
		console.warn(result);
		if (result) {
			alert("Data saved succesfully");
			setEmail("");
			setName("");
		}
	}


	


	return (
		<div className="bg-opacity-50 backdrop-filter backdrop-blur-lg p-4">
		<h1 className="bg-blue-500 text-white p-4 mb-4 rounded-lg text-center text-2xl font-bold">
		  Visitors Management System
		</h1>
		<div>
			<p className="text-red-500 text-center">**Enter your user name and email let everyone knows you are here</p>
		</div>
		<form action="">
		  <input
			type="text"
			placeholder="Name"
			value={name}
			onChange={(e) => setName(e.target.value)}
			className="bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-100 p-2 rounded-md mb-4 border border-gray-300"
		  />
		  <input
			type="email"
			placeholder="Email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			className="bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-100 p-2 rounded-md mb-4 border border-gray-300"
		  />
		  <button
			type="submit"
			onClick={handleOnSubmit}
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
		  >
			Submit
		  </button>
		</form>
	  </div>

	);





}

export default App;
