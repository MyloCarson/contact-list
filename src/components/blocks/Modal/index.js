import React from 'react'
import CloseIcon from 'src/components/vectors/CloseIcon';
import PropTypes from 'prop-types';
import {useEscape} from 'src/components/helper/hooks/useEscape';

const Modal = ({children, onClose, headerTitle}) => {
    useEscape(onClose);

    return (
        <div className={`modal ${!headerTitle ? 'modal--alternate' : ''}`}>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className={`modal-content ${!headerTitle ? 'modal-content--alternate' : ''}`}>
                <div className={`modal-header ${!headerTitle ? 'modal-header--alternate' : ''}`}>
                    {headerTitle && (<h6 className="modal-header__title">{headerTitle}</h6>)}
                    <CloseIcon onClose={onClose} />
                </div>
    
                {children}
            </div>
        </div>
    );
};

Modal.defaultProps ={
    headerTitle: ''
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    headerTitle: PropTypes.string
}

export default Modal;