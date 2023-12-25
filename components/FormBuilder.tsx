'use client'

import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { Form } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ImSpinner2 } from "react-icons/im"
import Designer from "./Designer"
import DragOverlayWrapper from "./DragOverlayWrapper"
import useDesigner from "./hooks/useDesigner"
import PreviewDialogBtn from "./PreviewDialogBtn"
import PublishFormBtn from "./PublishFormBtn"
import SaveFormBtn from "./SaveFormBtn"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { toast } from "./ui/use-toast"
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import Confetti from "react-confetti"

const FormBuilder = ({ form }: { form: Form }) => {

    const { setElements, setSelectedElement } = useDesigner();
    const [isReady, setIsReady] = useState(false);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        }
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 5,
        }
    })
    const sensors = useSensors(mouseSensor, touchSensor);

    useEffect(() => {
        if(!isReady) return;
        const elements = JSON.parse(form.content);
        setElements(elements);
        setSelectedElement(null)
        setIsReady(true)
        const readyTimeout = setTimeout(() => setIsReady(true), 500);
        return () => clearTimeout(readyTimeout)
    }, [form, setElements, isReady, setSelectedElement])

    if (!isReady) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <ImSpinner2 className='animate-spin h-12 w-12' />
            </div>
        )
    }

    const shareUrl = `${window.location.origin}/submit/${form.shareURL}`

    if (form.published) {
        return (
            <>
                <Confetti 
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={1000}
                />
                <div className="flex flex-col items-center justify-center w-full h-ful">
                    <div className="max-w-md">
                        <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
                            Form Published 🥳
                        </h1>
                        <h2 className="text-2xl">Share this form</h2>
                        <h3 className="text-xl text-muted-foreground border-b pb-10">Anyone with the link can view and submit the form</h3>
                        <div className="my-4 flex flex-col gap-2 w-full items-center border-b pb-4">
                            <Input className="w-full" readOnly value={shareUrl} />
                            <Button className="mt-2 w-full"
                                onClick={() => {
                                    navigator.clipboard.writeText(shareUrl)
                                    toast({
                                        title: 'Copied!',
                                        description: "Link copied to clipboard."
                                    })
                                }}
                            >
                                Copy Link
                            </Button>
                        </div>
                        <div className="flex justify-between">
                            <Button
                                variant={"link"}
                                asChild
                            >
                                <Link 
                                    href={"/"}
                                    className="gap-2"
                                >
                                    <BsArrowLeft />
                                    <p>Go back home</p>
                                </Link>
                            </Button>
                            <Button
                                variant={"link"}
                                asChild
                            >
                                <Link 
                                    href={`/forms/${form.id}`}
                                    className="gap-2"
                                >
                                    <p>Form Details</p>
                                    <BsArrowRight />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <DndContext
            sensors={sensors}
        >
            <main className="flex flex-col w-full">
                <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
                    <h2 className="truncate font-medium">
                        <span className="text-muted-foreground mr-2">Form:</span>
                        {form.name}
                    </h2>
                    <div className="flex items-center gap-2">
                        <PreviewDialogBtn />
                        {!form.published && (
                            <>
                                <SaveFormBtn id={form.id} />
                                <PublishFormBtn id={form.id} />
                            </>
                        )}
                    </div>
                </nav>
                <div className="w-full h-[200px]flex flex-grow items-center justify-center relative overflow-y-auto bg-accent bg-[url('/graph-paper.svg')] dark:bg-[url('/graph-paper-dark.svg')]">
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    )
}

export default FormBuilder