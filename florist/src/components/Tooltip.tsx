import { ReactNode } from "react";

export default function Tooltip(props: {
  children: ReactNode;
  massage: string;
}) {
  const { children, massage } = props;

  return (
    <div className='relative group/tooltip select-none'>
      {children}
      <span className='invisible w-32 bg-black text-white text-center rounded-md py-1 absolute z-10 bottom-full left-1/2 group-hover/tooltip:visible'>
        {massage}
      </span>
    </div>
  );
}
