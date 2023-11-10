import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

interface UserInfo {
	name: string
	email: string
	_id: string
}

const fetchUserInfo = async (): Promise<UserInfo> => {
	const token = localStorage.getItem('token')
	if (!token) return false
	const response = await fetch('http://localhost:8000/user/me', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	})

	if (!response.ok) {
		throw new Error(
			"Erreur lors de la récupération des informations de l'utilisateur"
		)
	}

	return response.json() as Promise<UserInfo>
}

const useUserInfo = (): UseQueryResult<UserInfo | undefined> => {
	const queryResult = useQuery<UserInfo>(['userInfo'], fetchUserInfo, {
		retry: false
	})

	// Retourne directement le résultat de la requête
	return queryResult
}

export default useUserInfo
