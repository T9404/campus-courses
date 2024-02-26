const ConvertSemester = (semester) => {
    switch (semester) {
        case "Autumn":
            return "Осенний";
        case "Spring":
            return "Весенний";
        default:
            return "Осенний";
    }
}

export default ConvertSemester;