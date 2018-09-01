import * as React from "react";
import Waypoint from "react-waypoint";
import styled from "styled-components";
import { IArtImage } from "../IArtImage";
import { FeedItemFooter } from "./feedItem/FeedItemFooter";
import { FeedItemHeader } from "./feedItem/FeedItemHeader";
import { Image } from "./Image";

interface IProps {
  art: IArtImage;
}
interface IState {
  src: string;
}

class FeedItem extends React.Component<IProps, IState> {
  public state = {
    src: null
  };

  public render() {
    const { src } = this.state;
    const { art } = this.props;
    const { id, cover } = art;
    const ref: React.RefObject<HTMLLIElement> = React.createRef();

    return (
      <FeedItemContainer key={id} ref={ref}>
        {art.user && <FeedItemHeader art={art} />}
        <Waypoint
          key={id}
          scrollableAncestor={window}
          bottomOffset={-500}
          onEnter={() => {
            if (src === null) {
              this.setState({ src: cover.medium_image_url });
            }
          }}
        >
          <Image art={art} src={src} />
        </Waypoint>
        <FeedItemFooter art={art} />
      </FeedItemContainer>
    );
  }
}

const FeedItemContainer = styled.li`
  width: 100%;
  background-color: #fff;
  color: black;
  margin: 1rem 0;
  position: relative;

  @media only screen and (min-width: 48rem) {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;

    &:first-child {
      margin: 0 0 1rem;
    }
  }
`;

export { FeedItem };
