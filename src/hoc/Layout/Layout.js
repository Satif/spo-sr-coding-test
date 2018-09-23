import React from 'react';

const Layout = () => {
  return (
    <div className="app">
      <main className="container">{this.props.children}</main>
    </div>
  );
};

export default Layout;
