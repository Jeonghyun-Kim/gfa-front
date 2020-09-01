import React from 'react';
// import { useRouter } from 'next/router';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '../Modal';

import fetcher from '../../lib/fetcher';

import { API_URL, COLORS } from '../../defines';

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
  height: 190px;
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

const MyInput = styled(TextField)`
  width: 100%;
  background-color: #f6f5f6;
  border-radius: 6px;

  input,
  textarea {
    text-align: center;
  }

  fieldset {
    display: none;
  }

  .MuiOutlinedInput-multiline {
    /* padding: 18.5px 14px; */
    padding: 9px 7px;
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

interface Props {
  mutateData: (
    data?: any,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<any>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const VisitorForm: React.FC<Props> = ({
  mutateData,
  open,
  setOpen,
  ...props
}) => {
  // const router = useRouter();
  const [name, setName] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const [res, setRes] = React.useState<number | null>(null);
  // const [contentFocused, setContentFocused] = React.useState<boolean>(false);

  const inputRefs = {
    name: React.useRef<HTMLInputElement>(null),
    content: React.useRef<HTMLTextAreaElement>(null),
  };

  const sendData = async () => {
    try {
      const { error } = await fetcher('/api/signature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          content: content.trim().replace('\n\n', '\n'),
        }),
      });
      // TODO: ####
      console.log(
        JSON.stringify({
          name,
          content: content.trim().replace('\n\n', '\n'),
        }),
      );

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
        zIndex={1}
      >
        <MyInput
          id="nameInput"
          inputRef={inputRefs.name}
          // name="name"
          type="text"
          variant="outlined"
          value={name}
          placeholder="이름을 입력해주세요"
          onFocus={() => {
            setOpen(true);
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
          inputRef={inputRefs.content}
          // name="content"
          type="text"
          variant="outlined"
          multiline
          rows={4}
          rowsMax={4}
          value={content}
          placeholder="전하고 싶은 말을 써주세요"
          onFocus={() => {
            setOpen(true);
            // if (name.length < 2) {
            //   const { current } = inputRefs.name;
            //   if (current) current.focus();
            // } else {
            //   setContentFocused(true);
            // }
          }}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </Container>
      <Container
        color={!open || enabled ? COLORS.primary : COLORS.disabled}
        position={{ x: 0, y: open ? -25 : 35 }}
        zIndex={0}
      >
        <h4 className="title">방명록</h4>
        {enabled ? (
          <MyButton
            onClick={() => {
              sendData();
              setOpen(false);
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
