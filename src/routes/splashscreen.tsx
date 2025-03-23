import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/splashscreen')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()

    useEffect(() => {
        const init = async () => {
            await new Promise((resolve) => setTimeout(resolve, 4000))
            navigate({ to: '/' })
        }
        init()
    }, [navigate])
    return <div>Loading!</div>
}
