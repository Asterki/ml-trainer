import * as React from 'react'
import { z } from 'zod'

import { useNavigate, useParams } from 'react-router-dom'

import DatasetFeature from '../../features/datasets'
import DialogFeature from '../../features/dialogs'
import TrainingFeature from '../../features/training'

export default function TrainRegression() {
	const navigate = useNavigate()
	const { datasetId } = useParams()

	const { selectedDataset, selectDataset } = DatasetFeature.useDatasets()
	const { alertState, showAlert } = DialogFeature.useAlerts()
	const { submitForTraining } = TrainingFeature.useRegression()

	const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([])
	const [selectedTarget, setSelectedTarget] = React.useState<string | null>(
		null,
	)
	const [selectedModel, setSelectedModel] = React.useState<string>('linear')

	React.useEffect(() => {
		;(async () => {
			if (!selectedDataset && datasetId) {
				await selectDataset(datasetId)
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDataset])

	const trainModelButtonClicked = async () => {
		try {
			// Validate the data entered (Just to be sure)
			const parsedParams = z
				.object({
					selectedFeatures: z.array(z.string()).nonempty(),
					selectedTarget: z.string().refine(
						(target) => {
							// Don't allow features to be the same as the target
							if (selectedFeatures.includes(target)) return false
							return true
						},
						{ message: 'Target cannot be the same as a feature' },
					),
					selectedModel: z.enum([
						'linear',
						'polynomial',
						'ridge',
						'lasso',
					]),
				})
				.parse({
					selectedFeatures,
					selectedTarget,
					selectedModel,
				})

			const result = await submitForTraining(datasetId!, {
				trainingParams: {
					features: parsedParams.selectedFeatures,
					target: parsedParams.selectedTarget,
					model: parsedParams.selectedModel,
				},
			})

			console.log(result)
		} catch (error) {
			if (error instanceof z.ZodError) {
				showAlert(error.errors[0].message, 'error')
			}
		}
	}

	return (
		<div className="min-h-screen w-full">
			<DialogFeature.AlertComponent
				type={alertState.type}
				message={alertState.message}
				showing={alertState.showing}
			/>

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
							<b>Selected dataset:</b>{' '}
							{selectedDataset.info.filename}
						</p>
					)}
				</div>

				<div className="p-2">
					<section className="flex items-start justify-center gap-2">
						<div className="p-2 rounded-md border-2 border-neutral-600 w-1/2 shadow-md">
							<h2 className="text-xl font-bold">
								Select Features
							</h2>

							<p>
								These are the columns you want to use to predict
								the result. These columns should be numeric
								values.
							</p>

							<ul>
								{selectedDataset?.info.headers
									.split(',')
									.map((item) => {
										return (
											<li key={item}>
												<label>
													<input
														type="checkbox"
														checked={selectedFeatures.includes(
															item,
														)}
														className="mr-2"
														onChange={(e) => {
															if (
																e.target.checked
															) {
																setSelectedFeatures(
																	[
																		...selectedFeatures,
																		item,
																	],
																)
															} else {
																setSelectedFeatures(
																	selectedFeatures.filter(
																		(f) =>
																			f !==
																			item,
																	),
																)
															}
														}}
													/>
													{item}
												</label>
											</li>
										)
									})}
							</ul>
						</div>

						<div className="p-2 rounded-md border-2 border-neutral-600 w-1/2 shadow-md">
							<h2 className="text-xl font-bold">Select Result</h2>

							<p>
								This is the target column you want to predict.
								This column should be a numeric value.
							</p>

							<p className="text-netural-600">
								Looking for classification?{' '}
								<a href="/train/classification">Click here</a>
							</p>

							<ul>
								{selectedDataset?.info.headers
									.split(',')
									.map((item) => {
										return (
											<li key={item}>
												<label>
													<input
														type="checkbox"
														checked={
															selectedTarget ===
															item
														}
														className="mr-2"
														onChange={(e) => {
															if (
																e.target.checked
															) {
																setSelectedTarget(
																	item,
																)
															} else {
																setSelectedTarget(
																	null,
																)
															}
														}}
													/>
													{item}
												</label>
											</li>
										)
									})}
							</ul>
						</div>
					</section>

					<section className="p-2 rounded-md border-2 border-neutral-600 shadow-md mt-2">
						<h2 className="text-xl font-bold">Model to Use</h2>

						<p>
							You can select the model you want to use to train
							your dataset.
						</p>

						<select
							name=""
							id=""
							className="w-full p-2"
							onChange={(e) => setSelectedModel(e.target.value)}
						>
							<option value="linear">Linear Regression</option>
							<option value="polynomial">
								Polynomial Regression
							</option>
							<option value="ridge">Ridge Regression</option>
							<option value="lasso">Lasso Regression</option>
						</select>
					</section>

					<section>
						<button
							className="btn-primary mt-2"
							onClick={trainModelButtonClicked}
						>
							Train Model
						</button>
					</section>

					<section className="p-2 rounded-md border-2 border-neutral-600 shadow-md mt-2">
						{selectedDataset ? (
							<DatasetFeature.DatasetPreviewComponent
								dataset={selectedDataset!.data}
								info={selectedDataset!.info}
								recordCount={2}
							/>
						) : (
							<p>No dataset selected</p>
						)}
					</section>
				</div>
			</main>
		</div>
	)
}
