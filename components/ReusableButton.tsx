import {
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";

// Get screen width
const { width: screenWidth } = Dimensions.get("window");

// Determine button width dynamically
const buttonWidth = screenWidth <= 850 ? "100%" : "60%";

// Define valid font weights
type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

type ReusableButtonProps = PressableProps & {
  title?: string;
  edge?: "round" | "edgy";
  children?: React.ReactNode;
  colour?: string;
  textSize?: number;
  textColour?: string;
  fontWeights?: FontWeight;
  doubleButtons?: boolean;
};

export function ReusableButton({
  title,
  edge,
  children,
  colour = "#65558F",
  textSize = 16,
  textColour = "white",
  fontWeights = "500",
  doubleButtons = false,
  ...otherProps
}: ReusableButtonProps) {
  const sizeStyles = {
    round: styles.roundEdge,
    edgy: styles.edgyEdge,
  };

  return (
    <View style={doubleButtons ? styles.centerContainerDouble : styles.centerContainerSingle}>
      <Pressable
        style={[
          {
            backgroundColor: colour,
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            minHeight: 40,
            width: buttonWidth,
            maxHeight: 300,
            alignItems: "center",
            justifyContent: "center",
          },
          sizeStyles[edge ?? "round"],
        ]}
        {...otherProps}
      >
        {title ? (
          <Text
            style={{
              color: textColour,
              fontWeight: fontWeights,
              fontSize: textSize,
            }}
          >
            {title}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainerSingle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  centerContainerDouble: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    flex: 1,
  },
  roundEdge: {
    marginBottom: 25,
  },
  edgyEdge: {
    borderRadius: 8,
  },
});
