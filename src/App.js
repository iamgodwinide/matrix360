import './App.css';
import { Pannellum } from "pannellum-react";
import img from './img/img.png'
import audio from './audio/matrix.mp3'
import { useEffect, useRef, useState } from 'react';

function App() {

  const [step, setStep] = useState(0);
  const [windowClassNames, setWindowClassNames] = useState(["", ""]);
  const [windowClassName, setWindowClassName] = useState("");
  const audioPlayer = useRef();
  const [answer, setAnswer] = useState(false);


  const handleTwwet = color => {
    const blueTweet = "I have chosen the blue pill, i will remain in the matrix, I'm an NPC after all."
    const redTweet = "I have chosen the red pill, I am ready to break free from the matrix and enter the real world.";
    window.open(`https://twitter.com/intent/tweet?text=${color === "blue" ? blueTweet : redTweet}`);
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


  useEffect(() => {
    console.log(answer);
  }, [answer])

  return (
    <div className='root'>
      <audio preload='true' hidden src={audio} loop='true' ref={audioPlayer} />
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
              }}>Start</button>
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
      <Pannellum
        width="100vw"
        height="100vh"
        image={img}
        pitch={-12}
        yaw={360}
        hfov={100}
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
          yaw={355}
          hfov={120}
          text={"Blue Pill"}
          handleClick={() => handleTwwet("blue")}
          cssClass={"pill"}
          name="blue"
        />
        <Pannellum.Hotspot
          type="custom"
          pitch={-19.3}
          yaw={372}
          hfov={120}
          handleClick={() => handleTwwet("red")}
          text={"Red Pill"}
          cssClass={"pill"}
          name="red"
        />
      </Pannellum>
    </div>
  );
}

export default App;
