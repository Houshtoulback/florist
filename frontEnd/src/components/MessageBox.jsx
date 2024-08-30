import PropTypes from "prop-types"

MessageBox.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.string,
    };

export default function MessageBox(props) {
    const { children, variant } = props;
    return (
        <div
            className={`m-10 rounded-lg bg-${variant}-200 h-28 text-xl text-center border-${variant}-400`}
        >
            {children}
        </div>
    );
}
