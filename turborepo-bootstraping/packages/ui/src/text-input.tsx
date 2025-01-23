interface propType {
  placeholder: string;
}

export function TextInput({placeholder}:propType){
    return (
        <input type="text" placeholder={placeholder} style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "100%",
            boxSizing: "border-box"
        }} />
    )
}