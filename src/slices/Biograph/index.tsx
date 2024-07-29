import { font2 } from "@/app/layout";
import Avatar from "@/components/Avatar";
import Bounded2 from "@/components/Bounded2";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";

import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Exo_2 } from "next/font/google";
import { GoArrowDown } from "react-icons/go";
import { Info } from "./Info";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographSlice>;

/**
 * Component for "Biography" Slices.
 */
const Biograph = ({ slice }: BiographyProps): JSX.Element => {

  return (
    <Bounded2
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 md:grid-cols-[1fr,1fr]">
        <Heading size="xl" className="col-start-1">
          {slice.primary.heading}
        </Heading>

        <div className={font2.className}>
          <div
            className="text-2xl prose prose-xl prose-invert col-start-1"
          >
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>

        <Button
          linkField={slice.primary.button_link}
          label={slice.primary.button_text}
        />

        <Avatar
          image={slice.primary.avatar}
          className="row-start-1 max-w-sm md:col-start-2 md:row-end-3 mx-8"
        />
      </div>
      
      <GoArrowDown
        className="text-2xl mx-auto my-20 hover:scale-75 hover:translate-y-4 transition"
      />
      
      <div>
        <Info />
      </div>
    </Bounded2>
  );
};

export default Biograph;