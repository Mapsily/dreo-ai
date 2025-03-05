"use client";

import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface MusicPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<MusicPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (audioRef.current && src) {
      audioRef.current.load();
      setIsPlaying(false);
    }

    return () => {
      if (src) {
        URL.revokeObjectURL(src);
      }
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0);
      });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / duration) * 100);
    }
  };

  const seekAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(parseFloat(e.target.value));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="rounded-lg w-80">
      {src && (
        <audio ref={audioRef} src={src} onTimeUpdate={updateProgress}/>
      )}
      {/* Progress Bar with Time */}
      <div className="flex gap-1 items-center justify-between text-sm text-gray-600 mb-2">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          value={progress}
          onChange={seekAudio}
          className="w-full appearance-none bg-lime-600 h-1 rounded-lg cursor-pointer mx-2"
        />
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center">
        <Button
          className="text-black p-0"
          variant="link"
          onClick={() => {
            if (audioRef.current) audioRef.current.currentTime -= 5;
          }}
        >
          <RotateCcw />
        </Button>

        <Button variant="link" onClick={togglePlay} className="text-lime-600">
          {isPlaying ? <Play /> : <Pause />}
        </Button>

        <Button
          className="text-black p-0"
          variant="link"
          onClick={() => {
            if (audioRef.current) audioRef.current.currentTime += 5;
          }}
        >
          <RotateCw />
        </Button>
      </div>
    </div>
  );
};

export default AudioPlayer;
