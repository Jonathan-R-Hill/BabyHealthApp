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
const inputWidth = screenWidth <= 1200 ? "100%" : "60%";

type ReusableTextInputProps = TextInputProps & {
  /**
   * Optional label displayed above the input field.
   */
  title?: string;

  /**
   * Preset sizes for the input field.
   * - "default": Standard input height and font size.
   * - "medium": Slightly larger input.
   * - "big": Largest preset input.
   */
  size?: "default" | "medium" | "big";
};

/**
 * A reusable text input component with a label and adjustable input sizes.
 */
export function ReusableTextInput({
  title,
  style,
  size = "default",
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
      <Text style={styles.label}>{title ?? "Enter..."}</Text>
      <TextInput
        style={[
          styles.inputBase,
          { width: inputWidth },
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
    alignSelf: "center", // Centers the input horizontally
  },
  label: {
    marginBottom: 4,
    marginLeft: 3,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  inputBase: {
    borderColor: "#B3B3B3",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
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
