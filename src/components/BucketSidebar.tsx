import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar'
import type { BucketSidebarProps } from '@/types'
import { Folder } from 'lucide-react'

export function BucketSidebar({ buckets, selectedBucket, onBucketClick, accounts, selectedAccount, setSelectedAccount, onAddAccount }: BucketSidebarProps) {
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
                            {buckets.map((bucket) => (
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
                    <DropdownMenuTrigger asChild={true}>
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
                        {accounts.map((account) => (
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
