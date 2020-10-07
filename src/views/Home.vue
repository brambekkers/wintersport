<template>
	<v-container>
		<v-row class="justify-center" align="center">
			<v-col cols="8" md="4" xl="2" class="pt-0 mt-n4">
				<v-img
					contain
					src="@/assets/happySkiFriends/skilift.png"
				></v-img>
			</v-col>
			<Countdown />
		</v-row>
	</v-container>
</template>

<script>
	import Countdown from "@/components/Countdown.vue";
	export default {
		name: "Home",
		components: { Countdown },
	};
</script>
