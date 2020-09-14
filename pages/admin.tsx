import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import fetcher from '../lib/fetcher';

import { API_URL } from '../defines';

const Root = styled.div`
  .container {
    position: relative;
    max-width: 800px;
    margin: 50px auto;
    padding: 20px 10px;

    .logoutButton {
      position: fixed;
      top: 30px;
      right: 50px;
      float: right;
    }

    .signature {
      border: 1px solid #eee;
      border-radius: 10px;
      margin: 10px auto;
      padding: 5px 8px;
    }
  }

  .loginForm {
    & > div {
      margin: 0 auto 20px auto;
    }

    button {
      float: right;
      span {
        color: white;
      }
    }
  }

  .errorMsg {
    margin-top: 50px;
  }
`;

const AdminPage: React.FC = () => {
  const router = useRouter();
  const [resError, setResError] = React.useState<string>('');
  const [inputs, setInputs] = React.useState<{ id: string; password: string }>({
    id: '',
    password: '',
  });
  const [token, setToken] = React.useState<string | null>(
    sessionStorage.getItem('@signaturePassword'),
  );
  const [signatureData, setSignatureData] = React.useState<
    {
      id: number;
      fileName: string;
      name: string;
      content: string;
      createdAt: Date;
    }[]
  >([]);

  const handleLogout = () => {
    sessionStorage.setItem('@signaturePassword', '');
    setToken(null);
    setSignatureData([]);
  };

  const handleSubmit = async () => {
    if (!inputs.id || !inputs.password)
      return setResError('아이디와 패스워드를 모두 입력해주세요.');
    const { signaturePassword, error } = await fetcher('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });

    if (error) {
      return setResError(error);
    }

    if (signaturePassword) {
      sessionStorage.setItem('@signaturePassword', signaturePassword);
      return setToken(signaturePassword);
    }

    return setResError('알 수 없는 에러 발생.');
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { signatures } = await fetcher(`${API_URL}/signature`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        if (signatures) {
          setSignatureData(signatures);
          setTimeout(
            () => router.replace(router.pathname, undefined, { shallow: true }),
            0,
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (token) {
      getData();
    }
  }, [token, router]);

  // React.useEffect(() => {
  //   if (router.query) {
  //     router.replace(router.pathname, undefined, { shallow: true });
  //   }
  // }, [router.query]);

  return (
    <>
      <Head>
        <title>onDisplay - 관리자 페이지</title>
      </Head>
      <Root>
        <div className="container">
          {token ? (
            <div>
              <Button
                type="button"
                className="logoutButton"
                variant="contained"
                onClick={() => handleLogout()}
              >
                로그아웃
              </Button>
              {signatureData.map((signature) => (
                <div key={signature.id} className="signature">
                  <p className="name">이름: {signature.name}</p>
                  <p className="content">내용: {signature.content}</p>
                  <p className="createdAt">작성 일시: {signature.createdAt}</p>
                </div>
              ))}
            </div>
          ) : (
            <form className="loginForm">
              <TextField
                label="아이디"
                name="username"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={inputs.id}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    id: e.target.value,
                  })
                }
              />
              <TextField
                label="비밀번호"
                name="password"
                type="password"
                fullWidth
                variant="outlined"
                required
                value={inputs.password}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    password: e.target.value,
                  })
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
              >
                제출
              </Button>
              {resError && <p className="errorMsg">{resError}</p>}
            </form>
          )}
        </div>
      </Root>
    </>
  );
};

export default AdminPage;
