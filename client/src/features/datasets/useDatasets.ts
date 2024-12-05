import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import datasetsApi from './datasetsApi'

// Store
import type { RootState } from '../../store'
import { setDatasetList, setSelectedDataset } from './datasetsSlice'

// Types
import { File } from '../../types'

const useDatasets = () => {
	const currentDatasetList = useSelector(
		(state: RootState) => state.datasets.datasetList,
	)
	const dispatch = useDispatch()

	const selectDataset = async (datasetId: string) => {
		const selectedDataset = currentDatasetList.find(
			(dataset: File) => dataset.id === datasetId,
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
	}
}

export default useDatasets
