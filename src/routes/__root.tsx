// src/routes/__root.tsx
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
    component: () => {
        return (
            <>
                <Outlet />
                {/* <TanStackRouterDevtools /> */}
            </>
        )
    },
})
