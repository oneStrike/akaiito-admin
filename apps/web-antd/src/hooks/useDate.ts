import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // 引入 utc 插件

dayjs.extend(utc);

export const useDate = {
  formatDate(date: Date | string, format = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs.utc(date).format(format);
  },
};
