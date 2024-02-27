const ConvertMark = (midterm) => {
    let statusColor = "";
    let statusText = "";
    switch (midterm) {
        case 'NotDefined':
            statusText = 'Отметки нет';
            statusColor = 'btn-secondary';
            break;
        case 'Passed':
            statusText = 'Успешно пройдена';
            statusColor = 'btn-success';
            break;
        case 'Failed':
            statusText = 'Зафейлена';
            statusColor = 'btn-danger';
            break;
        default:
            statusText = 'Отметки нет';
            statusColor = 'btn-secondary';
            break;
    }
    return <button className={`btn ${statusColor} rounded-pill btn-sm mb-3`}>{statusText}</button>;
}

export default ConvertMark;
