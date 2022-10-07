import React, { PropsWithChildren } from 'react';
import Navbar from '@components/UI/Navbar/Navbar';
import { getSession, GetSessionParams } from 'next-auth/react';

type Props = {
  className?: string;
  isAuthorized?: boolean;
}

const PageLayout = ({ children, className, isAuthorized = false }: PropsWithChildren<Props>) => {
  return (
    <div className="flex flex-col h-full">
      <div className="w-full">
        <Navbar isLoggedIn={isAuthorized} />
      </div>
      <div className={`h-full bg-slate-600 ${className}`}>
        {children}
      </div>
    </div>
  )
}

export default PageLayout;