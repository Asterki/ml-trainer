import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import datasetsApi from './datasetsApi'

// Store
import type { RootState } from '../../store'
import { setDatasetList, setSelectedDataset } from './datasetsSlice'

// Types
import { DatasetFile } from '../../types'

const useDatasets = () => {
	const currentDatasetList = useSelector(
		(state: RootState) => state.datasets.datasetList,
	)
	const dispatch = useDispatch()

	const selectDataset = async (datasetId: string) => {
		const selectedDataset = currentDatasetList.find(
			(dataset: DatasetFile) => dataset.id === datasetId,
		)

		if (!selectedDataset) return false

		dispatch(
			setSelectedDataset({
				data: {
					...(await datasetsApi.fetchDatasetPreview(datasetId)),
				},
				info: selectedDataset,
			}),
		)

		return true
	}

	const deleteDataset = async (datasetId: string) => {
		await datasetsApi.deleteDataset(datasetId)
		dispatch(setDatasetList(await datasetsApi.fetchDatasetList()))
	}

	const uploadDataset = async (file: File) => {
		const formData = new FormData()
		formData.append('file', file)

		try {
			const res = await datasetsApi.uploadDataset(formData)
			dispatch(setDatasetList(await datasetsApi.fetchDatasetList()))

			return res
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		;(async () => {
			dispatch(setDatasetList(await datasetsApi.fetchDatasetList()))
		})()

		return () => {
			dispatch(setSelectedDataset(null))
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		currentDatasetList,
		selectDataset,
		deleteDataset,
		uploadDataset,
	}
}

export default useDatasets
