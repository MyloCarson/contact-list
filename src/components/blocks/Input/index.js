import {useState} from 'react';
import PropTypes from 'prop-types';

const Input = ({type, name, label, placeholder, error, onChange, value}) => {
    const [_value, setValue] = useState(value);
    const handleChange = (event) => {
        const value = event.target.value;
        setValue(value)
        onChange({name, value});
    }

    return (
        <input type={type} name={name} htmlFor={label} placeholder={placeholder} className={`form-input ${error ? 'error': ''}`} value={_value} onChange={handleChange} tabIndex="0" />
    )
}

Input.defaultProps = {
    type: 'text',
    error: false,
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    error: PropTypes.bool

}

export default Input