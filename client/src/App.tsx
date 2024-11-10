import axios from "axios"

export default function App() {
	const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const formData = new FormData()
		formData.append("file", file)

		try {
			const res = await axios.post("http://localhost:3000/api/files/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			console.log(res.data)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="min-h-screen">
			<main>
				<h1 className="text-3xl text-center mt-8">Hello World!</h1>

				<input type="file" name="" id="" onChange={uploadFile} />
			</main>
		</div>
	)
}
