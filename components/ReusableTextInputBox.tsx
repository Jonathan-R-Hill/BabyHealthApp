import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  Dimensions,
} from "react-native";

// Get screen width
const { width: screenWidth } = Dimensions.get("window");

// Determine input width dynamically
const isSmallScreen = screenWidth <= 1200 ? "100%" : "60%";
const buttonWidth = isSmallScreen ? "100%" : "60%";

type ReusableTextInputProps = TextInputProps & {
  title?: string;

  /**
   * Preset sizes for the input field.
   * - "default": Standard input height and font size.
   * - "medium": Slightly larger input.
   * - "big": Largest preset input.
   */
  size?: "default" | "medium" | "big";
  textSize?: number;
  textColour?: string;
  backgroundColour?: string;
};

/**
 * A reusable text input component with a label and adjustable input sizes.
 */
export function ReusableTextInput({
  title,
  style,
  size = "default",
  textSize = 16,
  textColour = "black",
  backgroundColour = "white",
  ...otherProps
}: ReusableTextInputProps) {
  const sizeStyles = {
    default: styles.inputDefault,
    medium: styles.inputMedium,
    big: styles.inputBig,
  };

  return (
    <View style={styles.container}>
      {/* Render a label that displays the value of "title" if it isn't null. */}
      <Text style={[styles.label, { color: textColour }]}>
        {title ?? "Enter..."}
      </Text>
      <TextInput
        style={[
          styles.inputBase,
          {
            // width: inputWidth,
            fontSize: textSize,
            color: textColour,
            backgroundColor: backgroundColour,
          },
          sizeStyles[size],
          style,
        ]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: "relative", // required for absolute label positioning
    // width: buttonWidth,
    // alignSelf: isSmallScreen ? "stretch" : "center",
  },
  label: {
    marginBottom: 4,
    marginLeft: 3,
    fontSize: 14,
    fontWeight: "500",
  },
  inputBase: {
    borderColor: "#B3B3B3",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    textAlign: "left",
  },
  inputDefault: {
    height: 40,
    fontSize: 14,
  },
  inputMedium: {
    paddingTop: 10,
    height: 120,
    fontSize: 15,
  },
  inputBig: {
    paddingTop: 10,
    height: 250,
    fontSize: 16,
  },
});
