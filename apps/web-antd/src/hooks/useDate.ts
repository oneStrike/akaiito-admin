import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // 引入 utc 插件

dayjs.extend(utc);

export const useDate = {
  formatDate(
    date: Date | string | undefined,
    format = 'YYYY-MM-DD HH:mm:ss',
  ): string {
    if (!date) return '';
    return dayjs.utc(date).format(format);
  },
};
