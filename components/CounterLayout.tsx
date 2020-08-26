import React from 'react';

// import { logPageView } from '../utils/analytics';

import { sendCounter } from '../lib/utils';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    // logPageView();
    if (process.env.NODE_ENV === 'production') sendCounter();
  }, []);
  return <>{children}</>;
};

export default Layout;
