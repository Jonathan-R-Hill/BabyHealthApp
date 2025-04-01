import {
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

type ReusableButtonProps = PressableProps & {
  title?: string;
  edge?: "round" | "edgy";
  children?: React.ReactNode;
};

export function ReusableButton({
  title,
  edge,
  children,
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
            backgroundColor: "#65558F",
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            minHeight: 40,
            width: screenWidth * 0.6,
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
    flex: 1, // Takes full height of screen
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
    paddingTop: 10,
  },
  roundEdge: {
    marginBottom: 25,
  },
  edgyEdge: {
    borderRadius: 8,
  },
});
