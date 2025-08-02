import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import type { UserIfce } from 'src/components/models';
import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';

export const useUserStore = defineStore('user', () => {
  const user = ref<UserIfce>({} as UserIfce);

  const token = LocalStorage.getItem('TOKEN') as string;
  const endpoint = '/accounts/user/';

  function fetchData() {
    api
      .get<UserIfce>(endpoint, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        user.value = response.data;
        console.log('user info', user.value);
        LocalStorage.setItem('userFirstName', user.value.first_name);
        LocalStorage.setItem('userLastName', user.value.last_name);
        LocalStorage.setItem('userEmail', user.value.email);
        LocalStorage.setItem('username', user.value.username);
      })
      .catch((error: Error) => {
        console.error(error.message);
        alert(error.message);
      });
  }

  return { user, fetchData };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
