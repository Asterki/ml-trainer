import React from 'react'
import { motion } from 'framer-motion'

import {
	FaTimes,
	FaInfoCircle,
	FaExclamationTriangle,
	FaCheckCircle,
} from 'react-icons/fa'

interface AlertsComponentProps {
	showing: boolean
	type: 'success' | 'error' | 'warning' | 'info'
	message: string
}

const AlertComponent: React.FC<AlertsComponentProps> = ({
	type,
	message,
	showing,
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
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: showing ? 1 : 0 }}
			exit={{ opacity: 0 }}
			className={`absolute bottom-2 left-2 flex items-center p-2 bg-neutral-700 shadow-md border-l-4 border-${color}-500`}
		>
			<div className="p-2">
				{React.createElement(icon, { className: `text-${color}-500` })}
			</div>
			<div className="p-2">
				<p className={`text-${color}-700`}>{message}</p>
			</div>
		</motion.div>
	)
}

export default AlertComponent
