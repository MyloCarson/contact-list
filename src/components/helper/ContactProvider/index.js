import { useState } from "react";
import PropTypes from 'prop-types'
import {  ADD_CONTACT, CONTACT_CONTEXT, EDIT_CONTACT, EMPTY_FORM_DATA } from "src/constants";


const ContactProvider = (props) => {

    const [state, setState] = useState({
        showForm: false,
        formAction: ADD_CONTACT,
        contact: EMPTY_FORM_DATA,
        position: null
    });

    return (
        <CONTACT_CONTEXT.Provider
            value={{
                state: {...state},
                editContact:({position, contact}) => {
                    setState({
                        ...state,
                        position,
                        contact,
                        showForm: true,
                        formAction: EDIT_CONTACT
                    })
                },
                updateShowForm: (showForm) => {
                    setState({
                        ...state,
                        showForm,
                        formAction: ADD_CONTACT,
                        contact: EMPTY_FORM_DATA,
                    })
                }
            }}>
            {props.children}
        </CONTACT_CONTEXT.Provider>
    )
}

ContactProvider.propTypes = {
    children:  PropTypes.any
}

export default ContactProvider;