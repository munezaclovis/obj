import type { Account, Bucket, FileItem, Task } from '@/types'

export const buckets: Bucket[] = [
    { id: '1', name: 'assets', files: 42 },
    { id: '2', name: 'backups', files: 17 },
    { id: '3', name: 'documents', files: 128 },
    { id: '4', name: 'images', files: 256 },
    { id: '5', name: 'videos', files: 64 },
    { id: '6', name: 'uploads', files: 93 },
]

export const accounts: Account[] = [
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

export const initialTasks: Task[] = [
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

export const files: FileItem[] = [
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
