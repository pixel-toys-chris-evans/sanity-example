import Image from "next/image";
import { LogoProps } from "sanity";

export function Logo(props: LogoProps) {
  return (
    <Image
      src="/android-chrome-512x512.png"
      width={48}
      height={48}
      alt={props.title}
    />
  );
}
