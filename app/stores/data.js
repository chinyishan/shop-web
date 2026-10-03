import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useDataStore = defineStore("data", () => {
  /** 語系轉換 */
  const langCookie = useCookie("lang");

  /** Footer */
  const footer = reactive({
    zh_TW: {
      title: "HealthLab 健康實驗室",
      image: "/mock/brand1.png",
      list: {
        company_name: "公司名稱",
        company_code: "公司編號",
        phone: "客服電話",
        whatsapp: "Whatsapp",
        email: "E-mail",
        address: "公司地址",
      },
    },
    en: {
      title: "HealthLab 健康實驗室",
      image: "/mock/brand1.png",
      list: {
        company_name: "Company name",
        company_code: "Company registration number",
        phone: "Customer service",
        whatsapp: "WhatsApp",
        email: "Email",
        address: "Company address",
      },
    },
  });

  /** Footer-語系 */
  const footerData = computed(() => {
    if (langCookie.value == "zh_TW" || langCookie.value == null) {
      return footer.zh_TW;
    } else {
      return footer.en;
    }
  });

  return {
    footerData,
  };
});
