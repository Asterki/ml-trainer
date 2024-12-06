import React from 'react'

import { DatasetFile } from '../../../types'

interface DatasetPreviewComponentProps {
	info: DatasetFile
	dataset: Record<string, string[]> 
	recordCount: number // The amount of records to display
}

const DatasetPreviewComponent: React.FC<DatasetPreviewComponentProps> = ({
	dataset,
	info,
	recordCount,
}) => {
	return (
		<div>
			<h1>{info.filename} Preview</h1>

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
						dataset[Object.keys(dataset)[0]].map((_, rowIndex) => (
							<tr key={rowIndex}>
								{Object.keys(dataset).map((column) => (
									<td className="border" key={column}>
										{dataset[column][rowIndex]}
									</td>
								))}
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default DatasetPreviewComponent
