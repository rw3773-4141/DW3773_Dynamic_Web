import {useEffect} from 'react'
import {createPortal} from 'react-dom'
import cx from 'classnames'

const Modal = (props) => {
  const {title, children, onClose, actionBar, crazy} = props

  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  const overlayClass = crazy
    ? 'fixed inset-0 bg-teal-300 opacity-50'
    : 'fixed inset-0 bg-gray-300 opacity-50'

  const windowClass = cx('fixed inset-40 p-10 bg-white', {
    'rounded-lg': crazy,
  })

  return createPortal(
    <>
      <div onClick={onClose} className={overlayClass}></div>
      <div className={windowClass}>
        <div className="flex flex-col justify-between h-full">
          {title && <h2 className="text-2xl">{title}</h2>}
          {children}
          <div className="flex flex-row justify-end">{actionBar}</div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal
