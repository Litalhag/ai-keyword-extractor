import { useState } from 'react'
import { Container, Box } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import TextInput from './components/TextInput'
import KeywordsModal from './components/KeywordsModal'

const App = () => {
  const [keywords, setKeywords] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  let lastRequestTime = 0

  const extractKeywords = async (text) => {
    const now = new Date().getTime()
    if (lastRequestTime && now - lastRequestTime < 2000) {
      alert('Please wait for 2 seconds before making another request.')
      return
    }

    setLoading(true)
    setIsOpen(true)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt:
          'Extract keywords from this text. Make the first letter of every word uppercase and separate with commas:\n\n' +
          text,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.8,
        presence_penalty: 0.0,
      }),
    }

    try {
      const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const json = await response.json()
      if (json.choices && json.choices.length > 0 && json.choices[0].text) {
        setKeywords(json.choices[0].text.trim())
      } else {
        setKeywords('Error: Could not extract keywords.')
      }
    } catch (error) {
      console.error(error)

      setKeywords(`Error: ${error.message ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Box bg="blue.600" color="white" height="100vh" paddingTop={130}>
      <Container maxW="3xl" centerContent>
        <Header />
        <TextInput extractKeywords={extractKeywords} />
        <Footer />
      </Container>
      <KeywordsModal
        keywords={keywords}
        loading={loading}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Box>
  )
}

export default App
