import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

import { useState, useEffect } from 'react'
import {
    Folder,
    File,
    Image,
    FileText,
    FileCode,
    FilePlus2,
    FolderPlus,
    MoreVertical,
    X,
    Download,
    Trash2,
    ExternalLink,
    Key,
    User,
    Shield,
    Clock,
    Tag,
    Activity,
    Upload,
    ArrowDown,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { Progress } from '@/components/ui/progress'

// Sample data
const buckets = [
    { id: '1', name: 'assets', files: 42 },
    { id: '2', name: 'backups', files: 17 },
    { id: '3', name: 'documents', files: 128 },
    { id: '4', name: 'images', files: 256 },
    { id: '5', name: 'videos', files: 64 },
    { id: '6', name: 'uploads', files: 93 },
]

const files = [
    {
        id: '1',
        name: 'profile.jpg',
        type: 'image/jpeg',
        size: '1.2 MB',
        lastModified: '2023-10-15',
        path: '/images/profile.jpg',
        permissions: [
            { type: 'owner', entity: 'admin@example.com', access: 'Full Control' },
            { type: 'group', entity: 'Developers', access: 'Read/Write' },
            { type: 'public', entity: 'Everyone', access: 'Read Only' },
        ],
        versions: [
            { id: 'v3', date: '2023-10-15', size: '1.2 MB', author: 'john@example.com' },
            { id: 'v2', date: '2023-10-10', size: '1.1 MB', author: 'john@example.com' },
            { id: 'v1', date: '2023-10-05', size: '1.0 MB', author: 'sarah@example.com' },
        ],
        tags: [
            { key: 'project', value: 'website-redesign' },
            { key: 'department', value: 'marketing' },
            { key: 'status', value: 'approved' },
        ],
    },
    {
        id: '2',
        name: 'document.pdf',
        type: 'application/pdf',
        size: '3.5 MB',
        lastModified: '2023-10-14',
        path: '/documents/document.pdf',
        permissions: [
            { type: 'owner', entity: 'admin@example.com', access: 'Full Control' },
            { type: 'group', entity: 'Managers', access: 'Read/Write' },
        ],
        versions: [
            { id: 'v2', date: '2023-10-14', size: '3.5 MB', author: 'admin@example.com' },
            { id: 'v1', date: '2023-10-07', size: '3.2 MB', author: 'admin@example.com' },
        ],
        tags: [
            { key: 'type', value: 'report' },
            { key: 'quarter', value: 'Q3' },
        ],
    },
    {
        id: '3',
        name: 'script.js',
        type: 'text/javascript',
        size: '45 KB',
        lastModified: '2023-10-13',
        path: '/assets/script.js',
        permissions: [
            { type: 'owner', entity: 'admin@example.com', access: 'Full Control' },
            { type: 'group', entity: 'Developers', access: 'Read/Write' },
        ],
        versions: [
            { id: 'v4', date: '2023-10-13', size: '45 KB', author: 'dev@example.com' },
            { id: 'v3', date: '2023-10-12', size: '43 KB', author: 'dev@example.com' },
            { id: 'v2', date: '2023-10-11', size: '40 KB', author: 'dev@example.com' },
            { id: 'v1', date: '2023-10-10', size: '38 KB', author: 'dev@example.com' },
        ],
        tags: [
            { key: 'component', value: 'authentication' },
            { key: 'status', value: 'in-review' },
        ],
    },
    {
        id: '4',
        name: 'styles.css',
        type: 'text/css',
        size: '28 KB',
        lastModified: '2023-10-12',
        path: '/assets/styles.css',
        permissions: [
            { type: 'owner', entity: 'admin@example.com', access: 'Full Control' },
            { type: 'group', entity: 'Developers', access: 'Read/Write' },
        ],
        versions: [
            { id: 'v2', date: '2023-10-12', size: '28 KB', author: 'designer@example.com' },
            { id: 'v1', date: '2023-10-08', size: '25 KB', author: 'designer@example.com' },
        ],
        tags: [
            { key: 'theme', value: 'dark-mode' },
            { key: 'status', value: 'approved' },
        ],
    },
    {
        id: '5',
        name: 'data.json',
        type: 'application/json',
        size: '12 KB',
        lastModified: '2023-10-11',
        path: '/assets/data.json',
        permissions: [
            { type: 'owner', entity: 'admin@example.com', access: 'Full Control' },
            { type: 'group', entity: 'Analysts', access: 'Read/Write' },
        ],
        versions: [{ id: 'v1', date: '2023-10-11', size: '12 KB', author: 'data@example.com' }],
        tags: [
            { key: 'dataset', value: 'user-metrics' },
            { key: 'source', value: 'analytics-api' },
        ],
    },
    {
        id: '6',
        name: 'banner.png',
        type: 'image/png',
        size: '2.8 MB',
        lastModified: '2023-10-10',
        path: '/images/banner.png',
        permissions: [
            { type: 'owner', entity: 'admin@example.com', access: 'Full Control' },
            { type: 'group', entity: 'Marketing', access: 'Read/Write' },
            { type: 'public', entity: 'Everyone', access: 'Read Only' },
        ],
        versions: [
            { id: 'v2', date: '2023-10-10', size: '2.8 MB', author: 'designer@example.com' },
            { id: 'v1', date: '2023-10-01', size: '3.1 MB', author: 'designer@example.com' },
        ],
        tags: [
            { key: 'campaign', value: 'summer-sale' },
            { key: 'placement', value: 'homepage' },
        ],
    },
    {
        id: '7',
        name: 'logo.svg',
        type: 'image/svg+xml',
        size: '15 KB',
        lastModified: '2023-10-09',
        path: '/images/logo.svg',
        permissions: [
            { type: 'owner', entity: 'admin@example.com', access: 'Full Control' },
            { type: 'group', entity: 'Design', access: 'Read/Write' },
        ],
        versions: [
            { id: 'v3', date: '2023-10-09', size: '15 KB', author: 'brand@example.com' },
            { id: 'v2', date: '2023-09-20', size: '16 KB', author: 'brand@example.com' },
            { id: 'v1', date: '2023-09-15', size: '18 KB', author: 'brand@example.com' },
        ],
        tags: [
            { key: 'brand', value: 'primary' },
            { key: 'format', value: 'vector' },
        ],
    },
    {
        id: '8',
        name: 'report.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: '1.7 MB',
        lastModified: '2023-10-08',
        path: '/documents/report.docx',
        permissions: [
            { type: 'owner', entity: 'admin@example.com', access: 'Full Control' },
            { type: 'group', entity: 'Executives', access: 'Read Only' },
        ],
        versions: [
            { id: 'v5', date: '2023-10-08', size: '1.7 MB', author: 'manager@example.com' },
            { id: 'v4', date: '2023-10-07', size: '1.6 MB', author: 'manager@example.com' },
            { id: 'v3', date: '2023-10-06', size: '1.5 MB', author: 'manager@example.com' },
            { id: 'v2', date: '2023-10-05', size: '1.4 MB', author: 'manager@example.com' },
            { id: 'v1', date: '2023-10-04', size: '1.2 MB', author: 'manager@example.com' },
        ],
        tags: [
            { key: 'confidential', value: 'true' },
            { key: 'department', value: 'finance' },
            { key: 'fiscal-year', value: '2023' },
        ],
    },
]

const accounts = [
    {
        id: '1',
        name: 'Production Account',
        accessKey: 'AKIAXXXXXXXXXXXXXXXX',
        secretKey: '****************************************',
    },
    {
        id: '2',
        name: 'Development Account',
        accessKey: 'AKIAXXXXXXXXXXXXXXXY',
        secretKey: '****************************************',
    },
    {
        id: '3',
        name: 'Testing Account',
        accessKey: 'AKIAXXXXXXXXXXXXXXYZ',
        secretKey: '****************************************',
    },
]

const initialTasks = [
    {
        id: 'task1',
        type: 'download',
        name: 'document.pdf',
        progress: 45,
        status: 'in-progress',
        startTime: new Date().toISOString(),
        size: '3.5 MB',
    },
    {
        id: 'task2',
        type: 'upload',
        name: 'presentation.pptx',
        progress: 78,
        status: 'in-progress',
        startTime: new Date(Date.now() - 120000).toISOString(),
        size: '12.8 MB',
    },
    {
        id: 'task3',
        type: 'permission',
        name: 'Updating permissions for /images/logo.svg',
        progress: 100,
        status: 'completed',
        startTime: new Date(Date.now() - 300000).toISOString(),
        size: null,
    },
    {
        id: 'task4',
        type: 'download',
        name: 'large-dataset.csv',
        progress: 12,
        status: 'in-progress',
        startTime: new Date(Date.now() - 60000).toISOString(),
        size: '145 MB',
    },
]

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [selectedBucket, setSelectedBucket] = useState(buckets[0])
    const [currentPath, setCurrentPath] = useState<string[]>([selectedBucket.name])
    const [selectedFile, setSelectedFile] = useState<(typeof files)[number] | OnBeforeUnloadEventHandlerNonNull | null>(null)
    const [fileModalOpen, setFileModalOpen] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState(accounts[0])
    const [addAccountModalOpen, setAddAccountModalOpen] = useState(false)
    const [tasks, setTasks] = useState(initialTasks)

    const handleBucketClick = (bucket: (typeof buckets)[number]) => {
        setSelectedBucket(bucket)
        setCurrentPath([bucket.name])
    }

    const handleFileClick = (file: (typeof files)[number]) => {
        setSelectedFile(file)
        setFileModalOpen(true)
    }

    const handlePathClick = (index: number) => {
        setCurrentPath(currentPath.slice(0, index + 1))
    }

    const getFileIcon = (fileType: string) => {
        if (fileType.startsWith('image/')) return <Image className="h-5 w-5" />
        if (fileType.includes('javascript') || fileType.includes('css') || fileType.includes('html')) return <FileCode className="h-5 w-5" />
        if (fileType.includes('pdf') || fileType.includes('doc') || fileType.includes('text')) return <FileText className="h-5 w-5" />
        return <File className="h-5 w-5" />
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
                                    <div key={path} className="flex items-center">
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
                        <main className="flex-1 overflow-auto p-6">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {files.map((file) => (
                                    <div
                                        key={file.id}
                                        className="group flex cursor-pointer flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => handleFileClick(file)}
                                    >
                                        <div className="mb-3 flex h-24 w-full items-center justify-center rounded-md bg-muted p-2">
                                            <div className="flex h-16 w-16 items-center justify-center">
                                                {file.type.startsWith('image/') ? (
                                                    <img
                                                        src="/placeholder.svg?height=64&width=64"
                                                        alt={file.name}
                                                        className="h-full w-full object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <div className="text-primary">{React.cloneElement(getFileIcon(file.type), { className: 'h-12 w-12' })}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center justify-between">
                                            <span className="truncate text-sm font-medium">{file.name}</span>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 opacity-0 group-hover:opacity-100"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                        <span className="sr-only">More options</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <span className="mt-1 text-xs text-muted-foreground">{file.size}</span>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                </SidebarInset>
            </div>

            <FileModal file={selectedFile} open={fileModalOpen} onOpenChange={setFileModalOpen} />
            <AddAccountModal open={addAccountModalOpen} onOpenChange={setAddAccountModalOpen} />
            <TaskManager tasks={tasks} removeTask={removeTask} />
        </SidebarProvider>
    )
}

function BucketSidebar({ buckets, selectedBucket, onBucketClick, accounts, selectedAccount, setSelectedAccount, onAddAccount }: any) {
    return (
        <Sidebar>
            <SidebarHeader className="border-b px-3 py-2">
                <h2 className="text-lg font-semibold">Storage Explorer</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Buckets</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {buckets.map((bucket: (typeof buckets)[number]) => (
                                <SidebarMenuItem key={bucket.id}>
                                    <SidebarMenuButton isActive={selectedBucket.id === bucket.id} onClick={() => onBucketClick(bucket)}>
                                        <Folder className="h-4 w-4" />
                                        <span>{bucket.name}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <div className="mt-auto border-t p-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    {selectedAccount.name.charAt(0)}
                                </div>
                                <div className="flex flex-col items-start text-left">
                                    <span className="text-sm font-medium">{selectedAccount.name}</span>
                                    <span className="text-xs text-muted-foreground truncate w-[140px]">
                                        {selectedAccount.accessKey.substring(0, 4)}...
                                        {selectedAccount.accessKey.substring(selectedAccount.accessKey.length - 4)}
                                    </span>
                                </div>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[240px]">
                        {accounts.map((account: (typeof accounts)[number]) => (
                            <DropdownMenuItem key={account.id} className="cursor-pointer" onClick={() => setSelectedAccount(account)}>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        {account.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{account.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {account.accessKey.substring(0, 4)}...{account.accessKey.substring(account.accessKey.length - 4)}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem className="cursor-pointer" onClick={onAddAccount}>
                            <span className="flex w-full items-center justify-center font-medium">Add New Account</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <SidebarRail />
        </Sidebar>
    )
}

function FileModal({ file, open, onOpenChange }: any) {
    if (!file) return null

    const isImage = file.type.startsWith('image/')

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        {file.name}
                    </DialogTitle>
                    <DialogDescription>File details and preview</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="permissions" className="flex items-center gap-1">
                            <Shield className="h-3.5 w-3.5" />
                            <span>Permissions</span>
                        </TabsTrigger>
                        <TabsTrigger value="versions" className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Versions</span>
                        </TabsTrigger>
                        <TabsTrigger value="tags" className="flex items-center gap-1">
                            <Tag className="h-3.5 w-3.5" />
                            <span>Tags</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="mt-4">
                        <div className="grid gap-6">
                            {isImage && (
                                <div className="overflow-hidden rounded-md border">
                                    <img src="/placeholder.svg?height=300&width=500" alt={file.name} className="h-[300px] w-full object-cover" />
                                </div>
                            )}
                            <div className="grid gap-3">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="font-medium text-muted-foreground">Path</div>
                                    <div>{file.path}</div>
                                    <div className="font-medium text-muted-foreground">Size</div>
                                    <div>{file.size}</div>
                                    <div className="font-medium text-muted-foreground">Type</div>
                                    <div>{file.type}</div>
                                    <div className="font-medium text-muted-foreground">Last Modified</div>
                                    <div>{file.lastModified}</div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="permissions" className="mt-4">
                        <div className="rounded-md border">
                            <div className="grid grid-cols-3 gap-4 p-4 font-medium border-b">
                                <div>Type</div>
                                <div>Entity</div>
                                <div>Access Level</div>
                            </div>
                            {file.permissions.map((permission: (typeof files)[number]['permissions'][number], index: number) => (
                                <div key={permission.access} className="grid grid-cols-3 gap-4 p-4 border-b last:border-0">
                                    <div className="capitalize">{permission.type}</div>
                                    <div>{permission.entity}</div>
                                    <div>{permission.access}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button size="sm" variant="outline">
                                <Shield className="mr-2 h-4 w-4" />
                                Edit Permissions
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="versions" className="mt-4">
                        <div className="rounded-md border">
                            <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                                <div>Version</div>
                                <div>Date</div>
                                <div>Size</div>
                                <div>Author</div>
                            </div>
                            {file.versions.map((version: (typeof files)[number]['versions'][number], index: number) => (
                                <div key={version.id} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0">
                                    <div>{version.id}</div>
                                    <div>{version.date}</div>
                                    <div>{version.size}</div>
                                    <div>{version.author}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download Version
                            </Button>
                            <Button size="sm" variant="outline">
                                <Clock className="mr-2 h-4 w-4" />
                                Restore Version
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="tags" className="mt-4">
                        <div className="rounded-md border">
                            <div className="grid grid-cols-2 gap-4 p-4 font-medium border-b">
                                <div>Key</div>
                                <div>Value</div>
                            </div>
                            {file.tags.map((tag: (typeof files)[number]['tags'][number], index: number) => (
                                <div key={tag.key} className="grid grid-cols-2 gap-4 p-4 border-b last:border-0">
                                    <div>{tag.key}</div>
                                    <div>{tag.value}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                                <Tag className="mr-2 h-4 w-4" />
                                Add Tag
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>

                <Separator />
                <div className="flex justify-between">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        <X className="mr-2 h-4 w-4" />
                        Close
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                        <Button>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function AddAccountModal({ open, onOpenChange }: any) {
    const [formData, setFormData] = useState({
        name: '',
        accessKey: '',
        secretKey: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically add the account to your state/database
        console.log('Adding account:', formData)
        onOpenChange(false)
        // Reset form
        setFormData({ name: '', accessKey: '', secretKey: '' })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Storage Account</DialogTitle>
                    <DialogDescription>Enter your storage provider credentials to connect to your buckets.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Account Name
                            </Label>
                            <Input id="name" name="name" placeholder="Production S3" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="accessKey" className="flex items-center gap-2">
                                <Key className="h-4 w-4" />
                                Access Key
                            </Label>
                            <Input
                                id="accessKey"
                                name="accessKey"
                                placeholder="AKIAXXXXXXXXXXXXXXXX"
                                value={formData.accessKey}
                                onChange={handleChange}
                                required
                            />
                            <p className="text-xs text-muted-foreground">Your AWS access key ID or equivalent for other providers.</p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="secretKey" className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Secret Key
                            </Label>
                            <Input
                                id="secretKey"
                                name="secretKey"
                                type="password"
                                placeholder="••••••••••••••••••••••••••••••••"
                                value={formData.secretKey}
                                onChange={handleChange}
                                required
                            />
                            <p className="text-xs text-muted-foreground">Your AWS secret access key or equivalent for other providers.</p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Account</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function getFileIcon(fileType: string) {
    if (fileType.startsWith('image/')) return <Image />
    if (fileType.includes('javascript') || fileType.includes('css') || fileType.includes('html')) return <FileCode />
    if (fileType.includes('pdf') || fileType.includes('doc') || fileType.includes('text')) return <FileText />
    return <File />
}

function TaskManager({ tasks, removeTask }: { tasks: any[]; removeTask: (id: string) => void }) {
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
            {/* Slideover for tasks */}
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

            {/* Floating button to toggle tasks panel */}
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
