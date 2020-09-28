<template>
	<v-list-item
		:to="route ? route : '#'"
		@click="action ? action() : null"
	>
		<v-list-item-icon>
			<v-icon>{{ icon }}</v-icon>
		</v-list-item-icon>
		<v-list-item-content>
			<v-list-item-title v-text="title"></v-list-item-title>
		</v-list-item-content>
	</v-list-item>
</template>

<script>
export default {
	props: ["title", "icon", "action", "route"],
};
</script>

<style>
</style>