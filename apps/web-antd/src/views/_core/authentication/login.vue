<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { AuthenticationLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import forge from 'node-forge';

import { getCaptchaApi } from '#/apis';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const captchaData = ref();
async function fetchCaptcha() {
  captchaData.value = await getCaptchaApi();
}
fetchCaptcha();
async function login(params: any) {
  params.captchaId = captchaData.value?.id;
  const publicKeyPEM = await authStore.getRsaPublicKey();

  const publicKeyPem = forge.pki.publicKeyFromPem(publicKeyPEM);
  // 使用OAEP填充进行加密
  const encrypted = publicKeyPem.encrypt(params.password, 'RSA-OAEP', {
    md: forge.md.sha256.create(), // 使用SHA-256作为哈希函数
    mgf1: {
      md: forge.md.sha256.create(), // 使用SHA-256作为MGF1的哈希函数
    },
  });
  // 使用加密后的密码
  params.password = forge.util.encode64(encrypted);
  authStore.authLogin(params);
}

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: '请输入验证码',
        maxlength: 4,
      },
      suffix: () =>
        h(
          'div',
          {
            class: 'flex items-center gap-2',
          },
          [
            // 验证码图片
            h('img', {
              src: captchaData.value?.data,
              alt: '验证码',
              class: 'h-14 w-30 cursor-pointer',
              onClick: fetchCaptcha,
              title: '点击刷新验证码',
            }),
          ],
        ),
      fieldName: 'captcha',
      label: '验证码',
      rules: z.string().min(4, { message: '请输入正确的验证码' }),
    },
  ];
});
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    :show-code-login="false"
    :show-forget-password="false"
    :show-qrcode-login="false"
    :show-register="false"
    :show-third-party-login="false"
    @submit="login"
  />
</template>
