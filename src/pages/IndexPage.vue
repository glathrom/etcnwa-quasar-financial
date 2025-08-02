<template>
  <q-page class="q-ma-xl">
    <family-table :rows="families" v-model="selectedFamily" />
    <div v-if="selectedFamily">
      <family-update-form v-model="selectedFamily" />
    </div>
    <error-dialog v-model="store.errorTrigger" :message="store.errorMessage" />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useFinancialStore } from 'src/stores/financialstore';
import FamilyTable from 'src/components/FamilyTable.vue';
import type { FamilyIfce } from 'src/components/models';
import FamilyUpdateForm from 'src/components/FamilyUpdateForm.vue';
import ErrorDialog from 'src/components/ErrorDialog.vue';

const store = useFinancialStore();

const families = computed(() => store.families);

const selectedFamily = ref<FamilyIfce | null>(null);

onMounted(() => {
  store.fetchData();
});
</script>
