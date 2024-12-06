import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { DatasetFile } from '../../types'

export interface DatasetsState {
	datasetList: DatasetFile[]
	selectedDataset: {
		info: DatasetFile
		data: Record<string, string[]> // It is required that I clarify this, this is a preview of the dataset, not the full dataset
		// The full dataset is fetched when the user selects a dataset
	} | null
}

const initialState: DatasetsState = {
	datasetList: [],
	selectedDataset: null,
}

export const datasetsSlice = createSlice({
	name: 'datasets',
	initialState,
	reducers: {
		setDatasetList: (state, action: PayloadAction<DatasetFile[]>) => {
			state.datasetList = action.payload
		},
		setSelectedDataset: (
			state,
			action: PayloadAction<{
				info: DatasetFile
				data: Record<string, string[]>
			} | null>,
		) => {
			state.selectedDataset = action.payload
		},
	},
})

export const { setDatasetList, setSelectedDataset } = datasetsSlice.actions
export default datasetsSlice.reducer
