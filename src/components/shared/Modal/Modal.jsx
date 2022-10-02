// import { Component } from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import css from 'components/Styled/Styles.module.css'

const modalRoot = document.getElementById("modal-root")

export default function Modal({children, onClose} ) {

    useEffect (() => {
        document.addEventListener('keydown', closeModal)
        return () => {
            window.removeEventListener('keydown', closeModal)}
    })

    const closeModal = ({target, currentTarget, code}) => {
        if(target === currentTarget || code === "Escape") {
            onClose()
        }
    }

    return  createPortal(
        <div className={css.overlay} onClick={closeModal}>
            <div className={css.modal}>
                <button className={css.modal_close_btn} type="button" onClick={closeModal}>X</button>
                {children}
            </div>
        </div>, modalRoot
    )
}

