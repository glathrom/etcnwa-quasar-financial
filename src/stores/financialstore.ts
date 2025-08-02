import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import type { FamilyIfce } from 'src/components/models';
import { api } from 'src/boot/axios';
import { LocalStorage } from 'quasar';

export const useFinancialStore = defineStore('financial', () => {
  const families = ref<FamilyIfce[]>([]);

  const token = LocalStorage.getItem('TOKEN') as string;
  const endpoint = '/families/family';

  function fetchData() {
    const url = `${endpoint}/basic/`;
    api
      .get<FamilyIfce[]>(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        families.value = response.data;
        console.log('family info', families.value);
      })
      .catch((error: Error) => {
        console.error(error.message);
        alert(error.message);
      });
  }

  function updateFamily(data: FamilyIfce) {
    const url = `${endpoint}/${data.id}/`;
    api
      .put<FamilyIfce>(url, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log('family update', response.data);
        fetchData();
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }

  return { families, fetchData, updateFamily };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFinancialStore, import.meta.hot));
}
