import { useContext } from "react";
import { SoundContext } from "../components/SoundProvider";

export const useSound = () => useContext(SoundContext);
