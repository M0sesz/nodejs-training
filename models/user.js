const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
  {
    name: {
      type: String,
      reqired: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      reqired: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 6,
      reqired: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: String,
    verifyToken: {
      type: String,
      default: null,
      required: [true, "Verify token is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },

  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter")
    .required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
