import * as React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'

// Icons
import { IoStatsChartOutline } from 'react-icons/io5'
import { MdGroupWork } from 'react-icons/md'
import { GrCluster } from 'react-icons/gr'

import datasetsFeature from '../features/datasets'
import { FaTrash } from 'react-icons/fa'

export default function Index() {
	const navigate = useNavigate()

	const { currentDatasetList, selectDataset, deleteDataset } =
		datasetsFeature.useDatasets()

	const [currentSlide, setCurrentSlide] = React.useState(0)
	const [fileID, setFileID] = React.useState<string | null>(null)
	const [selectedMLType, setSelectedMLType] = React.useState<
		'regression' | 'clustering' | 'classification' | null
	>(null)

	const fileRef = React.useRef<HTMLInputElement>(null)

	const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const formData = new FormData()
		formData.append('file', file)

		try {
			const res = await axios.post<{
				file_id: string
				message: string
			}>(
				`${import.meta.env.VITE_SERVER_URL}/api/files/upload`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			)

			setFileID(res.data.file_id)
			setCurrentSlide(1)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="min-h-screen w-full">
			<main className="w-full flex">
				<motion.div
					variants={{
						hidden: {
							opacity: 0,
							transitionEnd: {
								display: 'none',
							},
						},
						visible: { opacity: 1, display: 'flex' },
					}}
					initial="hidden"
					animate={currentSlide === 0 ? 'visible' : 'hidden'}
					className="flex flex-col items-center w-full h-screen justify-center"
				>
					<img src="/favicon.svg" className="w-32" />

					<h1 className="text-3xl text-center font-bold">
						ML Trainer!
					</h1>
					<p>
						By{' '}
						<a
							className="underline"
							target="_blank"
							href="https://github.com/Asterki"
						>
							Asterki
						</a>
					</p>
					<button
						className="btn-primary mt-3"
						onClick={() => fileRef.current?.click()}
					>
						Upload Dataset
					</button>
					<p className="text-neutral-500 text-sm">
						Formats accepted: *.csv
					</p>

					<input
						type="file"
						ref={fileRef}
						onChange={uploadFile}
						className="hidden"
						accept=".csv"
					/>

					<motion.div
						variants={{
							hidden: {
								opacity: 0,
								transitionEnd: {
									display: 'none',
								},
							},
							visible: { opacity: 1, display: 'flex' },
						}}
						initial="hidden"
						animate={
							currentDatasetList.length !== 0
								? 'visible'
								: 'hidden'
						}
						style={{ width: '50%' }}
						className="border-2 rounded-md border-neutral-600 p-2 flex flex-col mt-8 max-h-96 overflow-y-auto"
					>
						<p className="text-md font-semibold text-center mb-2">
							Or load a file that you've already uploaded
						</p>

						{currentDatasetList.map((file) => (
							<div
								key={file.id}
								className="flex group items-center gap-2 cursor-pointer p-2 rounded-md transition-all justify-between hover:bg-gray-400/10"
								onClick={() => {
									setFileID(file.id)
									selectDataset(file.id)
									setCurrentSlide(1)
								}}
							>
								<div className="flex gap-2 items-center justify-center">
									<p>{file.filename}</p>
									<p className="text-neutral-500 text-sm">
										{file.createdAt} ({file.id})
									</p>
								</div>
								<div
									className="group-hover:opacity-100 opacity-0 transition-all flex gap-2 items-center justify-center hover:bg-white/20 rounded-full w-6 h-6"
									onClick={(e) => {
										e.stopPropagation()
										deleteDataset(file.id)
									}}
								>
									<FaTrash className="text-red-500" />
								</div>
							</div>
						))}
					</motion.div>
				</motion.div>

				<motion.div
					variants={{
						hidden: {
							opacity: 0,
							transitionEnd: {
								display: 'none',
							},
						},
						visible: {
							opacity: 1,
							display: 'flex',
							transition: {
								delay: 0.5,
							},
						},
					}}
					initial="hidden"
					animate={currentSlide === 1 ? 'visible' : 'hidden'}
					className="flex flex-col items-center w-full h-screen justify-center"
				>
					<h1 className="text-2xl font-bold text-center my-2">
						Type of Machine Learning to apply
					</h1>
					<div className="flex items-center justify-center gap-2 w-full">
						<div
							className="w-3/12 rounded-md border-2 border-neutral-600 shadow-md p-4 flex items-center justify-center flex-col gap-2 group transition-all hover:bg-gray-200/10 cursor-pointer"
							onClick={() => setSelectedMLType('regression')}
						>
							<IoStatsChartOutline
								className={`text-[7rem] group-hover:text-blue-500 transition-all ${
									selectedMLType == 'regression'
										? 'text-blue-500'
										: ''
								}`}
							/>
							<p>Regression</p>
							<p className="text-gray-400">
								Best for linear datasets
							</p>
						</div>

						<div
							className="w-3/12 rounded-md border-2 border-neutral-600 shadow-md p-4 flex items-center justify-center flex-col gap-2 group transition-all hover:bg-gray-200/10 cursor-pointer"
							onClick={() => setSelectedMLType('classification')}
						>
							<GrCluster
								className={`text-[7rem] group-hover:text-blue-500 transition-all ${
									selectedMLType == 'classification'
										? 'text-blue-500'
										: ''
								}`}
							/>
							<p>Classification</p>
							<p className="text-gray-400">
								Best for categorical datasets
							</p>
						</div>
						<div
							className="w-3/12 rounded-md border-2 border-neutral-600 shadow-md p-4 flex items-center justify-center flex-col gap-2 group transition-all hover:bg-gray-200/10 cursor-pointer"
							onClick={() => setSelectedMLType('clustering')}
						>
							<MdGroupWork
								className={`text-[7rem] group-hover:text-blue-500 transition-all ${
									selectedMLType == 'clustering'
										? 'text-blue-500'
										: ''
								}`}
							/>
							<p>Clustering</p>
							<p className="text-gray-400">
								Best for grouping similar data
							</p>
						</div>
					</div>

					<button
						className="btn-primary mt-3"
						onClick={() => {
							if (!selectedMLType) return
							navigate(`/train/${selectedMLType}/${fileID}`)
						}}
					>
						Next
					</button>

					<button
						className="btn-danger mt-3"
						onClick={() => {
							setCurrentSlide(0)
							setSelectedMLType(null)
						}}
					>
						Back
					</button>
				</motion.div>
			</main>
		</div>
	)
}
