const UserModel = require("../models/user");
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken");

// Register new user
 const registerUser = async (req, res) => {
  console.log(req.body)
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const newUser = new UserModel(req.body);
  const {username} = req.body
  try {
    // addition new
    const oldUser = await UserModel.findOne({ username });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    // changed
    const user = await newUser.save();
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// Login User

// Changed
 const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};



const resetUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const {email,password} = req.body

  try {
    // addition new
    const resetUser = await UserModel.findOneAndUpdate(email,{email,password},{useFindAndModify :false,upsert: true}).then((response)=>{
      res.status(200).json({  message: response  });

    })
    .catch((err)=>{
      res.status(200).json({  message: err  });
    })
    // if (userExists)
    // {
    //   await UserModel.findOne();

    //   return res.status(400).json({ message: "User already exists" });

    // }

    // changed
    // const token = jwt.sign(
    //   { email: user.email, id: user._id },
    //   process.env.JWTKEY,
    //   { expiresIn: "1h" }
    // );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateProfilePic = async (req, res) => {
  const {id,imageUrl} = req.body

  try {
    // addition new
     await UserModel.findByIdAndUpdate(id,{
      $set: { profilePic: imageUrl },
    },{useFindAndModify :false,upsert: true,new: true}).then((response)=>{
      res.status(200).json({  message: response  });
    })
    .catch((err)=>{
      res.status(200).json({  message: err  });
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const content =await UserModel.findById(req.params.id);
    res.status(200).json(content);      
} catch (error) {
    res.status(500).json({msg:error});
    console.log(error)
}
};

const updateProfilePage = async (req, res) => {
  const {page} = req.body

  try {
  const updateUser= await UserModel.findByIdAndUpdate(req.params.id,{page},{ new: true }).then((response)=>{
      res.status(200).json({  message: response  });
    })
    .catch((err)=>{
      res.status(200).json({  message: err  });
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};


module.exports = {registerUser,loginUser,resetUser,updateProfilePic, updateProfilePage,getUserDetails}  