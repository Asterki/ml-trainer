import axios from 'axios'

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
	const { trainingParams } = params
	const { features, target, model } = trainingParams

	const { data } = await axios.post(
		`http://localhost:5000/api/train/regression/${datasetId}`,
		{
			features,
			target,
			model,
		},
	)

	return data
}

export default { submitForTraining }
