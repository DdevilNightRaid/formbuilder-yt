import React, { startTransition, useTransition } from 'react'
import { Button } from './ui/button'

import { MdOutlinePublish } from 'react-icons/md'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { FaSpinner } from 'react-icons/fa'
import { toast } from './ui/use-toast'
import { PublishForm } from '@/actions/form'
import { useRouter } from 'next/navigation'

const PublishFormBtn = ({ id }: { id: number }) => {
    const [loading, startTransition] = useTransition();
    const router = useRouter();

    async function publishForm() {
        try {
            await PublishForm(id);
            toast({
                title: "Success",
                description: "200 OK",
            })
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
            })
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button

                    className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400'
                >
                    <MdOutlinePublish className='h-5 w-5' />
                    Publish
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                        <span className='font-medium'>
                            After publishing you will not be able to edit this form.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={loading}
                        onClick={e => {
                            e.preventDefault();
                            startTransition(publishForm);
                        }}
                    >
                        Proceed
                        {loading && <FaSpinner className='animate-spin' />}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PublishFormBtn