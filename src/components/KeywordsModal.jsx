import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CircularProgress,
} from '@chakra-ui/react'

const KeywordsModal = ({ keywords, loading, isOpen, closeModal }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Keywords</ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {loading ? (
                <CircularProgress isIndeterminate color="#818FB4" />
              ) : (
                <Text>{keywords} </Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button bg="#818FB4" mr={3} onClick={closeModal}></Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}
export default KeywordsModal
