import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
  background-color: #ccc;
  display: grid;
  place-items: center;
`;

const VisitorSignPad: React.FC = ({ ...props }) => {
  return <Root {...props}>hello</Root>;
};

export default VisitorSignPad;
