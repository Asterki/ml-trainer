import * as React from 'react'
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

export default function TrainRegression() {
	const navigate = useNavigate()
	const { fileID } = useParams()

	const [dataset, setDataset] = React.useState<Record<
		string,
		string[]
	> | null>(null)

	React.useEffect(() => {
		if (fileID === undefined) return navigate('/home')
		;(async () => {
			// TODO: Get only a part of the dataset to preview
			const datasetResponse = await axios.get<string>(
				`${
					import.meta.env.VITE_SERVER_URL
				}/api/files/download?file_id=${fileID}`,
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
							.map(
								(row) => row.split(',')[header.indexOf(column)],
							),
					],
				]),
			)

			setDataset(dataset)

			// Get the plot
			const plotResponse = await axios.get<string>(``)

			const plot = plotResponse.data
			console.log(plot)
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="min-h-screen w-full">
			<main className="w-full flex">
				<section className="p-2 rounded-md border-2 border-neutral-600">
					<h1 className="text-lg">Preview of the current dataset</h1>
					<table className="w-full border">
						<thead className="bg-neutral-500">
							<tr>
								{dataset &&
									Object.keys(dataset).map((column) => (
										<th className="border" key={column}>
											{column}
										</th>
									))}
							</tr>
						</thead>
						<tbody>
							{dataset &&
								dataset[Object.keys(dataset)[0]].map(
									(_, rowIndex) => (
										<tr key={rowIndex}>
											{Object.keys(dataset).map(
												(column) => (
													<td key={column}>
														{
															dataset[column][
																rowIndex
															]
														}
													</td>
												),
											)}
										</tr>
									),
								)}
						</tbody>
					</table>
				</section>
			</main>
		</div>
	)
}
