const UserModel = require("../model/userModel");
const moment = require("moment");
const {
  isValidString,
  isValidEmail,
  isValidPhone,
} = require("../utility/helper");

//------------------------handler for new user registration--------------------------
const newUserRegistration = async (req, res) => {
  try {
    //destructuring input fields from request headers
    let { phonenumber, name, email, DOB, gender } = req.headers;
    console.log(req.headers);

    // validating phone number
    if (!isValidPhone(phonenumber)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid phone number" });
    }

    //validating name
    if (!isValidString(name)) {
      return res.status(400).send({ status: false, message: "Invalid name" });
    }

    // validating email
    if (!isValidEmail(email)) {
      return res.status(400).send({ status: false, message: "Invalid email" });
    }

    // validating DOB
    if (!moment(DOB).isValid()) {
      return res.status(400).send({ status: false, message: "Invalid DOB" });
    }

    DOB = moment(DOB).format("MM/DD/YYYY");

    //validating gender
    if (!isValidString(gender)) {
      return res.status(400).send({ status: false, message: "Invalid gender" });
    }

    //creating new user from inoput data and saving it to DB

    const details = {
      name: name,
      email: email,
      phoneNumber: phonenumber,
      DOB: DOB,
      gender: gender,
    };

    // checking if phone number is available in DB or not

    const isPhoneNumberAvailable = await UserModel.find({
      phoneNumber: phonenumber,
    });

    //if no user found by this phone number, returning null in response
    if (isPhoneNumberAvailable) {
      return res
        .status(404)
        .send({ status: false, message: "Phone number already exists" });
    }
    const newUser = await UserModel.create(details);
    return res.status(201).send({ status: true, data: newUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//----------------handler for checking user with given phone number exists or not--------------------
const checkUser = async (req, res) => {
  try {
    const { phonenumber } = req.headers;

    // validating phone number
    if (!isValidPhone(phonenumber)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid phone number" });
    }

    // checking if phone number is available in DB or not

    const isPhoneNumberAvailable = await UserModel.find({
      phoneNumber: phonenumber,
    });

    //if no user found by this phone number, returning null in response
    if (!isPhoneNumberAvailable) {
      return res.status(404).send("null");
    }

    //if user found, sending user details in response
    res.status(200).send({ status: true, data: isPhoneNumberAvailable });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
module.exports = { newUserRegistration, checkUser };
