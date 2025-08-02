<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Families"
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="single"
      v-model:selected="selected"
      :filter="filter"
    >
      <template #body-cell-hold="props">
        <q-td :props="props">
          <q-icon v-if="!props.row.hold_checkin" name="check_circle" color="green" size="24px" />
          <q-icon v-if="props.row.hold_checkin" name="cancel" color="red" size="24px" />
        </q-td>
      </template>
      <template v-slot:top-right>
        <q-btn color="primary" class="q-mr-sm" label="Reset" @click="filter = ''" />
        <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import type { FamilyIfce } from './models';
import { ref, watch } from 'vue';

const selected = ref<FamilyIfce[]>([]);

const model = defineModel<FamilyIfce | null>();

const filter = ref('');

watch(selected, (newValue) => {
  if (newValue.length > 0) {
    model.value = newValue[0];
  } else {
    model.value = null;
  }
});

const { rows } = defineProps<{
  rows: FamilyIfce[];
}>();

const columns: QTableColumn[] = [
  { name: 'id', align: 'left', label: 'Family ID', field: 'id', sortable: true },
  {
    name: 'primary',
    align: 'left',
    label: 'Primary',
    field: 'primary_last_name',
    format: (val, row) => `${row.primary_last_name}, ${row.primary_first_name}`,
    sortable: true,
  },
  {
    name: 'secondary',
    align: 'left',
    label: 'Secondary',
    field: 'secondary_first_name',
    format: (val, row) =>
      row.secondary_first_name ? `${row.secondary_last_name}, ${row.secondary_first_name}` : '',
    sortable: true,
  },
  {
    name: 'email',
    align: 'left',
    label: 'Email',
    field: 'primary_email',
    format: (val, row) => (row.secondary_email ? `${val}, ${row.secondary_email}` : val),
    sortable: true,
  },
  {
    name: 'phone',
    align: 'left',
    label: 'Phone',
    field: 'primary_phone',
    format: (val, row) => (row.secondary_phone ? `${val}, ${row.secondary_phone}` : val),
    sortable: true,
  },
  {
    name: 'hold',
    align: 'center',
    label: 'Checkin Allowed',
    field: 'hold_checkin',
    sortable: true,
  },
];
</script>
