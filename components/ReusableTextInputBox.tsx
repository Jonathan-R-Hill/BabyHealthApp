import { TextInput, TextInputProps, StyleSheet } from "react-native";

export function ReusableTextInput({ style, ...otherProps }: TextInputProps) {
    return (
        <TextInput
            style={[styles.input, style]}
            {...otherProps}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: "#B3B3B3",
        borderWidth: 1,
        marginBottom: 16,
        borderRadius: 12,
        paddingHorizontal: 8,
        backgroundColor: "#FFFFFF",
        textAlign: "center",
    },
});
