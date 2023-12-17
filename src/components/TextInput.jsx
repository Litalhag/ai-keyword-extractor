import { useState } from 'react'
import { Button, Textarea } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

const TextInput = ({ extractKeywords }) => {
  const [text, setText] = useState('')

  const toast = useToast()

  const submitText = () => {
    if (text === '') {
      toast({
        title: 'Text field is empty.',
        description: 'Please enter some text to extract keywords.',
        status: 'error',
        duration: 5000,
        isClosable: false,
      })
      return
    }

    extractKeywords(text)
  }

  return (
    <>
      <Textarea
        bg="#818FB4"
        padding={4}
        marginTop={6}
        height={200}
        color="#F5E8C7"
        _focus={{
          outline: 'none',
          boxShadow: '0 0 0 3px #435585',
          borderColor: '#818FB4',
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button
        bg="#435585"
        color="#F5E8C7"
        fontWeight="700"
        marginTop={4}
        width="100%"
        _hover={{ bg: '#363062' }}
        onClick={submitText}
      >
        Extract Keywords
      </Button>
    </>
  )
}
export default TextInput
