import { Composition } from "remotion";
import { HeroLoop } from "./HeroLoop";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="HeroLoop"
        component={HeroLoop}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={960}
        defaultProps={{}}
      />
    </>
  );
};
