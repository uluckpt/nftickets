import React, { memo, useEffect } from 'react';
// eslint-disable-next-line react/display-name
const withPageTitle = (title: string, Component: React.ComponentType) => (): JSX.Element => {
  const Memoized = memo(Component);

  useEffect(() => {
    document.title = title;
  }, []);
  return <Memoized />;
};

export default withPageTitle;
