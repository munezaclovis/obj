// src/routes/__root.tsx
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
    component: () => {
        return (
            <>
                {/* <div className="bg-neutral-50 dark:bg-neutral-950">
                    <Link to="/" activeOptions={{ exact: true }}>
                        Home
                    </Link>
                </div> */}
                <Outlet />
                {/* <TanStackRouterDevtools /> */}
            </>
        )
    },
})
