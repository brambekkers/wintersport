<template>
	<v-col cols="12" sm="8" lg="6" xl="4">
		<v-card elevation="4" height="100%">
			<v-row dense>
				<v-col cols="4" class="pa-0 pl-2">
					<v-img src="@/assets/happySkiFriends/skilift.png"></v-img>
				</v-col>
				<v-col cols="8"
					><v-card-title class="headline pb-0">
						Wintersport
					</v-card-title>
					<v-card-text class="py-0">
						<v-list dense color="transparent">
							<v-list-item>
								<v-list-item-icon class="mr-2">
									<v-icon>location_on</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>
										Saalbach Hinterglem
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-divider />
							<v-list-item>
								<v-list-item-icon class="mr-2">
									<v-icon>today</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>
										20 feb - 28 feb
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-card-text>
				</v-col>
			</v-row>
		</v-card>
	</v-col>
</template>

<script>
	export default {};
</script>

<style>
</style>