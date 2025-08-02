<script lang="ts" setup>
import type { UserIfce } from 'src/components/models';

const { user } = defineProps<{
  user: UserIfce | null;
}>();
</script>

<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">User Information</div>
    </q-card-section>
    <q-separator />
    <q-card-section v-if="user === null">
      <div class="text-h6">User Data Not Available</div>
    </q-card-section>
    <q-card-section v-if="user !== null">
      <q-list dense>
        <q-item class="row">
          <q-item-section class="col-auto text-bold text-primary">
            <span class="label">Username</span>
          </q-item-section>
          <q-item-section class="col">
            {{ user.username }}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="col-auto text-bold text-primary">
            <span class="label"> Name </span>
          </q-item-section>
          <q-item-section> {{ user.first_name }} {{ user.last_name }} </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="col-auto text-bold text-primary">
            <span class="label"> Email</span>
          </q-item-section>
          <q-item-section> {{ user.email }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="col-auto text-bold text-primary">
            <span class="label"> Is Active</span>
          </q-item-section>
          <q-item-section> {{ user.is_active ? 'Yes' : 'No' }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="col-auto text-bold text-primary">
            <span class="label"> Date Created</span>
          </q-item-section>
          <q-item-section> {{ user.date_joined }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="col-auto text-bold text-primary">
            <span class="label">Last Login</span>
          </q-item-section>
          <q-item-section> {{ user.last_login }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.label::after {
  content: ':';
}
</style>
