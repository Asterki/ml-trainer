import regressionApi from '../services/regressionApi'

const useRegression = () => {
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
		regressionApi.submitForTraining(datasetId, params)
	}

	return {
		submitForTraining,
	}
}

export default useRegression
