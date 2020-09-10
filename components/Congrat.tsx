import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  height: fit-content;
  margin-bottom: 10px;

  h4,
  p {
    margin: 0;
  }

  .grow {
    flex-grow: 1;
  }

  .initialBox {
    width: 100%;
    height: ${(90 * 375) / 307}px;
    display: grid;
    grid-template-columns: 90px 1fr;
    img.profilePic {
      width: 100%;
      grid-column: 1 / 2;
      object-fit: contain;
    }
    .summary {
      display: flex;
      flex-direction: column;
      margin: 8px 10px 0 10px;
      .division {
        font-size: 1rem;
        font-weight: normal;
        letter-spacing: 10px;
      }
      .name {
        font-size: 0.875rem;
        font-weight: 500;
      }
      .smallTitle {
        font-size: 0.875rem;
        color: #7d7d7d;
        margin-bottom: 8px;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }

  .fullContent {
    margin-top: 10px;
    padding: 20px 10px;
    .title {
      margin: 10px 0;
      font-size: 1.25rem;
      font-weight: 500;
    }
  }
`;

interface Props {
  id: number;
  name: string;
  title: string;
  content: string;
  className?: string | undefined;
}
const Congrat: React.FC<Props> = ({
  id,
  name,
  title,
  content,
  className,
  ...props
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Root className={`${className}`} {...props}>
      <div
        className="initialBox"
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={-1}
        onKeyDown={() => {}}
      >
        <img
          className="profilePic"
          alt={name}
          src={`/images/profile/${id}.jpg`}
        />
        <div className="summary">
          {open && <div className="grow" />}
          <h4 className="division">축사</h4>
          <p className="name">{name}</p>
          {!open && (
            <>
              <div className="grow" />
              <p className="smallTitle">{title}</p>
            </>
          )}
        </div>
      </div>
      {open && (
        <div className="fullContent">
          <h4 className="title">{title}</h4>
          <p
            className="content"
            dangerouslySetInnerHTML={{
              __html: content.split('\n').join('<br />'),
            }}
          />
        </div>
      )}
    </Root>
  );
};

export default Congrat;
