import React, { PropsWithChildren } from 'react';
import Navbar from '@components/UI/Navbar/Navbar';

type Props = {
  className?: string;
}

const PageLayout = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <div className="flex flex-col h-full">
      <div className="w-full">
        <Navbar isLoggedIn={true} />
      </div>
      <div className={`h-full bg-slate-600 ${className}`}>
        {children}
      </div>
    </div>
  )

}

export default PageLayout;