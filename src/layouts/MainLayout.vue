<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Eclectic Teaching Consortium</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        <q-item>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <RouterLink style="text-decoration: none" to="token">User Info</RouterLink>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const linksList: EssentialLinkProps[] = [
  {
    title: 'ETC Public Site',
    icon: 'school',
    link: 'https://etcnwa.org',
  },
  {
    title: 'Homeschool Life Admin',
    icon: 'admin_panel_settings',
    link: 'https://www.etcnwa.org/500/admin/',
  },
  {
    title: 'ETC Facebook',
    icon: 'public',
    link: 'https://www.facebook.com/EclecticTeachingConsortiumNWA1/',
  },
  {
    title: 'Financial',
    icon: 'money',
    link: `${process.env.APP_API_ENDPOINT}/spa/financial/`,
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
