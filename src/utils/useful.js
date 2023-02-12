

export function setFormat(value) {
    let splittedValue = value.toString().split("");

    if (splittedValue.length > 3 && splittedValue.length < 5) {
        splittedValue.splice(1, 0, ",");
        let joinedValue = splittedValue.join("");
        return joinedValue;
    } else if (splittedValue.length > 4 && splittedValue.length < 6) {
        splittedValue.splice(2, 0, ",");
        let joinedValue = splittedValue.join("");
        return joinedValue;
    }
    return value;
}