import { configureStore } from '@reduxjs/toolkit'

import datasetReducer from './features/datasets/datasetsSlice'

export const store = configureStore({
	reducer: {
		datasets: datasetReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
