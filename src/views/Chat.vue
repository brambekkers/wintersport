<template>
	<div id="chat">
		<div
			class="messages"
			ref="messages"
		>
			<div
				v-for="(message, i) of chat"
				:key="i"
				class="message"
				:class="i % 2 == 1 ? 'right' : ''"
			>
				<v-avatar size="40">
					<v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
				</v-avatar>
				<p :class="i % 2 == 0 ? 'speech-bubble-left' : 'speech-bubble-right'">
					{{ message.text }}
				</p>
			</div>
		</div>
		<!-- INPUT -->
		<div class="input d-flex px-2 py-1">
			<v-textarea
				dense
				rows="1"
				placeholder="Send your message..."
				v-model="message"
			/>

			<v-btn
				icon
				color="primary"
				class="ml-2 my-auto"
				@click="sentMessage"
			>
				<v-icon>send</v-icon>
			</v-btn>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			message: "",
		};
	},
	watch: {
		chat: {
			handler: "scrollToBottom",
		},
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
		scrollToBottom() {
			this.$nextTick(() => {
				this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
			});
		},
	},
	mounted() {
		if (!this.chat) {
			if (this.firebase) {
				this.$store.dispatch("chatWatcher");
				this.scrollToBottom();
			} else {
				setTimeout(() => {
					this.$store.dispatch("chatWatcher");
					this.scrollToBottom();
				}, 1000);
			}
		}
	},
};
</script>

<style lang="scss" scoped>
	#chat {
		display: flex;
		flex-direction: column;
		max-width: 100vw;
		height: calc(100vh - 56px);
		align-items: flex-start;
		box-sizing: border-box;

		.messages {
			flex-grow: 1 !important;
			overflow-y: scroll;
			width: 100%;
			padding: 0 12px;

			.message {
				display: flex;
				margin: 1rem 0;
				font-size: 0.8rem;
				align-items: flex-end;

				.speech-bubble-left {
					position: relative;
					background: #2ba97a;
					color: white;
					border-radius: 0.4em;
					border-bottom-left-radius: 0;
					margin-left: 0.5rem;
					padding: 0.8rem;
				}

				.speech-bubble-left:after {
					content: "";
					position: absolute;
					bottom: 0;
					left: 0%;
					width: 0;
					height: 0;
					border: 0.5rem solid transparent;
					border-top-color: #2ba97a;
					border-bottom: 0;
					border-left: 0;
					margin-bottom: -0.5rem;
				}

				.speech-bubble-right {
					position: relative;
					background: #eff9f6;
					border-radius: 0.4em;
					border-bottom-right-radius: 0;
					margin-right: 0.5rem;
					padding: 0.8rem;
				}

				.speech-bubble-right:after {
					content: "";
					position: absolute;
					bottom: 0;
					right: 0%;
					width: 0;
					height: 0;
					border: 0.5rem solid transparent;
					border-top-color: #eff9f6;
					border-bottom: 0;
					border-right: 0;
					margin-bottom: -0.5rem;
				}
			}

			.right {
				flex-direction: row-reverse;
			}
		}

		.input {
			display: flex;
			width: 100%;
			border-top: 1px solid rgba(0, 0, 0, 0.42);
		}
	}
</style>
