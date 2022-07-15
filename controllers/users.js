const User = require("../models/UserModel");

const addUser = async (user) => {
  try {
    const newUser = new User(user);
    await newUser.save();
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (id) => {
  try {
    const user = await User.findOne({ id: id });
    return user;
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (id) => {
  try {
    await User.deleteOne({ id: id });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { addUser, getUser, deleteUser, getUsers };
