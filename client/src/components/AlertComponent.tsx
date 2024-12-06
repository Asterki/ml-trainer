import React from 'react'

import {
	FaTimes,
	FaInfoCircle,
	FaExclamationTriangle,
	FaCheckCircle,
} from 'react-icons/fa'

interface AlertsComponentProps {
	type: 'success' | 'error' | 'warning' | 'info'
	className?: string
	message: string
}

const AlertComponent: React.FC<AlertsComponentProps> = ({
	type,
	message,
	className,
}) => {
	let icon = FaTimes
	let color = 'red'

	switch (type) {
		case 'success':
			icon = FaCheckCircle
			color = 'green'
			break
		case 'info':
			icon = FaInfoCircle
			color = 'blue'
			break
		case 'warning':
			icon = FaExclamationTriangle
			color = 'orange'
			break
		case 'error':
			icon = FaTimes
			color = 'red'
			break
	}

	return (
		<div
			className={`flex items-center p-2 bg-neutral-700 shadow-md border-l-4 border-${color}-500 ${className}`}
		>
			<div className="p-2">
				{React.createElement(icon, { className: `text-${color}-500` })}
			</div>
			<div className="p-2">
				<p className={`text-${color}-700`}>{message}</p>
			</div>
		</div>
	)
}

export default AlertComponent
