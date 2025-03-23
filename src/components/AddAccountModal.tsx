import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { AddAccountModalProps } from '@/types'
import { Key, Shield, User } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

export function AddAccountModal({ open, onOpenChange }: AddAccountModalProps) {
    const [formData, setFormData] = useState({ name: '', accessKey: '', secretKey: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onOpenChange(false)
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
                                placeholder="••••••••••••••••••••••"
                                value={formData.secretKey}
                                onChange={handleChange}
                                required
                            />
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
