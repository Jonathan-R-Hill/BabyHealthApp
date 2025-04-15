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
const buttonWidth = screenWidth <= 1200 ? "100%" : "60%";

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
};

export function ReusableButton({
  title,
  edge,
  children,
  colour = "#65558F",
  textSize = 16,
  textColour = "white",
  fontWeights = "bold",
  ...otherProps
}: ReusableButtonProps) {
  const sizeStyles = {
    round: styles.roundEdge,
    edgy: styles.edgyEdge,
  };

  return (
    <View style={styles.centerContainer}>
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
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  roundEdge: {
    marginBottom: 25,
  },
  edgyEdge: {
    borderRadius: 8,
  },
});
