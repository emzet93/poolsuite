import { ScreenSlider } from "@/components/ScreenSlider/ScreenSlider";
import { About } from "@/screens/About";
import { Player } from "@/screens/Player";
import { Themes } from "@/screens/Themes";

export default function HomeScreen() {
  return (
    <ScreenSlider
      screens={[
        { id: "Player", Component: Player },
        { id: "Themes", Component: Themes },
        { id: "About", Component: About },
      ]}
    />
  );
}
