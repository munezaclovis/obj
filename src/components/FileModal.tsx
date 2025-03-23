import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { FileModalProps } from '@/types'
import { Clock, Download, ExternalLink, File, FileCode, FileText, Image, Shield, Tag, X } from 'lucide-react'

export function FileModal({ file, open, onOpenChange }: FileModalProps) {
    if (!file) return null

    const isImage = file.type.startsWith('image/')

    const getFileIcon = (fileType: string) => {
        if (fileType.startsWith('image/')) return <Image />
        if (fileType.includes('javascript') || fileType.includes('css') || fileType.includes('html')) return <FileCode />
        if (fileType.includes('pdf') || fileType.includes('doc') || fileType.includes('text')) return <FileText />
        return <File />
    }

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
                            <div className="grid gap-3">{/* ...file details grid... */}</div>
                        </div>
                    </TabsContent>
                    {/* ...permissions, versions, tags tabs... */}
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
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
