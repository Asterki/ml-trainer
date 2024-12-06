import axios from 'axios'

// Types
import { DatasetFile } from '../../types'

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
		files: DatasetFile[]
	}>(`${endPoint}/list`)

	return response.data.files
}

const uploadDataset = async (formData: FormData) => {
	const response = await axios.post<{
		file_id: string
		message: string
	}>(`${endPoint}/upload`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})

	return response.data
}

export default {
	fetchDatasetPreview,
	downloadDataset,
	deleteDataset,
	fetchDatasetList,
	uploadDataset,
}
