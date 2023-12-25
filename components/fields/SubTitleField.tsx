'use client'

import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { LuHeading1, LuHeading2 } from "react-icons/lu"
import { MdTextFields } from "react-icons/md"
import { z } from "zod"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"

const type: ElementsType = "SubTitleField"

const extraAttributes = {
    subtitle: 'SubTitle Field',
}

const propertiesSchema = z.object({
    subtitle: z.string().min(2).max(50),
})

export const SubTitleFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: LuHeading2,
        label: "SubTitle field"
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
    const { subtitle } = element.extraAttributes
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">
                Sub Title Field
            </Label>
            <p className="text-lg">{subtitle}</p>
        </div>
    )
}


type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;

    const { updateElement } = useDesigner();

    const { subtitle } = element.extraAttributes;
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            subtitle: subtitle,
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                subtitle: values.subtitle,
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
                    name='subtitle'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sub Title</FormLabel>
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

    const { subtitle } = element.extraAttributes
    return (
        <p className="text-lg">{subtitle}</p>
    )
}