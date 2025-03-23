import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { files } from '@/data/fake'
import type { FileItem } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { Download, File, FileCode, FileText, Image, MoreVertical, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    const getFileIcon = (fileType: string) => {
        if (fileType.startsWith('image/')) return <Image className="h-5 w-5" />
        if (fileType.includes('javascript') || fileType.includes('css') || fileType.includes('html')) return <FileCode className="h-5 w-5" />
        if (fileType.includes('pdf') || fileType.includes('doc') || fileType.includes('text')) return <FileText className="h-5 w-5" />
        return <File className="h-5 w-5" />
    }

    const [_selectedFile, setSelectedFile] = useState<FileItem | null>(null)
    const [_fileModalOpen, setFileModalOpen] = useState(false)

    const handleFileClick = (file: FileItem) => {
        setSelectedFile(file)
        setFileModalOpen(true)
    }

    return (
        <>
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
                                        <img src="/placeholder.svg?height=64&width=64" alt={file.name} className="h-full w-full object-cover rounded-md" />
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

            {/* <FileModal file={selectedFile} open={fileModalOpen} onOpenChange={setFileModalOpen} /> */}
        </>
    )
}
