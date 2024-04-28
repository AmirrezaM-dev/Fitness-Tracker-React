import { createContext, useContext, useState } from "react"
import Swal from "sweetalert2"

const MainContent = createContext()
export function useMain() {
	return useContext(MainContent)
}

const MainComponent = ({ children }) => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer)
			toast.addEventListener("mouseleave", Swal.resumeTimer)
		},
	})
	const [filterChats, setFilterChats] = useState("All Chats")
	const [showNewChat, setShowNewChat] = useState(false)
	const [showCreateGroup, setShowCreateGroup] = useState(false)
	const [showAddContact, setShowAddContact] = useState(false)
	const [showDeleteContact, setShowDeleteContact] = useState(false)
	const [showBlockContact, setShowBlockContact] = useState(false)
	const [showNotifications, setShowNotifications] = useState(false)
	const [showInviteOthers, setShowInviteOthers] = useState(false)
	const [showPreloader, setShowPreloader] = useState(false)
	const [showDeleteMessage, setShowDeleteMessage] = useState(false)
	const [showDeleteAllMessage, setShowDeleteAllMessage] = useState(false)
	const [showEditMessage, setShowEditMessage] = useState(false)
	const copyText = (text) => {
		var TempText = document.createElement("input")
		TempText.value = text
		document.body.appendChild(TempText)
		TempText.select()
		document.execCommand("copy")
		document.body.removeChild(TempText)
		Toast.fire({
			icon: "success",
			title: "Message copied",
			timer: 1000,
		})
	}

	const formatDate = (date) => {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear()

		if (month.length < 2) month = "0" + month
		if (day.length < 2) day = "0" + day

		return [year, month, day].join("-")
	}
	const timeSince = (date) => {
		const second = Math.floor((new Date() - new Date(date)) / 1000)
		const days = second / 86400
		const hours = second / 3600
		const seconds = second / 60
		if (days > 1) {
			return new Date(date).toLocaleString("en-US", {
				year: "2-digit",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			})
		} else if (hours > 1) {
			return (
				Math.floor(hours) +
				` hour${Math.floor(hours) === 1 ? "" : "s"} ago`
			)
		} else if (seconds > 1) {
			return (
				Math.floor(seconds) +
				` minute${Math.floor(seconds) === 1 ? "" : "s"} ago`
			)
		}
		return "Just now"
	}
	return (
		<MainContent.Provider
			value={{
				filterChats,
				setFilterChats,
				showNewChat,
				setShowNewChat,
				showNotifications,
				setShowNotifications,
				showCreateGroup,
				setShowCreateGroup,
				showDeleteContact,
				setShowDeleteContact,
				showBlockContact,
				setShowBlockContact,
				showInviteOthers,
				setShowInviteOthers,
				showDeleteMessage,
				setShowDeleteMessage,
				showDeleteAllMessage,
				setShowDeleteAllMessage,
				showEditMessage,
				setShowEditMessage,
				showPreloader,
				setShowPreloader,
				showAddContact,
				setShowAddContact,
				timeSince,
				formatDate,
				copyText,
				Toast,
			}}
		>
			{children}
		</MainContent.Provider>
	)
}

export default MainComponent
