import Modal from 'react-bootstrap/Modal';

export default function PopupModal(props) {
  return <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
     backdrop="static"
    keyboard={false}
    style={{
      backgroundColor: 'transparent'
    }}
  >
    <Modal.Header className='popup-heder' closeButton
      style={
        {
          borderBottom: 'none',
          position: 'relative',
          zIndex: 1,

        }
      }
    >
    </Modal.Header>
    <Modal.Body className='p-0' style={{ marginTop: '-54px' }}>
      {props.children}
    </Modal.Body>
  </Modal>
}
