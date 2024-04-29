import React, { useState } from "react"
import MuscleSelector from "./MuscleSelector"
import WorkoutForm from "./WorkoutForm"

const SetLogs = () => {
	const [selectedWorkout, setSelectedWorkout] = useState(null)

	const handleWorkoutSelect = (workout) => {
		setSelectedWorkout(workout)
	}

	return (
		<div>
			<MuscleSelector
				onWorkoutSelect={handleWorkoutSelect}
				selectedWorkout={selectedWorkout}
			/>
			{selectedWorkout && (
				<div className="container mt-4 text-center">
					<h3>Selected Workout: {selectedWorkout}</h3>
					<WorkoutForm />
				</div>
			)}
		</div>
	)
}

export default SetLogs
