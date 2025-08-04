import type { UploadFile } from 'ant-design-vue';

import type { UploadFileResponse } from '#/apis/types/upload';

import { message } from 'ant-design-vue';

import { requestClient } from '#/utils/request';

type files = Blob | string;
type UploadFileRes = UploadFileResponse;
const api = {
  common: '/api/admin/upload/upload-file',
  comic: '/admin/comic/chapter/createComicChapterContent',
};

export async function useUpload(
  files: files | files[] | UploadFile,
  params: Record<string, any> = {},
  contentType: keyof typeof api = 'common',
  showMessage: boolean = true,
): Promise<{
  error: any[];
  success: UploadFileRes[];
}> {
  return new Promise((resolve) => {
    const target = Array.isArray(files) ? files : [files];
    const formData = new FormData();
    const errorFile: (typeof target)[number][] = [];

    // 将所有文件添加到 FormData
    target.forEach((item, index) => {
      const file = item instanceof File ? item : (item as UploadFile).originFileObj || (item as UploadFile).file;
      if (file) {
        formData.append(`files[${index}]`, file);
      }
    });

    // 添加额外参数
    for (const paramsKey in params) {
      formData.append(paramsKey, params[paramsKey]);
    }

    requestClient
      .post(api[contentType], formData, {
        headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8',
        },
      })
      .then((res) => {
        const result = res as any;
        if (showMessage) {
          message.success('上传成功');
        }
        
        // 确保返回数组格式
        const successData = Array.isArray(result) ? result : [result];
        resolve({
          success: successData,
          error: errorFile,
        });
      })
      .catch((error) => {
        if (showMessage) {
          message.error('上传失败');
        }
        resolve({
          success: [],
          error: target,
        });
      });
  });
}
