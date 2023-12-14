import { Box, Container } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import TextInput from './components/TextInput'
import { useState } from 'react'

function App() {
  const [keywords, setKeywords] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const extractKeywords = async (text) => {
    setLoading(true)
    setIsOpen(true)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        // The AI model used for processing the request
        model: 'text-davinci-003',
        // Input text for the AI to respond to
        prompt:
          'Extract keywords from this text. Make the first letter of each word uppercase and separate with commas:\n\n' +
          text +
          '',
        // between 0-1.
        //controls the randomness.
        // when we set a higher temperature the api will generate a more diverse/creative responses because it will sample from a wider range of possible words which can lead to unexpected/unpredictable results.
        // when we set a low temperature- it can generate more conservative/predictable responses
        temperature: 0.5,
        // The number of words that are returned back. Sets the maximum length of the response. This is measured in tokens, where a token can be a word or part of a word. Maximum length of the AI's response (in tokens)
        max_tokens: 60,
        // Controls diversity of AI's response by sampling from top P% probable tokens
        top_p: 1.0,
        // Decreases the likelihood of repeating the same line of thought. Higher values reduce repetition.
        frequency_penalty: 0.8,
        // Encourages the model to introduce new topics. A higher value leads to more varied topics in the response.
        presence_penalty: 0.0,
      }),
    }

    const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options)

    // will give us an array of choices
    const json = await response.json()

    const data = json.choices[0].text.trim()

    setKeywords(data)
    setLoading(false)
  }
  return (
    <Box bg="blue.600" color="white" height="100vh" paddingTop={130}>
      <Container maxW="3xl" centerContent>
        <Header />
        <TextInput />
        <Footer />
      </Container>
    </Box>
  )
}

export default App
