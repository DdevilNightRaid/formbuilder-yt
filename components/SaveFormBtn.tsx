import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from 'react-icons/hi'
import useDesigner from './hooks/useDesigner'
import { UpdateFormContent } from '@/actions/form'
import { toast } from './ui/use-toast'
import { FaSpinner } from 'react-icons/fa'

const SaveFormBtn = ({ id }: { id: number }) => {
  const { elements } = useDesigner();

  // run updateFromContent:
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: "Success",
        description: "Your from has been sent"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "500",
        variant: "destructive"

      })
    }
  }
  return (
    <Button
      variant={'outline'}
      className='gap-2'
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent)
      }}
    >
      <HiSaveAs className='h-5 w-5' /> Save
      {
        loading && <FaSpinner className='h-7 w-7 animate-spin'/>
      }
    </Button>
  )
}

export default SaveFormBtn