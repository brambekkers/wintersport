<template>
  <v-navigation-drawer app v-model="drawer" light>
    <v-list dense>
      <template v-for="(header, i) of headers">
        <v-subheader :key="`header${i}`">{{ header.name }}</v-subheader>
        <v-list-item-group color="primary" :key="`group${i}`">
          <v-list-item v-for="(item, j) in header.items" :key="j">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      headers: [
        {
          name: "profile",
          items: [
            {
              title: "Login",
              icon: "login",
              action: "login",
            },
            {
              title: "Logout",
              icon: "power_settings_new",
              action: "register",
            },
            {
              title: "Register",
              icon: "person_add",
              action: "register",
            },
          ],
        },
        {
          name: "Actions",
          items: [
            {
              action: "restaurant",
              title: "Dining",
            },
            {
              action: "school",
              title: "Education",
            },
            {
              action: "directions_run",
              title: "Family",
            },
            {
              action: "healing",
              title: "Health",
            },
            {
              action: "content_cut",
              title: "Office",
            },
            {
              action: "local_offer",
              title: "Promotions",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style></style>
