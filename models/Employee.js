import { Int32 } from "mongodb";
import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: [true, "First name is required!"],
		trim: true,
	},

	lname: {
		type: String,
		required: [true, "Last name is required!"],
		trim: true,
	},

	email: {
		type: String,
		required: [true, "Email is required!"],
		trim: true,
	},

	address: {
		type: String,
		required: [true, "Address is required!"],
		trim: true,
	},

	phone: {
		type: String,
		required: [true, "Phone is required!"],
		trim: true,
	},

	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Employee ||
	mongoose.model("Employee", EmployeeSchema);
