import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Pannellum } from "pannellum-react";
import img from './img/img2.png'
import audio from './audio/matrix.mp3'
import redPill from './videos/red-pill-vista.mp4'
import bluePill from './videos/matrix-agent-smith.mp4'
import wearShade from './videos/the-matrix-reloaded-matrix.mp4'
import matrixRain from './videos/code-purpose-of-life.mp4'
import { useEffect, useRef, useState } from 'react';
import { Progress } from 'reactstrap';



function App() {

  const [step, setStep] = useState(-1);
  const [windowClassNames, setWindowClassNames] = useState(["", ""]);
  const [windowClassName, setWindowClassName] = useState("");
  const audioPlayer = useRef();
  const [answer, setAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  const mRain = useRef();
  const rPill = useRef();
  const bPill = useRef();
  const wShade = useRef();


  const handleTwwet = color => {
    const blueTweet = `I have chosen the Blue Pill. I will remain in the Matrix forever…%0A%0AComment your choice below the @RealW0rldNFT tweet.%0A%0A`;

    const redTweet = `I have chosen the Red Pill and will escape the Matrix.%0A%0AComment your choice below the @RealW0rldNFT tweet.%0A%0A`;

    window.location.href = (`https://twitter.com/intent/tweet?text=${color === "blue" ? blueTweet : redTweet}&url=${"https://entertherealworld.xyz"}`);
  }

  const animate = () => {
    setWindowClassNames(["animate-up", "animate-down"]);
    setTimeout(() => setWindowClassName("hide-window"), 2300)
  }

  const handleNext = () => {
    setStep(step + 1);
    if (step === 2) {
      animate();
    }
  }

  const handleRedEnded = () => {
    rPill.current.style.zIndex = -10;
    wShade.current.style.zIndex = 10;
    setTimeout(() => {
      wShade.current.play();
    }, 200)
  }

  const handleBlueEnded = () => {
    setTimeout(() => {
      handleTwwet("blue");
      bPill.current.style.zIndex = -10;
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    }, 300)
  }

  const handleShadeEnded = () => {
    wShade.current.style.zIndex = -10;
    mRain.current.style.zIndex = 10;
    handleTwwet("red");
  }

  const chooseBlue = () => {
    bPill.current.style.zIndex = 10;
    bPill.current.play();
  }

  const chooseRed = () => {
    rPill.current.style.zIndex = 10;
    rPill.current.play();
  }

  useEffect(() => {
    console.log(answer);
  }, [answer])

  return (
    <div className='root'>
      <audio preload='true' hidden src={audio} loop='true' ref={audioPlayer} />
      {
        loading
        &&
        <div className='loading-wrap'>
          <h1>The Real World</h1>
          <Progress
            animated
            className="my-3"
            value={100}
            color="success"
            style={{
              width: "20%",
              height: "2.3em",
              margin: "0 auto"
            }}
          />
        </div>
      }
      {step < 3
        &&
        <div className="q-wrap">
          {
            step === 0
            &&
            <div className='start-wrap'>
              <button onClick={() => {
                handleNext();
                audioPlayer.current.play();
              }}>Enter</button>
            </div>
          }
          {
            step === 1
            &&
            <div className='question q-one'>
              <h3>Verify you are real</h3>
              <div className='options-wrap'>
                <div className='verify-wrap'>
                  <input type="checkbox" value={answer} onInput={e => setAnswer(e.target.checked)} />
                  <label>i'm not a robot</label>
                </div>
                <button onClick={() => {
                  if (answer) handleNext()
                }}>continue</button>
              </div>
            </div>
          }
          {
            step === 2
            &&
            <div className='question q-one'>
              <h3>Are you ready to decide your destiny?</h3>
              <div className='options-wrap'>
                <button onClick={handleNext}>Yes</button>
              </div>
            </div>
          }
        </div>
      }
      <div className={'window-wrap ' + windowClassName}>
        <div className={windowClassNames[0]}></div>
        <div className={windowClassNames[1]}></div>
      </div>
      <div className='videos-wrap'>
        <video className='v1'
          src={bluePill}
          preload={true}
          controls={false}
          ref={bPill}
          onEnded={handleBlueEnded}
          muted={true}
        />
        <video className='v2'
          src={redPill}
          preload={true}
          controls={false}
          ref={rPill}
          onEnded={handleRedEnded}
          muted={true}
        />
        <video className='v3'
          src={wearShade}
          preload={true}
          controls={false}
          ref={wShade}
          onEnded={handleShadeEnded}
          muted={true}
        />
        <video className='v4'
          src={matrixRain}
          preload={true}
          controls={false}
          ref={mRain}
          loop={true}
          muted={true}
        />
      </div>
      <Pannellum
        width={window.innerWidth + "px"}
        height={window.innerHeight + "px"}
        image={img}
        pitch={-15}
        yaw={365}
        hfov={window.innerWidth < 1024 ? 10 : 90}
        autoLoad
        orientationOnByDefault={false}
        draggable
        keyboardZoom
        mouseZoom
        showControls
        showFullscreenCtrl={false}
        showZoomCtrl={false}
        onLoad={() => {
          setLoading(false);
          setStep(0);
        }}
        hotspotDebug={false}
      >
        <Pannellum.Hotspot
          type="custom"
          pitch={-23}
          yaw={352}
          hfov={120}
          text={"Blue Pill"}
          handleClick={chooseBlue}
          cssClass={"pill"}
          name="blue"
        />
        <Pannellum.Hotspot
          type="custom"
          pitch={-22.5}
          yaw={378.5}
          hfov={120}
          handleClick={chooseRed}
          text={"Red Pill"}
          cssClass={"pill pill2"}
          name="red"
        />
      </Pannellum>
    </div>
  );
}

export default App;
