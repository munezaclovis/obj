import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { TaskManagerProps } from '@/types'
import { Activity, ArrowDown, Upload, X } from 'lucide-react'
import { useState } from 'react'

export function TaskManager({ tasks, removeTask }: TaskManagerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const activeTasks = tasks.filter((task) => task.status === 'in-progress').length

    const getTaskIcon = (type: string) => {
        switch (type) {
            case 'download':
                return <ArrowDown className="h-4 w-4" />
            case 'upload':
                return <Upload className="h-4 w-4" />
            default:
                return <Activity className="h-4 w-4" />
        }
    }

    return (
        <>
            <div
                className={`fixed inset-y-0 right-0 z-50 w-80 transform border-l bg-background shadow-xl transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b p-4">
                        <h3 className="text-lg font-medium">Active Tasks</h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    {tasks.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">No active tasks</div>
                    ) : (
                        <div className="flex-1 overflow-auto p-4">
                            <div className="space-y-3">
                                {tasks.map((task) => (
                                    <div key={task.id} className="rounded-md border p-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    {getTaskIcon(task.type)}
                                                </div>
                                                <span className="text-sm font-medium capitalize">{task.type}</span>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeTask(task.id)}>
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <div className="mt-2 text-sm">{task.name}</div>
                                        {task.size && <div className="mt-1 text-xs text-muted-foreground">{task.size}</div>}
                                        <div className="mt-3">
                                            <Progress value={task.progress} className="h-2" />
                                        </div>
                                        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                                            <span>{task.progress}%</span>
                                            <span>{task.status === 'completed' ? 'Completed' : 'In progress'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="fixed bottom-4 right-4 z-50">
                <Button onClick={() => setIsOpen(!isOpen)} className="h-12 w-12 rounded-full shadow-lg">
                    <div className="relative">
                        <Activity className="h-5 w-5" />
                        {activeTasks > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                                {activeTasks}
                            </span>
                        )}
                    </div>
                </Button>
            </div>
        </>
    )
}
