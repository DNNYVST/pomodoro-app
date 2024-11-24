const BreakBackground = () => (
  <>
    <div
      id="breakFadeIn"
      className="bg-background fixed object-cover w-full h-full pointer-events-none -z-1"
    />
    <video
      preload="auto"
      autoPlay
      muted
      loop
      className="fixed object-cover w-[100vw] h-[100vh] ml-[-50%] z-[-1]"
    >
      <source src="/clouds.mp4" type="video/mp4" />
    </video>
    <video
      preload="auto"
      autoPlay
      muted
      loop
      className="fixed object-cover w-[100vw] h-[100vh] z-[-2]"
    >
      <source src="/daisies.mp4" type="video/mp4" />
    </video>
  </>
);

export default BreakBackground;
