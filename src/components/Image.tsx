import * as OpenColor from "open-color";
import * as React from "react";
import styled from "styled-components";
import { IArtImage, ICover } from "../IArtImage";
import { Spinner } from "./common/Spinner";
import { Cover } from "./feedItem/Cover";
import { MatureContentLayer } from "./feedItem/MatureContentLayer";

interface IProps {
  innerRef?: any;
  art: IArtImage;
  src: string | null;
}

interface IState {
  mature: boolean;
  loaded: boolean;
}

class Image extends React.Component<IProps, IState> {
  public state = {
    loaded: false,
    mature: false
  };

  public hideMatureLayer = () => {
    this.setState({ mature: false });
  };

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({ mature: nextProps.art.adult_content });
  }

  public render() {
    const {
      art: { cover, title },
      src
    } = this.props;
    const { mature, loaded } = this.state;

    return (
      <div ref={this.props.innerRef}>
        <ImageContainer>
          {!loaded && <Spinner />}
          {mature && <MatureContentLayer onClose={this.hideMatureLayer} />}
          <Cover
            onLoad={this.onLoad}
            src={src}
            title={title}
            smallImageUrl={cover.small_square_url}
          />
        </ImageContainer>
      </div>
    );
  }

  private onLoad = () => {
    this.setState({ loaded: true });
  };
}

const ImageContainer = styled.div`
  position: relative;
  background-color: ${OpenColor.gray[1]};
  padding-top: 100%;
`;

export { Image, IProps };
