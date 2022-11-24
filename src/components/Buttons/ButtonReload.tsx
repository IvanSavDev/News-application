import styled from 'styled-components';
import { ReactComponent as Update } from 'src/assets/image/arrow_reload.svg';

const UpdateImg = styled(Update)`
  width: 100%;
  height: 100%;
  color: white;
  fill: transparent;
`;

const Button = styled.button<{ disabled: boolean }>`
  padding: 0;
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
  &:disabled {
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
    cursor: auto;
  }
`;

type Props = {
  action: () => void;
  disabled: boolean;
};

const ButtonReload = ({ action, disabled }: Props) => (
  <Button
    type="button"
    onClick={() => {
      if (!disabled) {
        action();
      }
    }}
    disabled={disabled}
  >
    <UpdateImg />
  </Button>
);

export default ButtonReload;
