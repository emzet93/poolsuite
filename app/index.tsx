import { ScreenSlider } from "@/components/ScreenSlider/ScreenSlider";
import { About } from "@/screens/About";
import { Player } from "@/screens/Player";
import { Themes } from "@/screens/Themes";

export default function HomeScreen() {
  return (
    <ScreenSlider
      screens={[
        { id: "Player", name: "Poolsuite FM", Component: Player },
        { id: "Themes", name: "Themes", Component: Themes },
        { id: "About", name: "About", Component: About },
      ]}
    />
  );
}
