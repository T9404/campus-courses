const ConvertStatus = (status) => {
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    switch (status) {
        case 'Created':
            return <span style={{ color: getRandomColor() }}>Создан</span>;
        case 'Finished':
            return <span style={{ color: getRandomColor() }}>Завершен</span>;
        case 'Started':
            return <span style={{ color: getRandomColor() }}>В процессе обучения</span>;
        case 'OpenForAssigning':
            return <span style={{ color: getRandomColor() }}>Открыт для записи</span>;
        default:
            return status;
    }
}

export default ConvertStatus;