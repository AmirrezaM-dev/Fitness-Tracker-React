const mongoose = require("mongoose")
const workoutLogsSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		selectedDate: {
			type: Date,
		},
		selectedWorkout: {
			type: String,
		},
		weight: {
			type: String,
		},
		reps: {
			type: String,
		},
		duration: {
			type: String,
		},
	},
	{ timestamps: true }
)
module.exports = mongoose.model("WorkoutLogs", workoutLogsSchema)
