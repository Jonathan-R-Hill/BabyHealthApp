import { View, Text, TextInput, TextInputProps, StyleSheet } from "react-native";

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
}

/**
 * A reusable text input component with a label and adjustable input sizes.
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
export function ReusableTextInput({ title, style, size = "default", ...otherProps }: ReusableTextInputProps) {
    const sizeStyles = {
        default: styles.inputDefault,
        medium: styles.inputMedium,
        big: styles.inputBig,
    }

    return (
        <View style={styles.container}>
            {/*Render a label that displays the value of "title" if it isn't null.*/}
            <Text style={styles.label}>{title ?? "Enter..."}</Text>
            <TextInput
                style={[styles.inputBase, sizeStyles[size], style]}
                {...otherProps}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
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
        height: 50,
        fontSize: 16,
    },
    inputBig: {
        height: 60,
        fontSize: 18,
    },
});
