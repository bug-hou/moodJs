export const NowToDate = () => new Date();
export const stringToDate = (value: string) => new Date(value);
export const DateToDate = (value: Date) => new Date(value);
export const numberToDate = (
  year: number,
  monthIndex?: number,
  day?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  milliseconds?: number
) => {
  if (monthIndex) {
    // 全是数字类型
    return new Date(
      year,
      monthIndex - 1,
      day ?? 0,
      hours ?? 0,
      minutes ?? 0,
      seconds ?? 0,
      milliseconds ?? 0
    );
  } else {
    return new Date(year);
  }
};
