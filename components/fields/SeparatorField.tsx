'use client'

import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { LuHeading1 } from "react-icons/lu"
import { MdTextFields } from "react-icons/md"
import { RiSeparator } from "react-icons/ri"
import { z } from "zod"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Switch } from "../ui/switch"

const type: ElementsType = "SeparatorField"

export const SeparatorFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
    }),
    designerBtnElement: {
        icon: RiSeparator,
        label: "Separator field"
    },

    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
}

function DesignerComponent({
    elementInstance
}: {
    elementInstance: FormElementInstance
}) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">
                Separator Field
            </Label>
            <Separator />
        </div>
    )
}


function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    return <p>No properties for this element</p>
}

function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    return (
       <Separator />
    )
}