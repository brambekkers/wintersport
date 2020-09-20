<template>
	<v-container class="fill-height" fluid>
		<v-row align="center" justify="center" class="messages">
			<v-col cols="12">
				<p v-for="(message, i) of chat" :key="i">{{ message.text }}</p>
			</v-col>
		</v-row>
		<!-- INPUT -->
		<v-row class="input">
			<v-col cols="12">
				<v-card>
					<v-row>
						<v-col cols="10">
							<v-textarea
								dense
								rows="2"
								class="m-2"
								placeholder="Send your message..."
								v-model="message"
							/>
						</v-col>
						<v-col cols="2">
							<v-btn color="primary" @click="sentMessage">Send</v-btn>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			message: "",
		};
	},
	computed: {
		firebase() {
			return this.$store.getters.firebase;
		},
		chat() {
			return this.$store.getters.chat;
		},
	},
	methods: {
		sentMessage() {
			this.$store.dispatch("sentMessage", this.message);
			this.message = "";
		},
	},
	mounted() {
		if (!this.chat) {
			if (this.firebase) {
				this.$store.dispatch("chatWatcher");
			} else {
				setTimeout(() => {
					this.$store.dispatch("chatWatcher");
				}, 1000);
			}
		}
	},
};
</script>

<style lang="scss" scoped>
.message {
	height: calc(100% - 100px) !important;
}

.input {
	min-height: 100px;
	max-height: 100px;
}
</style>
