import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IArtImage } from "../../IArtImage";

const FeedItemHeader = ({ art }: { art: IArtImage }) => (
  <StyledNavLink to={{ pathname: `/user/${art.user.id}`, state: { art } }}>
    <Avatar
      title={art.user.username}
      alt={art.user.username}
      src={art.user.medium_avatar_url}
    />
    <UserFullName>{art.user.full_name}</UserFullName>
    <UserName>@{art.user.username}</UserName>
  </StyledNavLink>
);

const UserFullName = styled.h2`
  font-size: 1rem;
  padding: 0;
  margin: 0 0.8rem;
  font-weight: 500;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const UserName = styled.h3`
  margin: 0;
  font-weight: 300;
  color: lightgray;
  margin-left: auto;
  font-size: 0.9rem;
`;

const Avatar = styled.img`
  margin: 0 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledNavLink = styled(NavLink)`
  margin: 0.7rem 1rem;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  color: #111;
  text-decoration: none;
  transition: color 300ms;

  &:hover {
    color: gray;
  }

  &::before {
    border: 2px solid grey;
    border-radius: 50%;
    content: "";
    z-index: 1;
    display: block;
    position: absolute;
    top: -4px;
    left: -4px;
    width: 36px;
    height: 36px;
  }
`;

export { FeedItemHeader, StyledNavLink, UserFullName, UserName, Avatar };
