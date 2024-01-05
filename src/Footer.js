import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import "./Footer.css";
import { Pause, PlaceOutlined, PlaylistPlay, Repeat, Shuffle, SkipNext, SkipPrevious, VolumeDown } from "@mui/icons-material";
import { Grid, Slider } from "@mui/material";

function Footer({ spotify }) {
  const [{ item, playing }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playbackState = await spotify.getMyCurrentPlaybackState();
        console.log(playbackState);

        dispatch({
          type: "SET_PLAYING",
          playing: playbackState.is_playing,
        });

        dispatch({
          type: "SET_ITEM",
          item: playbackState.item,
        });
      } catch (error) {
        console.error("Error fetching playback state:", error);
      }
    };

    fetchData();
  }, [dispatch, spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <Shuffle className="footer__green" />
        <SkipPrevious onClick={skipNext} className="footer__icon" />
        {playing ? (
          <Pause
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlaceOutlined
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNext onClick={skipPrevious} className="footer__icon" />
        <Repeat className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlay />
          </Grid>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
