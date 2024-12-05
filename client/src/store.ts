import { configureStore } from '@reduxjs/toolkit'

import datasetsFeature from './features/datasets/'

export const store = configureStore({
	reducer: {
		datasets: datasetsFeature.datasetsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
