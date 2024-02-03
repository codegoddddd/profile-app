const userModal = require('./modal')

// Create a new user
const adduser = async(req, res) =>{
    const {fullname, email, password, mobile, gender, address, birthdate, education} = req.body;
    
    try{
        const userdata = new userModal({
            fullname, email, password, mobile, gender, address, birthdate, education
        })

        const data = await userdata.save();
        res.status(200).send({data});
    }
    catch(error){
        console.log(error);
        res.status(400).send({error});
    }
}

// Get all user data
const getdata = async(req, res) =>{
    try{
        const userdata = await userModal.find();
        res.status(200).send({userdata});
    }
    catch(err){
        console.log(err);
        res.status(400).send({err});
    }
    
}

// Find a user by emai
const finduser = async(req, res) =>{
    try{
        const {email} = req.params;

        const data = await userModal.findOne({email});

        if(data){
            res.status(200).send({ data, msg: "User found" });
        }else{
            res.status(400).send({msg: "User not found"});
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({err, msg: "User not found"});
    }
}

// Login user with email and password
const loginUser = async(req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await userModal.findOne({email, password});

        if(user){
            res.status(200).send({ msg: 'Login successful', email: user.email });
        }else{
            res.status(400).send({ msg: 'Invalid email or password' });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({ msg : 'Internal server error' });
    }
}

// Update user data by email
const updateuser = async(req, res) =>{
    try{
        const {email} = req.params;
        const {fullname, password, mobile, gender, address, birthdate, education} = req.body;

        const data = await userModal.updateOne(
            {email},
            {
                $set : {fullname, password, mobile, gender, address, birthdate, education}
            }
        )

        if(data.modifiedCount > 0){
            res.status(200).send({msg : "Data updated successfully"});
        }
        else{
            res.status(400).send({msg : "Data not updated successfully"});
        }
    }
    catch(err){
        console.log(err);
        res.status(400).send({err});
    }
}

const deleteuser = async(req, res)=>{
    try{
        const {email} = req.params;

        const data = await userModal.deleteOne(
            {email}
        )

        res.status(200).send({msg : "User deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(400).send({msg : "User NOT deleted successfully"})
    }
}

module.exports = {adduser, getdata, finduser, loginUser, updateuser, deleteuser}