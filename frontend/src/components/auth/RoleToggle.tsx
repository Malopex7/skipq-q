"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RoleToggle({
    defaultValue = "client",
    onValueChange,
}: {
    defaultValue?: "client" | "runner"
    onValueChange?: (value: string) => void
}) {
    return (
        <Tabs
            defaultValue={defaultValue}
            className="w-full mb-6"
            onValueChange={onValueChange}
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">Client</TabsTrigger>
                <TabsTrigger value="runner">Queue Runner</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
