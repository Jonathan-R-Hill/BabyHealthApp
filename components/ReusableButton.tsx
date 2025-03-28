import { Pressable, PressableProps } from "react-native";

export function ReusableButton({...otherProps}:(PressableProps)){

    return <Pressable style={{backgroundColor: "#65558F", 
        borderRadius: 6, 
        paddingVertical: 10,
        paddingHorizontal: 20,
        minHeight: 40,
        height: "30%",
        width: "80%",
        maxHeight: 300,
        maxWidth: 600,}} {...otherProps}></Pressable>
}