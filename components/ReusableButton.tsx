import { Pressable, PressableProps, Text, StyleSheet } from "react-native";

// I'm creating a type for the props my ReusableButton will accept.
type ReusableButtonProps = PressableProps & {//PressableProbs AND... 
    title?: string; //A text label for the button (e.g. "Login")
    edge?: "round" | "edgy" ;
    children?: React.ReactNode; //The child element inside the ReusableButton component.
};

/**This is a fancy purple button.
 * 
 * It accepts normal button stuff plus either:
 * - A title string
 * - Or some custom JSX inside it
 * 
 * All Pressable props like onPress, disabled, etc., are supported.
 * It handles layout & centring so the content looks nice inside the button.
 * 
 * Quick use: just pass title="Login".
 * Advanced use: customise everything using children.
 */
export function ReusableButton({ title, edge, children, ...otherProps}: ReusableButtonProps){
//In params, "Desctructure" the probs to apply them directly to <Pressable>
    const sizeStyles = {
        round: styles.roundEdge,
        edgy: styles.edgyEdge,
    }

    return <Pressable 
        style={[
        {
            backgroundColor: "#65558F", 
            borderRadius: 20, 
            paddingVertical: 10,
            paddingHorizontal: 20,
            minHeight: 40,
            // height: "30%", /* Disabled to adjust the height of the element to the size of the child element rather than the parent element. */
            width: "100%", //Leave the default width at 100% and individually adjust it for specific buttons if needed.
            maxHeight: 300,
            alignItems: "center", //This keeps the child element centered.
            justifyContent: "center", //Think of this as alignItem's emotional support property.
            //maxWidth: 600
        },
        sizeStyles[edge ?? "round"]
    ]} 
    {...otherProps}
    > 
        {title ? ( //Conditional statement: if title exists, show it in a white <Text> element.
            <Text style={{ color: "white", fontWeight: "600" }}>{title}</Text>
        ) : ( 
            children //Otherwise show whatever that was passed as children like a normal <Text> as we alr have.
        )}
    </Pressable>
}

const styles = StyleSheet.create({
    roundEdge: {
        marginBottom: 25,
    },
    edgyEdge: {
        borderRadius: 8,
    }
});