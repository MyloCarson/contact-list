import PropTypes from 'prop-types';

const Button = ({label, type, formId, onClick, className}) => (
    <button className={`button ${className}`} type={type} onClick={onClick} form={formId} tabIndex="0">{label}</button>
);

Button.defaultProps = {
    formId: null,
    type: 'button',
    className: ''
}
Button.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    formId: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default Button;