import { Heading, Image, Text } from '@chakra-ui/react'
import logo from '../assets/avatars-2858666_1920.png'
import man from '../assets/deep-thought-1296377_1920.png'

const Header = () => {
  return (
    <>
      <Image src={logo} alt="logo" width={150} marginBottom="1rem" />
      <Heading color="#435585" marginBottom="1rem">
        AI Keyword Extractor
      </Heading>
      <Text fontSize={25} textAlign="center">
        Paste in your text below and we will extract the keywords for you.
      </Text>
    </>
  )
}
export default Header
