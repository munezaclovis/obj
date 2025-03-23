export interface Bucket {
    id: string
    name: string
    files: number
}

export interface FilePermission {
    type: string
    entity: string
    access: string
}

export interface FileVersion {
    id: string
    date: string
    size: string
    author: string
}

export interface FileTag {
    key: string
    value: string
}

export interface FileItem {
    id: string
    name: string
    type: string
    size: string
    lastModified: string
    path: string
    permissions: FilePermission[]
    versions: FileVersion[]
    tags: FileTag[]
}

export interface Account {
    id: string
    name: string
    accessKey: string
    secretKey: string
}

export interface Task {
    id: string
    type: 'download' | 'upload' | 'permission' | string
    name: string
    progress: number
    status: 'in-progress' | 'completed'
    startTime: string
    size: string | null
}

export interface BucketSidebarProps {
    buckets: Bucket[]
    selectedBucket: Bucket
    onBucketClick: (bucket: Bucket) => void
    accounts: Account[]
    selectedAccount: Account
    setSelectedAccount: (account: Account) => void
    onAddAccount: () => void
}

export interface FileModalProps {
    file: FileItem | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export interface AddAccountModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export interface TaskManagerProps {
    tasks: Task[]
    removeTask: (id: string) => void
}
