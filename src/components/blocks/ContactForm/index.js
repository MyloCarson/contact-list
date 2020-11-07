import {useRef, useState, useContext}  from 'react'
import {Modal, Input} from 'src/components/blocks';
import Button from 'src/components/shared/Button';
import {UserIcon} from 'src/components/vectors';
import { CONTACT_CONTEXT } from 'src/constants';
import {isValidEmail, validateObject} from 'src/utils'
import PropTypes from 'prop-types';

import styles from './ContactForm.module.scss';

const ContactForm = ({onClose, contactEvent}) => {

    const contactContext = useContext(CONTACT_CONTEXT);

    const [contactData, setContactData] = useState(contactContext.state.contact);
    const [imageData, setImageData] = useState(contactContext.state.contact.avatar)
    const [formError, setFormError] =  useState({
        first_name: false,
        last_name: false,
        email: false,
    });


    const inputSelectRef = useRef(null);

    const selectFile = () => {
        inputSelectRef.current.click();
    }


    const handleFileChange = (event) => {
        const target = event.target;
        
        const reader = new FileReader();
        reader.onload = function(){
            setImageData(reader.result)
            updateNode('avatar', reader.result);
        };
        reader.readAsDataURL(target.files[0]);
    }

    const handleChange = (payload) => {
        if(payload.name === 'first_name'){
            updateNode('first_name', payload.value);
        }
        if(payload.name === 'last_name'){
            updateNode('last_name', payload.value)
        }
        if(payload.name === 'email'){
            updateNode('email', payload.value)
        }
        
    }

    const checkError = () => {
        setFormError(
            {
                first_name: !contactData.first_name,
                last_name: !contactData.last_name,
                email: !isValidEmail(contactData.email),
            }
        )
    }

    const updateNode = (node, value) => {
        const _newContact = contactData;
        _newContact[node] = value;
        setContactData(_newContact);
    }

    const emitNewContact = () => {
        checkError();
        
        if(!validateObject(contactData, 'first_name', 'last_name', 'email')){
            return;
        }
        if(!isValidEmail(contactData.email)){
            return;
        }
        if(!validateObject(contactData, 'avatar')){
            contactData.avatar = '/assets/images/user.svg'
        }

        contactEvent(contactData)
        onClose();
    }
    

    return (
        <Modal onClose={onClose} headerTitle='Create Contact'>
            <div className={styles['modal-form']}>
                <form className="form" id="form" onSubmit={(e) => e.preventDefault()}> 
                    <div className={styles['modal-form__head']}>
                        {
                            !imageData && (
                                <div className="circle circle--primary circle--md" onClick={selectFile}>
                                    <UserIcon />
                                </div>
                            )
                        }
                        {imageData && (
                            <div className={styles['modal-form__image-wrapper']}>
                                <img src={imageData} className={styles['modal-form__image']}  alt="avatar"/>
                            </div>
                        )}
                        <Button className={`button-bottom-border-only ${styles['modal-form__add-button']} `} onClick={selectFile} label={!imageData ? 'Add a Photo': 'Edit Photo'} />
                        <input ref={inputSelectRef} hidden type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
    
                    <div className="form-group">
                        <div className="form-control">
                            <label id="date_of_birth" className="form-label">First name</label>
                            <Input label="first_name" name="first_name" placeholder="Jamie" value={contactData.first_name} error={formError.first_name} onChange={handleChange} />
                        </div>
                        <div className="form-control">
                            <label id="last_name" className="form-label">Last Name</label>
                            <Input label="last_name" name="last_name" placeholder="Rodriguez" value={contactData.last_name} error={formError.last_name} onChange={handleChange} />
                        </div>
                    </div>
                
                    <div className="form-group">
                        <div className="form-control">
                            <label id="email" className="form-label">Email address</label>
                            <Input label="email" name="email" placeholder="someone@example.com" value={contactData.email} error={formError.email} onChange={handleChange} />
                        </div>
                    </div>
    
                    
    
                </form>
            </div>
            <div className="modal-footer">
                <Button className="button--primary" onClick={emitNewContact} type="submit" label='Add Contact' formId="form" />
            </div>
        </Modal>
    )
}

ContactForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    contactEvent: PropTypes.func.isRequired
}

export default ContactForm