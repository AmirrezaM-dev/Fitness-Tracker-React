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
	const {
		selectedDate,
		selectedWorkout,
		searchTerm,
		numColumns,
		currentPage,
	} = req.body
	let find = { user: req.user.id }
	if (selectedDate) find = { ...find, selectedDate }
	if (selectedWorkout) find = { ...find, selectedWorkout }
	if (searchTerm) find = { ...find, $text: { $search: searchTerm } }
	const workoutLogs = await WorkoutLogs.find(find)
		.select("-user -createdAt -updatedAt -__v")
		.skip((currentPage - 1) * (numColumns || 10))
		.limit(numColumns || 10)
	if (workoutLogs) {
		res.status(200).json({ workoutLogs })
	} else {
		res.status(400)
		throw new Error("Invalid user data")
	}
})
const getCount = expressAsyncHandler(async (req, res) => {
	const { selectedDate, selectedWorkout, searchTerm } = req.body

	// Build the base query
	const query = { user: req.user.id }

	// Add optional filters to the query
	if (selectedDate) {
		query.selectedDate = selectedDate
	}
	if (selectedWorkout) {
		query.selectedWorkout = selectedWorkout
	}
	if (searchTerm) {
		query.$text = { $search: searchTerm }
	}

	try {
		// Count documents that match the query
		const count = await WorkoutLogs.countDocuments(query)

		if (count !== null || count !== undefined) {
			// Respond with the count
			res.status(200).json({ count })
		} else {
			// No matching documents found
			res.status(404).json({
				message: "No workout logs found for the given criteria.",
			})
		}
	} catch (error) {
		// Handle errors
		console.error("Error fetching workout logs:", error)
		res.status(500).json({
			message: "Server error while fetching workout logs.",
		})
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
	getCount,
	deleteLogs,
}
