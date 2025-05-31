import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { encryptData, decryptData, hashImage } from "../util/encryption";
import { handleVideoPasswordOperation, updateVideoPassword } from "../util/ApiRoute";
import backgroundImage from "../assets/abstract-design/background.png";
import abstractImage from "../assets/abstract-design/abstract.png";
import Navbar from "../components/Navbar";
import vid from "../assets/vid.mp4";
import { useNavigate } from "react-router";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: #0d0d0d;
`;

const Box = styled.div`
  position: relative;
  font-family: 'Lexend', sans-serif;
  width: 100%;
  max-width: 900px;
  padding: 2rem;
  border-radius: 12px;
  overflow: hidden;
  margin: auto;
  background-color: #1c1c1c;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${backgroundImage}) center/cover no-repeat;
  opacity: 1;
  z-index: 1;
`;

const AbstractOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background: url(${abstractImage}) center/contain no-repeat;
  opacity: 1;
  z-index: 2;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
`;

const Title = styled.h2`
  color: #CAFF33;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #BFBFBF;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 30px;
  border: 1px solid #333;
  background-color: #222;
  color: #fff;
  margin-bottom: 1rem;
  font-family: 'Lexend', sans-serif;
  
  &:read-only {
    background-color: #333;
    cursor: not-allowed;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #CAFF33;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  
  &:hover {
    color: #fff;
  }

  &:disabled {
    color: #666;
    cursor: not-allowed;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #333;
  position: relative;
  z-index: 1;
`;

const TimestampDisplay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #CAFF33;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 16px;
  z-index: 3;
  font-family: 'Lexend', sans-serif;
  font-weight: bold;
`;

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  z-index: 2;
`;

const GridCell = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(202, 255, 51, 0.2);
  }
`;

const Button = styled.button`
  width: 15rem;
  background-color: #CAFF33;
  color: #1c1c1c;
  font: inherit;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  bottom: -2rem;
  right: 2rem;

  &:hover {
    background-color: #1c1c1c;
    color: #CAFF33;
    border: 1px solid #CAFF33;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
    &:hover {
      background-color: #666;
      color: #1c1c1c;
      border: none;
    }
  }
`;

const ResetButton = styled(Button)`
  background-color: #333;
  color: #fff;
  position: static;
  margin-bottom: 1.5rem;

  &:hover {
    background-color: #555;
    color: #fff;
    border: none;
  }
`;

const PlayPauseButton = styled.button`
  background-color: #CAFF33;
  color: #1c1c1c;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Lexend', sans-serif;

  &:hover {
    background-color: #1c1c1c;
    color: #CAFF33;
    border: 1px solid #CAFF33;
  }
`;


const GridBox = styled.div`
  width: 120px; // Increased size
  height: 120px; // Increased size
  background-color: #D9D9D9;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;
  margin: 0;
`;

const CapturedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TimestampBox = styled.div`
  margin-top: 0.5rem;
  background-color: #333;
  color: #CAFF33;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: 'Lexend', sans-serif;
`;

const CapturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 450px;
  height: 400px;

`;

const ErrorMessage = styled.div`
  color: #ff4444;
  background-color: rgba(255, 68, 68, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const VideoPasswordLogin = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));
  const loadingRef = useRef(null);                // for the top bar
  const [captures, setCaptures] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already set or not logged in
  useEffect(() => {
    if (localStorage.getItem("authToken2")) navigate("/");
    else if (!localStorage.getItem("authToken")) navigate("/login");
  }, [navigate]);

  // format mm:ss
  const formatTime = (t) => {
    const m = Math.floor(t / 60).toString().padStart(2, "0");
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // autoplay / track time
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setCurrentTime(v.currentTime);

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTime);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTime);
    };
  }, []);

  // when user clicks a grid cell
  const handleGridClick = (row, col) => {
    if (captures.length >= 6) {
      toast.error("Maximum 6 captures allowed");
      return;
    }
    try {
      const v = videoRef.current;
      const time = Math.floor(v.currentTime);
      const canvas = canvasRef.current;
      canvas.width = v.videoWidth;
      canvas.height = v.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(v, 0, 0, canvas.width, canvas.height);

      const cellW = canvas.width / 3;
      const cellH = canvas.height / 3;
      const sx = col * cellW;
      const sy = row * cellH;

      const imgData = ctx.getImageData(sx, sy, cellW, cellH);
      const crop = document.createElement("canvas");
      crop.width = cellW;
      crop.height = cellH;
      crop.getContext("2d").putImageData(imgData, 0, 0);

      setCaptures((c) => [
        ...c,
        { image: crop.toDataURL(), time, position: { row, col } },
      ]);
    } catch (err) {
      console.error(err);
        }
  };

  const handleReset = () => {
    setCaptures([]);
    toast.info("Cleared all captures");
  };

  // submit password check
  const handleSubmit = async () => {
    if (captures.length < 6) {
      toast.error("Please capture 6 frames first");
      return;
    }
    loadingRef.current.continuousStart();
    setIsLoading(true);

    // build password string
    const pwd = captures
      .map((c) => `${c.position.row}_${c.position.col}_${formatTime(c.time)}`)
      .join("-");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/videoPassword/verify",
        { password: pwd },
        { headers: { "auth-token": localStorage.getItem("authToken") } }
      );
      if (res.data.success) {
        localStorage.setItem("authToken2", "true");
        toast.success("Video password set successfully!");
        navigate("/");
        handleReset();
      } else {
        toast.error("Failed to save password");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid Password");
    } finally {
      loadingRef.current.complete();
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* top loading bar */}
      <LoadingBar color="#29d" height={3} ref={loadingRef} />

      {/* global toast container */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <Navbar />

      <Container>
        <Box>
          <BackgroundOverlay />
          <AbstractOverlay />
          <ContentWrapper>
            <Title>Login With Video Password</Title>
            <Subtitle>
              Please select exactly 6 grid‐cells in sequence to generate your
              video password.
            </Subtitle>

            {captures.length === 0 && (
              <ErrorMessage>Please capture 6 frames below</ErrorMessage>
            )}

            <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <VideoContainer>
                  <StyledVideo ref={videoRef} playsInline muted>
                    <source src={vid} type="video/mp4" />
                    Your browser does not support video.
                  </StyledVideo>
                  <TimestampDisplay>{formatTime(currentTime)}</TimestampDisplay>
                  <GridOverlay>
                    {[...Array(9)].map((_, i) => (
                      <GridCell
                        key={i}
                        onClick={() => handleGridClick(Math.floor(i / 3), i % 3)}
                      />
                    ))}
                  </GridOverlay>
                </VideoContainer>

                <PlayPauseButton
                  onClick={() =>
                    videoRef.current.paused
                      ? videoRef.current.play()
                      : videoRef.current.pause()
                  }
                  disabled={isLoading}
                >
                  {isPlaying ? "Pause" : "Play"}
                </PlayPauseButton>

                <div style={{ marginTop: "1rem" }}>
                  <ResetButton onClick={handleReset} disabled={isLoading}>
                    Clear All
                  </ResetButton>
                </div>
              </div>

              <div>
                <CapturesContainer>
                  {captures.map((c, idx) => (
                    <div key={idx} style={{ textAlign: "center" }}>
                      <GridBox>
                        <CapturedImage src={c.image} alt={`cap${idx + 1}`} />
                      </GridBox>
                      <TimestampBox>{formatTime(c.time)}</TimestampBox>
                    </div>
                  ))}
                </CapturesContainer>
              </div>
            </div>

            <Button onClick={handleSubmit} disabled={isLoading || captures.length < 6}>
              {isLoading ? "Setting Password..." : "Set Password"}
            </Button>
          </ContentWrapper>
        </Box>
      </Container>
    </>
  );
};

export default VideoPasswordLogin;