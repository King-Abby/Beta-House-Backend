const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add your first name"],
    maxlength: [50, "Name must no be more than 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please add your last name"],
    maxlength: [50, "Name must no be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provided your email"],
    unique: [true, "User already exists"],
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [8, "Password must be more than  8 characters"],
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
