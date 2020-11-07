import PropTypes from 'prop-types';

const ErrorBoundary = ({message}) => (<h2 style={{textAlign: 'center'}}>{message}</h2>)

ErrorBoundary.propTypes= {
    message: PropTypes.string.isRequired
}

export default ErrorBoundary;