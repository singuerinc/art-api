import { mount, shallow } from "enzyme";
import * as React from "react";
import {
  Cover,
  IProps as ICoverProps,
  openLargeImage,
  smallToLarge
} from "../Cover";

describe("<Cover />", () => {
  it("renders props correctly", () => {
    const props: ICoverProps = {
      onLoad: () => {
        //
      },
      smallImageUrl: "bar",
      src: "faz",
      title: "foo"
    };

    const wrapper = mount(<Cover {...props} />);
    const img = wrapper.getDOMNode() as HTMLImageElement;

    expect(img.getAttribute("alt")).toBe("foo");
    expect(img.getAttribute("title")).toBe("foo");
    expect(img.getAttribute("src")).toBe("faz");
  });

  it("should be not loaded by default", () => {
    const props: ICoverProps = {
      onLoad: () => {
        //
      },
      smallImageUrl: "bar",
      src: "faz",
      title: "foo"
    };

    const wrapper = shallow(<Cover {...props} />);
    expect(wrapper.state("loaded")).toBeFalsy();
  });

  it.skip("should be loaded after the image calls onLoad", () => {
    const props: ICoverProps = {
      onLoad: () => {
        //
      },
      smallImageUrl: "bar",
      src: "faz",
      title: "foo"
    };

    const wrapper = mount(<Cover {...props} />);
    // const img = wrapper.getDOMNode() as HTMLImageElement;
    wrapper.simulate("onload", () => {
      //
    });
    expect(wrapper.state("loaded")).toBeFalsy();
  });
});

describe("smallToLarge", () => {
  it("should convert an URL", () => {
    const small =
      // tslint:disable-next-line
      "https://cdnb.artstation.com/p/assets/images/images/012/713/977/20181101034912/small_square/aisosa-ugiagbe-1.jpg?1536153239";
    const large =
      "https://cdnb.artstation.com/p/assets/images/images/012/713/977/large/aisosa-ugiagbe-1.jpg?1536153239";

    expect(smallToLarge(small)).toBe(large);
  });

  it("should convert an url with date", () => {
    const small =
      // tslint:disable-next-line
      "https://cdna.artstation.com/p/assets/images/images/013/779/574/20181101034912/small_square/tom-garden-tom-garden-rdr2-fanart.jpg?1541062153";
    const large =
      // tslint:disable-next-line
      "https://cdna.artstation.com/p/assets/images/images/013/779/574/large/tom-garden-tom-garden-rdr2-fanart.jpg?1541062153";

    expect(smallToLarge(small)).toBe(large);
  });
});

describe("openLargeImage", () => {
  it("should open a link in a new window with a converted small_square image into large", () => {
    const small =
      // tslint:disable-next-line
      "https://cdnb.artstation.com/p/assets/images/images/012/713/977/20181101034912/small_square/aisosa-ugiagbe-1.jpg?1536153239";
    const large =
      "https://cdnb.artstation.com/p/assets/images/images/012/713/977/large/aisosa-ugiagbe-1.jpg?1536153239";

    // TODO: check if we need to restore
    window.open = jest.fn();
    openLargeImage(small)();

    expect(window.open).toBeCalledWith(large);
  });
});
