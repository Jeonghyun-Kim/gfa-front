import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Loading from '../../components/Loading';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

interface Props {}
const ArtistIndexPage: React.FC<Props> = ({ ...props }) => {
  const router = useRouter();
  React.useEffect(() => {
    const item = sessionStorage.getItem('@artistId');
    router.push(`/artist/${item ? Number(item) : 1}`);
  }, []);
  return (
    <Root {...props}>
      <Loading>전시장 입장중...</Loading>
    </Root>
  );
};

export default ArtistIndexPage;
