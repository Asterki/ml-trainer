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
		path: '/train/classification/:fileID',
		element: <TrainClassification />,
	},
	{
		path: '/train/regression/:fileID',
		element: <TrainRegression />,
	},
	{
		path: '/train/clustering/:fileID',
		element: <TrainClustering />,
	},
])

export default router
