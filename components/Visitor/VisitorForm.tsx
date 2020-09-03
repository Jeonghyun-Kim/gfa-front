import React from 'react';
// import { useRouter } from 'next/router';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '../Modal/Modal';

import fetcher from '../../lib/fetcher';

import { API_URL, HEADER_HEIGHT, COLORS } from '../../defines';

import IndexContext from '../../IndexContext';

const Root = styled.div`
  position: relative;
  width: calc(100% - 40px);
  height: 240px;
  display: grid;
  place-items: center;
`;

interface ContainerProps {
  color: string;
  position: {
    x: number;
    y: number;
  };
  zIndex: number;
}
const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 180px;
  border: 1px solid #b5b5b5;
  border-radius: 8px;
  transition: 300ms ease;
  transform: translate(
    ${(props) => 0 + props.position.x}px,
    calc(-50% - ${(props) => props.position.y}px)
  );
  background-color: ${(props) => props.color};
  z-index: ${(props) => props.zIndex};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  color: white;
  h4.title {
    margin: 0;
    &:hover {
      cursor: default;
    }
  }
`;

const ExitHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-color: white;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px; */
  z-index: 2;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;

  svg {
    font-size: 2rem;
  }
`;

interface InputProps {
  focused: boolean;
}
const MyInput = styled(TextField)<InputProps>`
  width: 100%;
  background-color: #f6f5f6;
  border-radius: 6px;

  input,
  textarea {
    text-align: center;
  }

  fieldset {
    border-color: ${(props) =>
      props.focused ? COLORS.primary : '#eee'} !important;
  }

  .MuiOutlinedInput-multiline {
    /* padding: 18.5px 14px; */
    padding: 9px 7px;
  }

  &:hover {
    fieldset {
      opacity: ${(props) => (props.focused ? 1 : 0.5)} !important;
      transition: 300ms;
    }
  }
`;

const MyButton = styled(Button)`
  width: 100%;
  transform: translateY(5px);
  span {
    color: white;
  }
`;

const ResModal = styled(Modal)`
  width: 500px;
  max-width: 80%;
  button {
    float: right;
  }
`;

interface MyInputProps {
  name: boolean;
  content: boolean;
}

interface Props {
  mutateData: (
    data?: any,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<any>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputFocuses: MyInputProps;
  setInputFocuses: React.Dispatch<React.SetStateAction<MyInputProps>>;
  handleClose: () => void;
}
const VisitorForm: React.FC<Props> = ({
  mutateData,
  open,
  setOpen,
  inputFocuses,
  setInputFocuses,
  handleClose,
  ...props
}) => {
  // const router = useRouter();
  const [name, setName] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const [res, setRes] = React.useState<number | null>(null);

  const { withLayout } = React.useContext(IndexContext);

  const sendData = async () => {
    try {
      // TODO: VALIDATION
      const { error } = await fetcher('/api/signature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          content: content.trim(),
        }),
      });

      setRes(error);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnable = (set: boolean) => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => setEnabled(set), 50);
    setTimer(newTimer);
  };

  const clearInputs = () => {
    setName('');
    setContent('');
  };

  // TODO: input maxlength.
  return (
    <Root {...props}>
      {open && !withLayout && (
        <ExitHeader>
          <Button variant="text" onClick={() => handleClose()}>
            취소
          </Button>
        </ExitHeader>
      )}
      <ResModal visible={res !== null}>
        <h3>성공적으로 업로드하였습니다.</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpen(false);
            setRes(null);
            clearInputs();
            mutateData(`${API_URL}/signature/count`);
          }}
        >
          확인
        </Button>
      </ResModal>
      <Container
        color="white"
        position={{ x: 0, y: open ? 25 : -10 }}
        zIndex={5}
      >
        <MyInput
          id="nameInput"
          name="name"
          autoComplete="off"
          type="text"
          variant="outlined"
          value={name}
          placeholder={inputFocuses.name ? '' : '이름을 입력해주세요'}
          onClick={(e) => e.preventDefault()}
          onFocus={(e) => {
            if (!open && !withLayout) {
              e.target.blur();
            } else {
              setInputFocuses({ name: true, content: false });
            }
            setOpen(true);
          }}
          focused={inputFocuses.name}
          onBlur={() => {
            setInputFocuses({
              ...inputFocuses,
              name: false,
            });
          }}
          onChange={(e) => {
            const newName = e.target.value;
            setName(newName);
            if (newName && newName.length > 1) {
              handleEnable(true);
            } else {
              handleEnable(false);
            }
          }}
        />
        <MyInput
          id="contentInput"
          type="text"
          variant="outlined"
          multiline
          rows={4}
          rowsMax={4}
          value={content}
          placeholder={inputFocuses.content ? '' : '전하고 싶은 말을 써주세요'}
          onFocus={(e) => {
            if (!open && !withLayout) {
              e.target.blur();
            } else {
              setInputFocuses({ name: false, content: true });
            }
            setOpen(true);
          }}
          focused={inputFocuses.content}
          onBlur={() => {
            setInputFocuses({
              ...inputFocuses,
              content: false,
            });
          }}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </Container>
      <Container
        color={!open || enabled ? COLORS.primary : COLORS.disabled}
        position={{ x: 0, y: open ? -25 : 35 }}
        zIndex={4}
      >
        <h4 className="title">방명록</h4>
        {enabled ? (
          <MyButton
            onClick={() => {
              sendData();
              handleEnable(false);
              handleClose();
            }}
          >
            <span>보내기</span>
          </MyButton>
        ) : (
          <MyButton disabled>
            <span>이름을 입력해주세요</span>
          </MyButton>
        )}
      </Container>
    </Root>
  );
};

export default VisitorForm;
