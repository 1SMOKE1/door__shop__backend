

const generateErrorArr = async <T>(obj: T): Promise<string[]> => (Object.values(obj));

export default generateErrorArr;
