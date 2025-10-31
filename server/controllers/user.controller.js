import User from "../models/user.model.js";

const sanitizeUser = (userDoc) => {
  if (!userDoc) return null;
  return {
    _id: userDoc._id,
    name: userDoc.name,
    email: userDoc.email,
    role: userDoc.role,
    createdAt: userDoc.createdAt,
    updatedAt: userDoc.updatedAt,
  };
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({
    message: "Users fetched successfully",
    users: users.map(sanitizeUser),
  });
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res
    .status(200)
    .json({ message: "User fetched successfully", user: sanitizeUser(user) });
};

// @desc    Create a user
// @route   POST /api/users
// @access  Public
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  res.status(201).json({
    message: "User created successfully",
    user: sanitizeUser(user),
  });
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  const updated = await User.findById(req.params.id).select("-password");
  res.status(200).json({
    message: "User updated successfully",
    user: sanitizeUser(updated),
  });
};

// @desc    Delete a user

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User deleted successfully" });
};

// @desc    Update current authenticated user
// @route   PUT /api/users/me
// @access  Private
const updateCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  const updatedUser = await user.save();

  res.status(200).json({
    message: "Profile updated successfully",
    user: sanitizeUser(updatedUser),
  });
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateCurrentUser,
};
