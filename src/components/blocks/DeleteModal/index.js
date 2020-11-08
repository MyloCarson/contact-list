import {useContext} from 'react';
import Button from 'src/components/shared/Button';
import {Modal} from 'src/components/blocks';
import styles from './DeleteModal.module.scss';
import PropTypes from 'prop-types';
import { CONTACT_CONTEXT } from 'src/constants';


const DeleteModal = ({onDeleteEvent}) => {
    const contactContext = useContext(CONTACT_CONTEXT);
    
    return (
        <Modal onClose={contactContext.closeDeleteModal}>
            <div className={styles['modal-container']}>
                <div>
                    <h3 className={styles['modal-info']}>Are you sure you want to delete this contact? There is no undo.</h3>
                </div>
                <div className={styles['modal__button-container']}>
                    <Button className={`button--primary--with-border ${styles['modal__button']}`} onClick={contactContext.closeDeleteModal} label='No, Cancel'/>
                    <Button className="button--primary" onClick={onDeleteEvent} label='Yes, Delete'/>
                </div>
            </div>
        </Modal>
    )
}

DeleteModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onDeleteEvent: PropTypes.func.isRequired
}

export default DeleteModal