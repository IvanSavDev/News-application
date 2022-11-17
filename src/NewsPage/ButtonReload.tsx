import React, { useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ReactComponent as Update } from '../assets/image/arrow_reload.svg';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const ImgUpdate = styled(Update)`
  width: 100%;
  height: 100%;
  color: white;
  fill: transparent;
`;

const Button = styled.button<{ showAnimation: boolean }>`
  padding: 0;
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;

  ${(props) =>
    props.showAnimation &&
    css`
      animation: ${rotate} 1s linear;
    `};
`;

type Props = {
  action: () => void;
};

const ButtonReload = ({ action }: Props) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const animationId = useRef<number | null>(null);

  return (
    <Button
      type="button"
      showAnimation={showAnimation}
      onClick={() => {
        if (!animationId.current) {
          setShowAnimation(true);
          action();
          animationId.current = setTimeout(() => {
            setShowAnimation(false);
            animationId.current = null;
          }, 1000);
        }
      }}
    >
      <ImgUpdate />
    </Button>
  );
};

export default ButtonReload;
