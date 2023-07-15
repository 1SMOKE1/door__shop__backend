

const checkEnum = <T>(obj: T, item: string | number): boolean => {
  for (const key in obj) {
    if (obj[key] === item) {
      return true;
    }
  }

  return false;
}

export default checkEnum;