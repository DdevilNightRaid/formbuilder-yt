'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

import { formSchema, formSchemaType } from '@/schemas/form'
import { FaSpinner } from 'react-icons/fa'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'
import { CreateForm } from '@/actions/form'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'



const CreateFormBtn = () => {
    const router = useRouter()
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: formSchemaType) {
        try {
            const formId = await CreateForm(values)
            toast({
                title: 'Success',
                description: "200 OK",
            })

            console.log('Form Id: ' + formId);
            router.push(`/builder/${formId}`);
        } catch (error) {
            toast({
                title: 'Error',
                description: "Something 500",
                variant: 'destructive',
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className='group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-background'
                >
                    <PlusCircledIcon className='h-7 w-7 group-hover:text-foreground text-primary' />
                    <p className='font-bold text-md text-primary group-hover:text-foreground'>Create New Form</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Form</DialogTitle>
                    <DialogDescription>
                        Create a new form to start collecting responses
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={form.formState.isSubmitting}
                        className='w-full mt-4'
                    >
                        {
                            !form.formState.isSubmitting && <span>Save</span>
                        }
                        {
                            form.formState.isSubmitting && <FaSpinner className='animate-spin' />
                        }
                    </Button>
                </DialogFooter>
                <div className='flex flex-col gap-4 py-4'>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateFormBtn