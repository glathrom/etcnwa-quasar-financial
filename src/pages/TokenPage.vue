<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { LocalStorage } from 'quasar';
import UserInfo from 'src/components/UserInfo.vue';
import { useUserStore } from 'src/stores/userstore';

const store = useUserStore();

const token = ref(LocalStorage.getItem('TOKEN') ? (LocalStorage.getItem('TOKEN') as string) : '');

function onSubmit() {
  LocalStorage.setItem('TOKEN', token.value);
  store.fetchData();
  window.location.reload();
}

function onReset() {
  LocalStorage.remove('TOKEN');
  token.value = '';
  store.fetchData();
  window.location.reload();
}

onMounted(() => {
  store.fetchData();
});
</script>

<template>
  <q-page class="q-ma-lg q-pa-lg">
    <div class="text-h4 text-bold">Token Input Page</div>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="token" label="API Token" />

        <div>
          <q-btn label="Save Token" type="submit" color="primary" />
          <q-btn label="Reset Token" type="reset" color="primary" class="q-ml-sm" />
        </div>
      </q-form>
    </div>
    <div class="q-mx-auto" style="max-width: 30vw">
      <UserInfo :user="store.user" />
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
