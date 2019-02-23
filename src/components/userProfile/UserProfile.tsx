import * as OpenColor from "open-color";
import * as React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { IUser } from "../../IArtImage";
import { BackButton } from "../common/BackButton";
import { Feed } from "../Feed";
import { ShareButton, ShareButtonAsset } from "../feedItem/ShareButton";

export interface IProps {
  user: IUser;
  goBack: () => void;
}

const scrollToTop = () => window.scrollTo(0, 0);

function UserProfile({ user, goBack }: IProps) {
  useEffect(() => scrollToTop());

  const {
    headline,
    medium_avatar_url,
    full_name,
    artstation_profile_url,
    location
  } = user;

  return (
    <UserProfileContainer>
      <BackButton onClick={() => goBack()} />
      <UserInfoContainer>
        <UserAvatar>
          <img src={medium_avatar_url} alt={full_name} />
        </UserAvatar>
        {navigator.share && (
          <ShareButton
            title={full_name}
            text={headline}
            url={artstation_profile_url}
          />
        )}
        <UserFullName>{full_name}</UserFullName>
        <UserHeadline
          dangerouslySetInnerHTML={{
            __html: headline
          }}
        />
        <UserCountryCityName>{location}</UserCountryCityName>
        <UserProfileLink href={artstation_profile_url} target="_blank">
          View on ArtStation
        </UserProfileLink>
      </UserInfoContainer>
      <Feed
        user={user}
        urlFunc={`/.netlify/functions/user-projects?user=${user.username}`}
      />
    </UserProfileContainer>
  );
}

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;

  ${ShareButtonAsset} {
    margin: 2rem 0 0;
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
    width: 74px;
    height: 74px;
    border-radius: 50%;
    border: 6px solid ${OpenColor.gray[3]};
    top: -11px;
    left: -11px;
  }
`;

const UserFullName = styled.h1`
  width: 100%;
  text-align: center;
  margin: 1rem 0;
  padding: 0 1rem;
  font-size: 1.6rem;
`;

const UserCountryCityName = styled.p`
  width: 100%;
  text-align: center;
  font-style: italic;
  margin: 0.5rem;
  padding: 0 1rem;
`;

const UserHeadline = styled.p`
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0 1rem;
`;

const UserProfileLink = styled.a`
  width: 100%;
  text-align: center;
  display: block;
  color: ${OpenColor.gray[6]};
  text-decoration: none;
  margin: 1rem;
  transition: color 300ms;
  &:hover {
    color: ${OpenColor.gray[9]};
  }
`;

export {
  UserProfile,
  UserAvatar,
  UserFullName,
  UserCountryCityName,
  UserHeadline,
  UserProfileLink
};
