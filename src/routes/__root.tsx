import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { accounts, buckets, initialTasks } from '@/data/fake'
import type { Bucket, Task } from '@/types'

import { BucketSidebar } from '@/components/BucketSidebar'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { FilePlus2, FolderPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AddAccountModal } from '@/components/AddAccountModal'
import { TaskManager } from '@/components/TaskManager'

export const Route = createRootRoute({
    component: () => {
        const [selectedBucket, setSelectedBucket] = useState(buckets[0])
        const [currentPath, setCurrentPath] = useState<string[]>([selectedBucket.name])

        const [selectedAccount, setSelectedAccount] = useState(accounts[0])
        const [addAccountModalOpen, setAddAccountModalOpen] = useState(false)
        const [tasks, setTasks] = useState<Task[]>(initialTasks)

        const handleBucketClick = (bucket: Bucket) => {
            setSelectedBucket(bucket)
            setCurrentPath([bucket.name])
        }

        const handlePathClick = (index: number) => {
            setCurrentPath(currentPath.slice(0, index + 1))
        }

        const removeTask = (taskId: string) => {
            setTasks(tasks.filter((task) => task.id !== taskId))
        }

        useEffect(() => {
            const interval = setInterval(() => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) => {
                        if (task.status === 'in-progress' && task.progress < 100) {
                            const newProgress = Math.min(task.progress + Math.random() * 10, 100)
                            return {
                                ...task,
                                progress: newProgress,
                                status: newProgress === 100 ? 'completed' : 'in-progress',
                            }
                        }
                        return task
                    })
                )
            }, 1000)

            return () => clearInterval(interval)
        }, [])

        return (
            <SidebarProvider>
                <div className="flex h-screen w-full overflow-hidden">
                    <BucketSidebar
                        buckets={buckets}
                        selectedBucket={selectedBucket}
                        onBucketClick={handleBucketClick}
                        accounts={accounts}
                        selectedAccount={selectedAccount}
                        setSelectedAccount={setSelectedAccount}
                        onAddAccount={() => setAddAccountModalOpen(true)}
                    />
                    <SidebarInset>
                        <div className="flex h-full flex-col">
                            <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
                                <SidebarTrigger />
                                <div className="flex items-center gap-2">
                                    {currentPath.map((path, index) => (
                                        <div key={`${path}`} className="flex items-center">
                                            {index > 0 && <span className="mx-1 text-muted-foreground">/</span>}
                                            <Button variant="link" className="h-auto p-0 font-normal" onClick={() => handlePathClick(index)}>
                                                {path}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <div className="ml-auto flex items-center gap-2">
                                    <Button size="sm" variant="outline">
                                        <FilePlus2 className="mr-2 h-4 w-4" />
                                        Upload File
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <FolderPlus className="mr-2 h-4 w-4" />
                                        New Folder
                                    </Button>
                                </div>
                            </header>
                            <Outlet />
                        </div>
                    </SidebarInset>
                </div>

                <AddAccountModal open={addAccountModalOpen} onOpenChange={setAddAccountModalOpen} />
                <TaskManager tasks={tasks} removeTask={removeTask} />
                {/* <TanStackRouterDevtools /> */}
            </SidebarProvider>
        )
    },
})
