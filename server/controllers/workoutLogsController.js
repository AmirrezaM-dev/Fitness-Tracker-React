const expressAsyncHandler = require("express-async-handler")
const WorkoutLogs = require("../models/workoutLogsModel")

const save = expressAsyncHandler(async (req, res) => {
	const { selectedDate, selectedWorkout, weight, reps, duration } = req.body

	const workoutLog = await WorkoutLogs.create({
		user: req.user.id,
		selectedDate,
		selectedWorkout,
		weight,
		reps,
		duration,
	})

	if (workoutLog) {
		res.status(201).json({ id: workoutLog.id })
	} else {
		res.status(400)
		throw new Error("Invalid user data")
	}
})
const get = expressAsyncHandler(async (req, res) => {
	const { selectedDate, selectedWorkout } = req.body

	const workoutLogs = await WorkoutLogs.find({
		user: req.user.id,
		selectedDate,
		selectedWorkout,
	}).select("-user -selectedDate -selectedWorkout -createdAt -updatedAt -__v")
	if (workoutLogs) {
		res.status(200).json({ workoutLogs })
	} else {
		res.status(400)
		throw new Error("Invalid user data")
	}
})
const deleteLogs = expressAsyncHandler(async (req, res) => {
	const { id } = req.body
	await WorkoutLogs.findOneAndDelete({
		user: req.user.id,
		_id: id,
	})
	res.status(200).json({})
})

module.exports = {
	save,
	get,
	deleteLogs,
}