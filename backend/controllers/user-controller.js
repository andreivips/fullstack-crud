const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const page = Math.abs(req.query.page-1) || 0;
    const per_page = Math.abs(req.query.per_page) || 10;
    const sort = req.query.sort || '_id';
    const order = req.query.order === 'desc' ? -1 : 1;

    const data = await User.find()
      .lean()
      .sort({ [sort]: order })
      .skip(page * per_page)
      .limit(per_page);

    const total = await User.countDocuments();

    res.json({
      data,
      total,
      page: page+1,
      per_page
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching users",
      error: err.message,
    });
  }
}

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching user",
      error: err.message,
    });
  }
}

const createUser = async (req, res) => {
  const { name, age, email, interests, address } = req.body;

  if (!name || !age || !email|| !interests || !address) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  const user = new User({
    name,
    age,
    email,
    interests,
    address,
  });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({
      message: "Error creating user",
      error: err.message,
    });
  }
}

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({
      message: "Error updating user",
      error: err.message,
    });
  }
}

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting user",
      error: err.message,
    });
  }
}

module.exports = {
  getAllUsers, getUserById, createUser, updateUserById, deleteUserById
}