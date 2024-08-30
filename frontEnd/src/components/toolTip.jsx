import PropTypes from "prop-types";

Tooltip.propTypes = {
  children: PropTypes.node,
  message: PropTypes.string,
};

export default function Tooltip(props) {
  const { children, message } = props;
  return (
    <div className='relative group/tooltip select-none'>
      {children}
      <span
        className={
          "invisible w-32 bg-black text-white text-center rounded-md py-1 absolute z-10 left-full top-1/2 group-hover/tooltip:visible"
        }
      >
        {message}
      </span>
    </div>
  );
}
