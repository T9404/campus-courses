
const ConvertStudentStatus = (accommodation) => {
    switch (accommodation) {
        case "InQueue":
             return <span className="text-primary">в очереди</span>;
        case "Accepted":
            return <span className="text-success">принят</span>;
        case "Declined":
            return <span className="text-danger">отклонен</span>;
    }
}

export default ConvertStudentStatus;