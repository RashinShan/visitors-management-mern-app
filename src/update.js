import { useState } from 'react'


function Update(props) {
   
    const { id,initialName,initialEmail } = props;
	const [name, setName] = useState(initialName || "");
	const [email, setEmail] = useState(initialEmail || "");

   

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		let result = await fetch(
		'http://localhost:5000/update', {
			method: "put",
			body: JSON.stringify({id, name, email }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		result = await result.json();
		console.warn(result);
		if (result) {
			alert("Data updated succesfully");
			setEmail("");
			setName("");
            window.location.reload();

		}
	}
	return (
		<div className="p-4">
  <h1 className="text-2xl font-bold mb-4">Update visitor id: {id}</h1>
  <p>
    visitor id: <small><b>{id}</b></small>
  </p>
  <form>
    <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="bg-gray-100 border border-gray-300 p-2 rounded-md mb-4"
    />
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="bg-gray-100 border border-gray-300 p-2 rounded-md mb-4"
    />
    <button
      type="submit"
      onClick={handleOnSubmit}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
    >
      Save
    </button>
  </form>
</div>

	);
}

export default Update;
