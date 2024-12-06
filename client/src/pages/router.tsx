import { createBrowserRouter } from 'react-router-dom'

import IndexPage from './index'

import TrainClassification from './train/classification'
import TrainRegression from './train/regression'
import TrainClustering from './train/clustering'

const router = createBrowserRouter([
	{
		path: '/',
		element: <IndexPage />,
	},

	// Train
	{
		path: '/train/classification/:datasetId',
		element: <TrainClassification />,
	},
	{
		path: '/train/regression/:datasetId',
		element: <TrainRegression />,
	},
	{
		path: '/train/clustering/:datasetId',
		element: <TrainClustering />,
	},
])

export default router
