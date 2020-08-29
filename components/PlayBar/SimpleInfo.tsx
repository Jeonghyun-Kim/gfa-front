import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface RootProps {
  animation: boolean;
}
const Root = styled.div<RootProps>`
  width: 200px;
  margin-left: 1rem;
  text-align: left;
  overflow: hidden;
  p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    white-space: nowrap;
  }
  .name {
    color: white;
  }
  .title {
    color: #b1b1b1;
  }

  ${(props) =>
    props.animation &&
    `
    p.title {
      display: inline-block;
      animation: marquee 5s linear infinite;
    }

    @keyframes marquee {
      0% {
        transform: translate(100%, 0);
      }
      100% {
        transform: translate(-100%, 0);
      }
    }
  `}
`;

interface Props {
  artworkData: ArtworkData;
  animation?: boolean;
}
const SimpleInfo: React.FC<Props> = ({
  artworkData,
  animation = false,
  ...props
}) => {
  const router = useRouter();
  const { artist, title } = artworkData;
  return (
    <Root animation={animation} {...props}>
      {router.pathname === '/artist' && (
        <>
          <p className="name">{artist}</p>
          <p className="title">{title}</p>
        </>
      )}
    </Root>
  );
};

export default SimpleInfo;
