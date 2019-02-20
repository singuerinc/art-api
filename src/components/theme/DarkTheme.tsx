import * as OpenColor from "open-color";
import * as React from "react";
import { createGlobalStyle } from "styled-components";
import { FeedItemContainer } from "../feedItem/FeedItem";
import { Avatar, StyledNavLink } from "../feedItem/FeedItemHeader";

export function Theme() {
  const Dark = createGlobalStyle`
    html {
      background-color: rgba(0, 0, 0, 0.92);
    }

    ${FeedItemContainer}{
      background-color: transparent;
      box-shadow: 0 0 3em black;

      @media only screen and (min-width: 48rem) {
        border: 1px solid ${OpenColor.gray[9]};
      }
    }

    ${Avatar}{
      filter: grayscale(50%);
      opacity: 0.3;
    }

    ${StyledNavLink}{
      color: ${OpenColor.gray[8]};

      &:hover {
        color: ${OpenColor.gray[7]};
      }

      &::before {
        border: 2px solid ${OpenColor.gray[8]};
      }
    }
  `;

  return <Dark />;
}

interface IProps {
  onClick: (event: React.MouseEvent<SVGSVGElement>) => void;
}

export function Icon({ onClick }: IProps) {
  return (
    <svg
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#222"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}