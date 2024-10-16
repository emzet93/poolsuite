import { createStyleSheet } from "react-native-unistyles";

export const ControlArrowSize = 8;

export const stylesheet = createStyleSheet((theme) => ({
  channelInfo: {
    paddingVertical: theme.spacing.s,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    gap: theme.spacing.xxs,
  },
  channelAction: {
    width: theme.spacing.xl * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  channelCardContainer: {
    flex: 1,
    alignItems: "center",
  },
  channelCard: {
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
  },
  lines: {
    marginTop: theme.spacing.xs,
  },
  content: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.l,
    gap: theme.spacing.xs * 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  playerInfo: {
    alignItems: "center",
    gap: theme.spacing.xxs,
  },
  playerControls: {
    alignSelf: "stretch",
    flexDirection: "row",
  },
  controlContainer: {
    flex: 1,
  },
  middleControlContainer: {
    marginHorizontal: -5,
  },
  control: {
    paddingVertical: theme.spacing.l,
    justifyContent: "center",
    alignItems: "center",
  },
  leftControl: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  middleControl: {
    borderRadius: 0,
  },
  rightControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  noise: {
    flex: 0,
    height: theme.spacing.s,
  },
}));
