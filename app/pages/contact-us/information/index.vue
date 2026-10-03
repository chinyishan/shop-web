<template>
  <div class="l-page p-contact" v-if="pageInfo?.attribute_data">
    <SwipersBanner :info="pageInfo.attribute_data?.carousel" />
    <Breadcrumb />

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner">
        <div class="p-contact__layout">
          <!-- 左側說明 ...................................................... -->
          <div class="p-contact__aside">
            <span class="c-section__eyebrow">Contact</span>
            <h1 class="c-section__title">聯絡資訊</h1>
            <p class="p-contact__note">
              有商品、訂單或合作方面的問題，填寫右側表單，<br />
              客服人員會在三個工作天內回覆你。
            </p>

            <dl class="p-contact__info" v-if="footer">
              <div class="p-contact__info-row">
                <dt>免付費客服電話</dt>
                <dd>{{ footer.phone }}</dd>
              </div>
              <div class="p-contact__info-row">
                <dt>服務時間</dt>
                <dd>
                  {{ footer.am_start }}~{{ footer.am_end }}、{{ footer.pm_start }}~{{
                    footer.pm_end
                  }}<br />
                  <span class="p-contact__memo">週一至週五（例假日及國定假期休息）</span>
                </dd>
              </div>
            </dl>

            <div class="p-contact__media">
              <div class="c-figure c-figure--square">
                <img :src="resource.contact_image" title="聯絡資訊" alt="聯絡資訊" />
              </div>
            </div>
          </div>

          <!-- 表單 .......................................................... -->
          <div class="p-contact__form">
            <el-form
              ref="formRef"
              :model="form"
              label-position="top"
              status-icon
            >
              <el-form-item
                label="姓名"
                prop="name"
                :rules="[{ required: true, message: '請輸入姓名' }]"
              >
                <el-input v-model="form.name" placeholder="請輸入姓名" :disabled="loading" />
              </el-form-item>

              <el-form-item
                label="電話"
                prop="mobile"
                :rules="[{ required: true, message: '請輸入電話' }]"
              >
                <el-input v-model="form.mobile" placeholder="請輸入電話" :disabled="loading" />
              </el-form-item>

              <el-form-item
                label="電子信箱"
                prop="email"
                :rules="[
                  { required: true, message: '請輸入電子郵件' },
                  {
                    required: true,
                    validator: (rules, val) => isEmail(val),
                    message: '請輸入正確的 Email',
                  },
                ]"
              >
                <el-input v-model="form.email" placeholder="請輸入 Email" :disabled="loading" />
              </el-form-item>

              <el-form-item
                label="意見類別"
                prop="category_id"
                :rules="[{ required: true, message: '請選擇意見類別' }]"
              >
                <el-select
                  v-model="form.category_id"
                  placeholder="點擊選取項目"
                  :disabled="loading"
                >
                  <el-option
                    v-for="(item, index) in resource.categories"
                    :key="index"
                    :value="item.key"
                    :label="item.label"
                  />
                </el-select>
              </el-form-item>

              <el-form-item
                label="內容"
                prop="content"
                :rules="[
                  { required: true, message: '請輸入內容' },
                  { max: 1000, message: '請輸入 1000 字以內' },
                ]"
              >
                <el-input
                  type="textarea"
                  v-model="form.content"
                  :rows="10"
                  :disabled="loading"
                  placeholder="請輸入至多 1000 字"
                />
              </el-form-item>
            </el-form>

            <div class="p-contact__submit">
              <button
                type="button"
                class="c-btn"
                :disabled="loading"
                @click="onSentContact"
              >
                確認送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";

const { page, footer } = useSiteConfig();
const pageInfo = computed(() => page("page-contact_us"));
useSeo("page-contact_us");

const { data: resource } = await useFetch("/api/information/resource", {
  transform: (res) => ({
    categories: res.result?.category ?? [],
    contact_image: res.result?.contact_image,
  }),
  default: () => ({ categories: [] }),
});

const formRef = ref(null);
const form = reactive({});
const loading = ref(false);

const onSentContact = async () => {
  const valid = await formRef.value.validate().catch(() => false);
  if (!valid) return;

  loading.value = true;
  try {
    const { success } = await $fetch("/api/information/update", { method: "POST", body: { ...form } });
    if (success) {
      formRef.value.resetFields();
      ElMessage.success("成功送出");
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.p-contact {
  background-color: $white;

  &__layout {
    display: grid;
    grid-template-columns: minmax(0, 380px) minmax(0, 1fr);
    gap: $space-10;
    align-items: start;

    @include lm() {
      grid-template-columns: 1fr;
      gap: $space-7;
    }
  }

  &__note {
    margin-top: $space-5;
    color: $content;
    font-size: $fz-body;
    line-height: $lh-body;
    letter-spacing: $ls-body;
  }

  &__info {
    margin-top: $space-7;
    border-top: 1px solid $gray-100;
  }

  &__info-row {
    padding: $space-4 0;
    border-bottom: 1px solid $gray-100;

    dt {
      color: $muted;
      font-size: $fz-xs;
      letter-spacing: $ls-eyebrow;
      text-transform: uppercase;
    }

    dd {
      margin-top: $space-2;
      color: $primary;
      font-size: $fz-h4;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: $ls-body;
    }
  }

  &__memo {
    color: $muted;
    font-size: $fz-xs;
    font-weight: 400;
  }

  &__media {
    margin-top: $space-7;

    .c-figure {
      border-radius: $radius-lg;
    }

    @include lm() {
      display: none;
    }
  }

  // ------------------------------------------------------------ 表單
  &__form {
    :deep(.el-form-item) {
      margin-bottom: $space-5;
    }

    :deep(.el-form-item__label) {
      margin-bottom: $space-2;
      padding: 0;
      color: $text;
      font-size: $fz-sm;
      letter-spacing: $ls-body;
      line-height: 1.6;
    }

    :deep(.el-input__wrapper),
    :deep(.el-select__wrapper) {
      min-height: 52px;
      border-radius: $radius-sm;
      box-shadow: 0 0 0 1px $gray-200 inset;
    }

    :deep(.el-input__inner),
    :deep(.el-select__placeholder),
    :deep(.el-textarea__inner) {
      font-size: $fz-body;
      letter-spacing: $ls-body;
    }

    :deep(.el-textarea__inner) {
      border-radius: $radius-sm;
      box-shadow: 0 0 0 1px $gray-200 inset;
    }
  }

  &__submit {
    display: flex;
    justify-content: flex-end;
    margin-top: $space-6;

    @include md() {
      justify-content: stretch;

      .c-btn {
        width: 100%;
      }
    }
  }
}
</style>
