import { useState } from 'react'

// This hook is used to show alerts, dialogs and modals to the user
const useDialogs = () => {
	const [alertState, setAlertState] = useState<{
		showing: boolean
		message: string
		type: 'success' | 'error' | 'warning' | 'info'
	}>({
		showing: false,
		message: '',
		type: 'info',
	})

	const showAlert = (
		message: string,
		type: 'success' | 'error' | 'warning' | 'info',
	) => {
		setAlertState({
			showing: true,
			message,
			type,
		})
		setTimeout(() => {
			setAlertState({
				message,
				type, // This is because the fade out animation shows the alert in its initial state
				showing: false,
			})
		}, 5000)
	}

	return {
		showAlert,
		alertState,
	}
}

export default useDialogs
