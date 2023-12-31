'use client'

import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { LuHeading1, LuSeparatorHorizontal } from "react-icons/lu"
import { MdTextFields } from "react-icons/md"
import { z } from "zod"
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"

const type: ElementsType = "SpacerField"

const extraAttributes = {
    height: 20, //px
}

const propertiesSchema = z.object({
    height: z.number().min(2).max(200),
})

export const SpacerFieldFormElement: FormElement = {
    type,

    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: LuSeparatorHorizontal,
        label: "Spacer field"
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
    const { height } = element.extraAttributes
    return (
        <div className="flex flex-col gap-2 w-full items-center">
            <Label className="text-muted-foreground">
                Spacer Field: {height}px
            </Label>
            <LuSeparatorHorizontal className="h-8 w-8"/>
        </div>
    )
}


type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;

    const { updateElement } = useDesigner();

    const { height } = element.extraAttributes;
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            height: height,
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                height: values.height,
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
                    name='height'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Height: (px): {form.watch("height")}</FormLabel>
                            <FormControl className="pt-2">
                                <Slider 
                                    defaultValue={[field.value]}
                                    min={5}
                                    max={200}
                                    step={1}
                                    onValueChange={(value) => {
                                        field.onChange(value[0])
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

    const { height } = element.extraAttributes
    return (
        <div style={{height, width: "100%"}}></div>
    )
}