/*
  useEffect uses [] because Modal adds its document listener and locks scrolling
  once when it mounts. The cleanup removes the keydown listener and restores
  the page's normal scrolling when Modal unmounts.
*/
import {useEffect} from 'react'
import {createPortal} from 'react-dom'
import Panel from './Panel'

const Modal = ({title, children, onClose, actionBar, crazy}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('overflow-hidden')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  const overlayClass = crazy
    ? 'fixed inset-0 z-40 bg-teal-300/50'
    : 'fixed inset-0 z-40 bg-black/50'

  return createPortal(
    <>
      <div className={overlayClass} onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <Panel
          className="w-full max-w-md p-6 pointer-events-auto"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              {title && <h2 className="text-2xl font-bold">{title}</h2>}
              <div className="mt-3">{children}</div>
            </div>
            <button
              aria-label="Close modal"
              className="text-2xl leading-none"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          {actionBar && <div className="mt-6 flex justify-end gap-3">{actionBar}</div>}
        </Panel>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal
