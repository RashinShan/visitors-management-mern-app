
const mongoose = require('mongoose');
mongoose.connect('add your atlas mongo uri', {
	
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to  database');
   
}) .catch(err=>{
    console.log("error",err);
});
	


const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();


const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");
	
});

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});


app.put('/update', async (req, res) => {
	try {
	  const { id, name, email } = req.body;
  
	  const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
  
	  if (updatedUser) {
		res.json(updatedUser);
	  } else {
		res.status(404).json({ error: 'User not found' });
	  }
	} catch (error) {
	  res.status(500).json({ error: 'Something went wrong' });
	}
  });



  app.delete('/Delete/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
	 
      
      const deletedUser = await User.findOneAndDelete({ _id: userId });
  
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });



app.get('/api/data', async (req, res) => {
	
	try {

	 const data = await User.find();
	
	  res.json(data);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });




app.listen(5000);
