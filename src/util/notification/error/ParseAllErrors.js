import statusErrorMessages from "./StatusErrorMessages";

const parseAllErrors = (error) => {
    const traverseErrors = (errors, parentKey = '') => {
        const errorMessages = [];
        
        Object.entries(errors).forEach(([key, value]) => {
            const currentKey = parentKey ? `${parentKey}.${key}` : key;
            
            if (Array.isArray(value)) {
                errorMessages.push(`${currentKey}: ${value.join(', ')}`);
            } else if (typeof value === 'object') {
                errorMessages.push(...traverseErrors(value, currentKey));
            } else {
                const fieldMatch = currentKey.match(/\.(\w+)$/);
                const fieldName = fieldMatch ? fieldMatch[1] : currentKey;
                errorMessages.push(`${fieldName}: ${value}`);
            }
        });
        
        return errorMessages;
    };
    
    if (error.response && error.response.data) {
        const topLevelErrors = error.response.data;
        const allErrorMessages = traverseErrors(topLevelErrors);
        allErrorMessages.splice(allErrorMessages.findIndex((element) => element.includes("https://tools.ietf.org/")), 1);
        return allErrorMessages.join(', ');
    }
    
    return statusErrorMessages[error.response.status] || `Unexpected status code: ${error.response.status}`;
};


export default parseAllErrors;