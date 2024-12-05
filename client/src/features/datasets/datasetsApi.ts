import axios from 'axios'

// Types
import { File } from '../../types'

const endPoint = `${import.meta.env.VITE_SERVER_URL}/api/files`

const fetchDatasetPreview = async (datasetId: string) => {
	const datasetResponse = await axios.get<string>(
		`${endPoint}/download?file_id=${datasetId}`,
	)
	const headerRow = datasetResponse.data.split('\n')[0]
	const header = headerRow.split(',')

	const dataset = Object.fromEntries(
		header.map((column) => [
			column,
			[
				...datasetResponse.data
					.replace('\r', '')
					.split('\n')
					.slice(1)
					.map((row) => row.split(',')[header.indexOf(column)]),
			],
		]),
	)

	return dataset
}

const downloadDataset = async (datasetId: string) => {
	const datasetResponse = await axios.get<string>(
		`${endPoint}/download?file_id=${datasetId}`,
	)

	return datasetResponse.data
}

const deleteDataset = async (datasetId: string) => {
	const deleteResponse = await axios.post<string>(`${endPoint}/delete`, {
		file_id: datasetId,
	})

	return deleteResponse.data
}

const fetchDatasetList = async () => {
	const response = await axios.get<{
		files: File[]
	}>(`${endPoint}/list`)

	return response.data.files
}

export default {
	fetchDatasetPreview,
	downloadDataset,
	deleteDataset,
	fetchDatasetList,
}
