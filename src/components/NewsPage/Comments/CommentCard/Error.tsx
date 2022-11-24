import styled from 'styled-components';

const ErrorText = styled.div`
  color: red;
`;

const Error = () => (
  <ErrorText>Error loading comments, please try again</ErrorText>
);

export default Error;
