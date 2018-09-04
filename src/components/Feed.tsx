import * as NProgress from "nprogress";
import "nprogress/nprogress.css";
import * as R from "ramda";
import * as React from "react";
import Waypoint from "react-waypoint";
import styled from "styled-components";
import { IArtImage, IUser } from "../IArtImage";
import { load } from "../services/api";
import { FakeFeedItem } from "./feedItem/FakeFeedItem";
import { FeedItem } from "./feedItem/FeedItem";

const hasCover = R.has(["cover"]);

interface IProps {
  urlFunc: string;
  user?: IUser;
}

interface IState {
  images: IArtImage[];
  page: number;
}

class Feed extends React.Component<IProps, IState> {
  public state = {
    images: null,
    page: 1
  };

  public async componentDidMount() {
    const { page } = this.state;
    const { urlFunc } = this.props;

    const parsed = await this.loadNextPage(urlFunc)([], page);

    this.setState(prevState => ({
      images: parsed,
      page: prevState.page + 1
    }));
  }

  public render() {
    const { page, images } = this.state;
    const { user, urlFunc } = this.props;
    const isLoading = R.isNil(images);

    if (isLoading) {
      return (
        <FeedContainer>
          <FakeFeedItem />
          <FakeFeedItem />
        </FeedContainer>
      );
    }

    return (
      <FeedContainer>
        {R.map(
          (art: IArtImage) => (
            <FeedItem key={art.id} art={art} user={user || art.user} />
          ),
          images
        )}
        <Waypoint
          onEnter={async () => {
            const parsed = await this.loadNextPage(urlFunc)(images, page);
            console.log("onEnter! LOAD NEXT PAGE!!!", page);
            this.setState(preState => ({
              images: parsed,
              page: preState.page + 1
            }));
          }}
        />
      </FeedContainer>
    );
  }

  private loadNextPage = (url: string) => async (
    prevImages: IArtImage[],
    page: number
  ) => {
    NProgress.start();

    const newImages = await load(url, { page });
    const add = R.compose(
      R.filter(hasCover),
      R.uniqBy(R.prop("id")),
      R.concat(prevImages)
    );

    const parsed = add(newImages);

    NProgress.done();

    return parsed;
  };
}

const FeedContainer = styled.ul`
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  max-width: 48rem;
  width: 100%;
`;

export { Feed, FeedContainer };
