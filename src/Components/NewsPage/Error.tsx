import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ButtonBack from '../Buttons/ButttonBack';

const Text = styled.p`
  display: inline-block;
  margin-right: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const Error = () => {
  return (
    <Wrapper>
      <Text>News not found, try to return to the main page</Text>
      <ButtonBack route="/" />
    </Wrapper>
  );
};

export default Error;
