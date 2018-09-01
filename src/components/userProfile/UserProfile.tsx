import { icons } from "feather-icons";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IArtImage } from "../../IArtImage";
import { load } from "../../services/api";
import { Gallery } from "../gallery/Gallery";

interface IProps {
  sorting: string;
}

interface IState {
  gallery: IArtImage[];
}

const scrollToTop = () => window.scrollTo(0, 0);

class UserProfile extends React.Component<
  RouteComponentProps<IProps, {}, { art: IArtImage }>,
  IState
> {
  public state = {
    gallery: null
  };

  public componentDidMount() {
    scrollToTop();

    const { username } = this.props.location.state.art.user;
    load(
      `/.netlify/functions/fetch?url=https://www.artstation.com/users/${username}/projects.json`,
      {}
    ).then(gallery => {
      this.setState({ gallery });
    });
  }

  public render() {
    const {
      match: {
        params: { sorting }
      }
    } = this.props;
    const { art } = this.props.location.state;
    const {
      headline,
      medium_avatar_url,
      full_name,
      artstation_profile_url,
      location
    } = art.user;

    const { gallery } = this.state;

    return (
      <UserProfileContainer>
        <BackButton to="" onClick={() => this.props.history.goBack()}>
          <div
            dangerouslySetInnerHTML={{
              __html: icons.x.toSvg()
            }}
          />
        </BackButton>
        {gallery !== null && <Gallery gallery={gallery} />}
        <UserAvatar>
          <img src={medium_avatar_url} alt={full_name} />
        </UserAvatar>
        <UserFullName>{full_name}</UserFullName>
        <UserHeadline>{headline}</UserHeadline>
        <UserCountryCityName>{location}</UserCountryCityName>
        <UserProfileLink href={artstation_profile_url} target="_blank">
          View on ArtStation
        </UserProfileLink>
        {/* <UserBackground src={art.cover.medium_image_url} /> */}
      </UserProfileContainer>
    );
  }

  private openUserProfile = (link: string) => () => {
    window.open(link);
  };
}

const BackButton = styled(NavLink)`
  align-self: flex-start;
  padding: 16px;
  color: gray;
  cursor: pointer;
  transition: color 300ms;
  &:hover {
    color: black;
  }
`;

const UserProfileContainer = styled.div`
  margin: 0 auto 2rem;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  max-width: 48rem;
  width: 100%;
`;

const UserBackground = styled.img`
  position: absolute;
  height: 100vh;
  opacity: 0.3;
  pointer-events: none;
`;

const UserAvatar = styled.div`
  position: relative;
  margin: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;

  img {
    width: 100%;
    border-radius: 50%;
  }

  ::before {
    content: "";
    position: absolute;
    z-index: 3;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 3px solid white;
    top: -6px;
    left: -6px;
  }
`;

const UserFullName = styled.h1`
  width: 100%;
  text-align: center;
  margin: 1rem;
  padding: 0;
  font-size: 1.6rem;
`;

const UserCountryCityName = styled.p`
  width: 100%;
  text-align: center;
  font-style: italic;
  margin: 0.5rem;
  padding: 0;
`;

const UserHeadline = styled.p`
  width: 100%;
  text-align: center;
  margin: 0 1rem;
  padding: 0;
`;

const UserProfileLink = styled.a`
  width: 100%;
  text-align: center;
  display: block;
  color: grey;
  text-decoration: none;
  margin: 1rem;
  &:hover {
    color: white;
  }
`;

export {
  UserProfile,
  UserBackground,
  UserAvatar,
  UserFullName,
  UserCountryCityName,
  UserHeadline,
  UserProfileLink
};
