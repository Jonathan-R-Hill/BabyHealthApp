import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

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

// const { width: screenWidth } = Dimensions.get("window");
// const buttonWidth = screenWidth <= 850 ? "100%" : "60%";

/**
 * Animated version of the reusable text input component with a label and adjustable input sizes.
 *
 * @component
 * @example
 * <ReusableTextInput
 *   title="Username"
 *   placeholder="Enter your username"
 *   size="medium"
 *   value={username}
 *   onChangeText={setUsername}
 * />
 *
 * @param {ReusableTextInputProps} props - Props extending standard TextInputProps.
 * @returns A styled input field with an optional title and adjustable size.
 */
export function ReusableTextInputAnimated({
  title = "Enter...", // Fallback if no label is provided.
  style,
  size = "default",
  value, // text input value
  onFocus,
  onBlur,
  onChangeText,
  textSize = 16, // Default text size 16
  textColour = "black", // Default text colour black
  backgroundColour = "white", // Default background colour white
  ...otherProps
}: ReusableTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(!!value);

  // Animate value (0 = not focused/no text, 1 = focused or has text)
  const labelAnim = useRef(new Animated.Value(!!value ? 1 : 0)).current;

  /**
   * Whenever `isFocused` or `hasText` changes,
   * animate the label's position and size accordingly.
   */
  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || hasText ? 1 : 0, // animate to 1 if focused/filled, else 0
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isFocused, hasText]);

  /**
   * Handle focus and blur manually so we can update our animation trigger.
   * Still call any external `onFocus`/`onBlur` passed in.
   */
  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  /**
   * Handle text changes: update state + pass the change to parent.
   */
  const handleChangeText = (text: string) => {
    setHasText(text.length > 0);
    onChangeText?.(text);
  };

  const sizeStyles = {
    default: styles.inputDefault,
    medium: styles.inputMedium,
    big: styles.inputBig,
  };

  /**
   * Define label animation:
   * - Moves up on Y axis from 12 → -14
   * - Shrinks font size from 16 → 12
   */
  const labelTranslateY = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [12, -22], // move label upward when focused/filled
  });

  return (
    <View style={styles.container}>
      {/* Render a label that displays the value of "title" if it isn't null. */}
      <Animated.Text
        style={[
          styles.label,
          {
            transform: [{ translateY: labelTranslateY }],
            opacity: labelAnim, // fades in
          },
        ]}
      >
        {title}
      </Animated.Text>

      <TextInput
        value={value}
        style={[
          styles.inputBase,
          sizeStyles[size],
          {
            fontSize: textSize,
            color: textColour,
            backgroundColor: backgroundColour,
          },
          style,
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: "relative", // required for absolute label positioning
  },
  label: {
    position: "absolute",
    left: 12,
    top: 12, // starting Y position before animation kicks in
    marginBottom: 4,
    marginLeft: 3,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    backgroundColor: "#fff",
    paddingHorizontal: 4, // to avoid overlapping with borders
    zIndex: 1, // make sure it appears above the input
  },
  inputBase: {
    borderColor: "#B3B3B3",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    textAlign: "left",
  },
  inputDefault: {
    height: 50,
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
