import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import IndexContext from '../../IndexContext';

interface RootProps {
  animation: boolean;
}
const Root = styled.div<RootProps>`
  width: 250px;
  margin-left: 1rem;
  text-align: left;
  overflow: hidden;
  p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    white-space: nowrap;
    color: white;
  }

  .title {
    color: #b1b1b1;
  }

  &:hover {
    p.title {
      animation-play-state: paused;
    }
  }

  ${(props) =>
    props.animation &&
    `
    p.title {
      display: inline-block;
      animation: marquee 5s linear infinite;
      animation-delay: -2s;
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
  const { artistName, title } = artworkData;

  const { withLayout, lastModal } = React.useContext(IndexContext);

  if (lastModal) return <Root animation={false} />;
  return (
    <Root
      animation={animation}
      className={withLayout ? 'withLayout' : ''}
      {...props}
    >
      {router.pathname === '/artist' && (
        <>
          <p className="name">{artistName}</p>
          <p className="title">{title}</p>
        </>
      )}
    </Root>
  );
};

export default SimpleInfo;
