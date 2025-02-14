const dotenv = require("dotenv");
const { registerUser, loginUser, infoUser } = require("../services/userServices");

dotenv.config();

//          register handler
const registerHandler = async (req, res) => {
    const { fullName, email, dateOfBirth, gender, country, password } =  req.body;

    try {
        //  Check if the user exists in the db 
        const result = await registerUser( fullName, email, dateOfBirth, gender, country, password);

        return res.status(201).json({ message: "Registered Successfully"});
    } catch (error) {
        console.error(error);

        if(error.status) {
            return res.status(error.status).json({ message: error.message });
        };

        return res.status(500).json({ message: "An error occured" });
    }
};

//          login handler
const loginHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await loginUser(email, password);

        return res.status(200).json({ message: "Logged in Successfully", result });
    } catch (error) {
        console.error(error);
        
        if(error.status) {
            return res.status(error.status).json({ message: error.message });
        };

        return res.status(500).json({ message: "An Error Occured" });
    }
};

//          user info handler
const infoHandler = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "User ID is missing or invalid" });
    }; 

    try {
        const userInfo = await infoUser(email);

        return res.status(200).json({ message: "Fetched user info.", userInfo });
    } catch (error) {
        console.error(error);

        if(error.status) {
            return res.status(error.status).json({ message: error.message });
        };

        return res.status(500).json({ message: "An error occured" });
    }
};

module.exports = { registerHandler, loginHandler, infoHandler };