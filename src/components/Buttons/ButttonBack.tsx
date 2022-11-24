import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled(Link)`
  grid-area: button;
  align-self: center;
  border: 1px solid white;
  padding: 5px 10px;

  &:active {
    transform: scale(0.9);
  }
`;

type Props = {
  route: string;
};

const ButtonBack = ({ route }: Props) => <Button to={route}>{'<'}</Button>;

export default ButtonBack;
