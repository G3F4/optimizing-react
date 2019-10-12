import React, { FC } from 'react';

const Loader: FC = ({ children }) => (
  <div className="lds-default">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <br />
    <br />
    <br />
    <br />
    {children || 'Loading assets...'}
  </div>
);

export default Loader;
