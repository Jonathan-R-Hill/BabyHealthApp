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

type ReusableButtonProps = PressableProps & {
  title?: string;
  edge?: "round" | "edgy";
  children?: React.ReactNode;
  colour?: string;
};

export function ReusableButton({
  title,
  edge,
  children,
  colour = "#65558F",
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
            width: buttonWidth, // Dynamic width
            maxHeight: 300,
            alignItems: "center",
            justifyContent: "center",
          },
          sizeStyles[edge ?? "round"],
        ]}
        {...otherProps}
      >
        {title ? (
          <Text style={{ color: "white", fontWeight: "600" }}>{title}</Text>
        ) : (
          children
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
    paddingTop: 5,
  },
  roundEdge: {
    marginBottom: 25,
  },
  edgyEdge: {
    borderRadius: 8,
  },
});
