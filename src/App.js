import './App.css';
import { Pannellum } from "pannellum-react";
import img from './img/img.png'

function App() {

  const handleTwwet = color => {
    const blueTweet = "I have chosen the blue pill, i will remain in the matrix, I'm an NPC after all."
    const redTweet = "I have chosen the red pill, I am ready to break free from the matrix and enter the real world.";
    window.open(`https://twitter.com/intent/tweet?text=${color === "blue" ? blueTweet : redTweet}`);
  }

  return (
    <Pannellum
      width="100vw"
      height="100vh"
      image={img}
      pitch={0}
      yaw={360}
      hfov={170}
      showZoomCtrl={false}
      showFullscreenCtrl={false}
      autoLoad
      onLoad={() => {
        console.log("panorama loaded");
      }}
    >
      <Pannellum.Hotspot
        type="custom"
        pitch={-19.3}
        yaw={362.7}
        hfov={120}
        text={"Blue Pill"}
        handleClick={() => handleTwwet("blue")}
        cssClass={"pill"}
        name="blue"
      />
      <Pannellum.Hotspot
        type="custom"
        pitch={-19.3}
        yaw={365.4}
        hfov={120}
        handleClick={() => handleTwwet("red")}
        text={"Red Pill"}
        cssClass={"pill"}
        name="red"
      />
    </Pannellum>
  );
}

export default App;
