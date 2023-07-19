import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.updateLoggedIn = function () {
  return this.model("User").findOneAndUpdate(
    {
      email: this.email,
    },
    { lastLoggedIn: new Date() }
  );
};

const User = model("User", userSchema);

export default User;
