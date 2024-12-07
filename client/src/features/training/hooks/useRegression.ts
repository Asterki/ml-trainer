import { useState } from "react"

import regressionApi from '../services/regressionApi'

const useRegression = () => {
	const [regressionTrainingStatus, setRegressionTrainingStatus] = useState<"not-started" | "training" | "complete" | "error">("not-started")

	const submitForTraining = async (
		datasetId: string,
		params: {
			trainingParams: {
				features: string[]
				target: string
				model: string
			}
			// Left clear for further implementation
		},
	) => {
		try {
			setRegressionTrainingStatus("training")
			const result = await regressionApi.submitForTraining(datasetId, params)

			setRegressionTrainingStatus("complete")
			return result
		}
		catch (error) {
			setRegressionTrainingStatus("error")
			throw error
		}
	}


	return {
		submitForTraining,
		regressionTrainingStatus
	}
}


export default useRegression
