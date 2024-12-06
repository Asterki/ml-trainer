import * as React from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import DatasetFeature from '../../features/datasets'

export default function TrainRegression() {
	const navigate = useNavigate()
	const { datasetId } = useParams()

	const { selectedDataset, selectDataset } = DatasetFeature.useDatasets()

	React.useEffect(() => {
		if (!selectedDataset && datasetId) {
			selectDataset(datasetId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="min-h-screen w-full">
			<main className="w-full flex flex-col">
				<div className="p-2 flex gap-2 items-center">
					<button
						className="btn-primary"
						onClick={() => navigate('/')}
					>
						Back to datasets
					</button>

					{selectedDataset && (
						<p className="text-neutral-500">
							Selected dataset: {selectedDataset.info.filename}
						</p>
					)}
				</div>

				<section className="p-2 rounded-md border-2 border-neutral-600">
					{selectedDataset ? (
						<DatasetFeature.DatasetPreviewComponent
							dataset={selectedDataset!.data}
							info={selectedDataset!.info}
						/>
					) : (
						<p>No dataset selected</p>
					)}
				</section>
			</main>
		</div>
	)
}
