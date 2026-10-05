/*
  This page uses no useEffect because it does not add a document listener.
  Modal owns the Escape listener and removes it in its cleanup function.
*/
import {useState} from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal'

const ModalPage = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleClick = () => {
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  const actionBar = (
    <>
      <Button secondary outline onClick={handleClose}>
        Cancel
      </Button>
      <Button success onClick={handleClose}>
        Confirm
      </Button>
    </>
  )

  return (
    <div>
      <Button success rounded onClick={handleClick}>
        Open Modal!
      </Button>

      {modalOpen && (
        <Modal title="Welcome!" onClose={handleClose} actionBar={actionBar}>
          <p>Press Escape, click outside, or use the X to close.</p>
        </Modal>
      )}
    </div>
  )
}

export default ModalPage
