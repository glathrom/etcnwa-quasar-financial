<template>
  <div class="q-pa-md bg-grey-2">
    <div class="text-h6">Update Family Form</div>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-checkbox v-model="hold" label="Hold Checkin" />
      <div class="row q-col-gutter-sm justify-start">
        <div class="col-6">
          <q-input filled v-model="primaryFirstName" label="Primary First Name *" />
        </div>
        <div class="col-6">
          <q-input filled v-model="primaryLastName" label="Primary Last Name *" />
        </div>
      </div>
      <div class="row q-col-gutter-sm justify-start">
        <div class="col-6">
          <q-input filled v-model="primaryEmail" label="Primary Email *" />
        </div>
        <div class="col-6">
          <q-input filled v-model="primaryPhone" label="Primary Phone *" />
        </div>
      </div>
      <div class="row q-col-gutter-sm justify-start">
        <div class="col-6">
          <q-input filled v-model="secondaryFirstName" label="Secondary First Name *" />
        </div>
        <div class="col-6">
          <q-input filled v-model="secondaryLastName" label="Secondary Last Name *" />
        </div>
      </div>
      <div class="row q-col-gutter-sm justify-start">
        <div class="col-6">
          <q-input filled v-model="secondaryEmail" label="Secondary Email *" />
        </div>
        <div class="col-6">
          <q-input filled v-model="secondaryPhone" label="Secondary Phone *" />
        </div>
      </div>
      <div class="row q-col-gutter-sm justify-start">
        <div class="col-6">
          <q-input filled type="textarea" autogrow v-model="pickup" label="Pickup *" />
        </div>
        <div class="col-6">
          <q-input
            filled
            type="textarea"
            autogrow
            v-model="emergency"
            label="Emergency Contact *"
          />
        </div>
      </div>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import type { FamilyIfce } from './models';
import { ref, watch } from 'vue';
import { useFinancialStore } from 'src/stores/financialstore';

const store = useFinancialStore();
const model = defineModel<FamilyIfce | null>();

const primaryFirstName = ref(model.value?.primary_first_name);
const primaryLastName = ref(model.value?.primary_last_name);
const primaryEmail = ref(model.value?.primary_email);
const primaryPhone = ref(model.value?.primary_phone);
const secondaryFirstName = ref(model.value?.secondary_first_name);
const secondaryLastName = ref(model.value?.secondary_last_name);
const secondaryEmail = ref(model.value?.secondary_email);
const secondaryPhone = ref(model.value?.secondary_phone);
const emergency = ref(model.value?.emergency_contact);
const pickup = ref(model.value?.pickup);
const hold = ref(model.value?.hold_checkin);

watch(model, (newValue) => {
  if (newValue !== null) {
    primaryFirstName.value = newValue?.primary_first_name ? newValue.primary_first_name : '';
    primaryLastName.value = newValue?.primary_last_name ? newValue.primary_last_name : '';
    primaryEmail.value = newValue?.primary_email ? newValue.primary_email : '';
    primaryPhone.value = newValue?.primary_phone ? newValue.primary_phone : '';
    secondaryFirstName.value = newValue?.secondary_first_name ? newValue.secondary_first_name : '';
    secondaryLastName.value = newValue?.secondary_last_name ? newValue.secondary_last_name : '';
    secondaryEmail.value = newValue?.secondary_email ? newValue.secondary_email : '';
    secondaryPhone.value = newValue?.secondary_phone ? newValue.secondary_phone : '';
    emergency.value = newValue?.emergency_contact ? newValue?.emergency_contact : '';
    pickup.value = newValue?.pickup ? newValue?.pickup : '';
    hold.value = newValue?.hold_checkin;
  } else {
    onReset();
  }
});

function onReset() {
  primaryFirstName.value = '';
  primaryLastName.value = '';
  primaryEmail.value = '';
  primaryPhone.value = '';
  secondaryFirstName.value = '';
  secondaryLastName.value = '';
  secondaryEmail.value = '';
  secondaryPhone.value = '';
  emergency.value = '';
  pickup.value = '';
  hold.value = false;
}

function onSubmit() {
  if (model.value != null) {
    const data: FamilyIfce = {
      id: model.value.id,
      primary_first_name: primaryFirstName.value ? primaryFirstName.value : '',
      primary_last_name: primaryLastName.value ? primaryLastName.value : '',
      primary_email: primaryEmail.value ? primaryEmail.value : '',
      primary_phone: primaryPhone.value ? primaryPhone.value : '',
      secondary_first_name: secondaryFirstName.value ? secondaryFirstName.value : '',
      secondary_last_name: secondaryLastName.value ? secondaryLastName.value : '',
      secondary_email: secondaryEmail.value ? secondaryEmail.value : '',
      secondary_phone: secondaryPhone.value ? secondaryPhone.value : '',
      pickup: pickup.value ? pickup.value : '',
      emergency_contact: emergency.value ? emergency.value : '',
      hold_checkin: hold.value !== undefined ? hold.value : false,
    };

    store.updateFamily(data);

    console.log('form submitted');
  }
}
</script>

<style lang="scss" scoped></style>
