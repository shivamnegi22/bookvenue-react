import React from 'react'
import '../../css/modal.css'

const BootstrapModal = ({children, modalId, centered, className}) => {
  return (
<div className={`modal fade ${className ? className : ""}`} id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
  <div className={`modal-dialog ${centered ? "modal-dialog-centered" : ""} modal-lg`}>
    <div className="modal-content">
      <div className="modal-body">
        {children}
      </div>
    </div>
  </div>
</div>
  )
}

export default BootstrapModal