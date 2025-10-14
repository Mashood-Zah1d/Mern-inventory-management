import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  refreshToken: {
    type: String,
  },
}, { timestamps: true });


adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

adminSchema.methods.AccessToken = async function () {
  jwt.sign(
    {id : this._id,
     username: this.username,
     email : this.email
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn:process.env.ACCESS_TOKEN_SECRET_KEY
    }
  )
}
adminSchema.methods.RefreshToken = async function () {
  jwt.sign(
    {id : this._id,},
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRE_IN
    }
  )
}

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
