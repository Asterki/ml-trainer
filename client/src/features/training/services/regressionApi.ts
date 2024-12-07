import axios from 'axios'

const endPoint = `${import.meta.env.VITE_SERVER_URL}/api/training`

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
	const { data } = await axios.post<{
		message: string
		modelId: string
		accuracy: number
		success: boolean
	}>(
		`${endPoint}/regression`,
		{
			datasetId: datasetId,
			params: params
		},
	)

	return data
}

export default { submitForTraining }
