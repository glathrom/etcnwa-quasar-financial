<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="showDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Error</div>
        </q-card-section>

        <q-card-section class="q-pt-none">{{ message }}</q-card-section>

        <q-card-actions align="right" class="bg-white text-red">
          <q-btn flat label="OK" v-close-popup @click="model = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const model = defineModel<boolean>();

const showDialog = ref(false);

watch(model, (newValue) => {
  if (newValue !== undefined) {
    showDialog.value = newValue;
  } else {
    showDialog.value = false;
  }
});

const { message } = defineProps<{
  message: string | null;
}>();
</script>
