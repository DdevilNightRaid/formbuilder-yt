'use client'

import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { LuHeading1 } from "react-icons/lu"
import { MdTextFields } from "react-icons/md"
import { z } from "zod"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"

const type: ElementsType = "TitleField"

const extraAttributes = {
    title: 'Title Field',
}

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
})

export const TitleFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: LuHeading1,
        label: "Title field"
    },

    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
    elementInstance
}: {
    elementInstance: FormElementInstance
}) {
    const element = elementInstance as CustomInstance;
    const { title } = element.extraAttributes
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">
                Title Field
            </Label>
            <p className="text-xl">{title}</p>
        </div>
    )
}


type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;

    const { updateElement } = useDesigner();

    const { title } = element.extraAttributes;
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            title: title,
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                title: values.title,
            }
        })
    }
    return (
        <Form {...form}>
            <form
                onBlur={form.handleSubmit(applyChanges)}
                onSubmit={(e) => {
                    e.preventDefault();

                }}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field}
                                    onKeyDown={e => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
            </form>
        </Form>
    )
}

function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction
}) {
    const element = elementInstance as CustomInstance;

    const { title } = element.extraAttributes
    return (
        <p className="text-xl">{title}</p>
    )
}