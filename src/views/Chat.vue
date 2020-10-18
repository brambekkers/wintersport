<template>
	<div id="chat">
		<div
			class="messages"
			ref="messages"
		>
			<div
				v-for="(message, i) of chat"
				:key="i"
				:class="[
					'message',
					message.user === user.uid ? 'message--right' : 'message--left',
				]"
			>
				<Avatar
					size="40"
					:profile="profiles[message.user]"
				/>
				<div class="message__bubble">
					<div
						v-if="message.user !== user.uid"
						class="message__name"
					>
						{{ profiles[message.user].name }}
					</div>
					<div class="message__text">
						{{ message.text }}
					</div>
				</div>
			</div>
		</div>
		<div class="input d-flex pa-4 align-center">
			<v-text-field
				solo
				placeholder="Type a message"
				v-model="message"
				v-on:keyup.enter="sendMessage"
				class="flex-grow-1 mr-4"
				hide-details="auto"
			/>

			<v-btn
				fab
				color="primary"
				@click="sendMessage"
			>
				<v-icon>send</v-icon>
			</v-btn>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Avatar from "@/components/Avatar.vue";

export default {
	components: { Avatar },
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
		...mapGetters(["firebase", "user", "users", "chat"]),
		profiles() {
			return Object.fromEntries(
				this.users.map((profile) => [profile.id, profile])
			);
		},
	},
	methods: {
		...mapActions(["chatWatcher", "createMessage"]),
		sendMessage() {
			if (!this.message) {
				return;
			}
			this.createMessage(this.message);
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
				this.chatWatcher();
				this.scrollToBottom();
			} else {
				setTimeout(() => {
					this.chatWatcher();
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
			padding: 1rem;

			.message {
				display: flex;
				font-size: 0.8rem;
				align-items: flex-end;

				& + .message {
					margin-top: 1rem;
				}

				.message__name {
					opacity: 0.5;
					font-size: smaller;
				}

				.message__bubble {
					transform: translateY(-40%);
					position: relative;
					border-radius: 0.4em;
					padding: 0.75rem 1rem;
					box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

				}

				.message__bubble:after {
					content: "";
					position: absolute;
					bottom: 0;
					width: 0;
					height: 0;
					border: 0.5rem solid transparent;
					border-bottom: 0;
					margin-bottom: -0.5rem;
					text-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 4px 5px 0px rgba(0, 0, 0, 0.41), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
				}

				&.message--right {
					flex-direction: row-reverse;

					.message__bubble {
						border-bottom-right-radius: 0;
						margin-right: 0.5rem;
						background: #2ba97a;
						color: white;
					}

					.message__bubble:after {
						right: 0;
						border-top-color: #2ba97a;
						border-right: 0;
					}
				}

				&.message--left {
					.message__content {
						text-align: right;
					}

					.message__bubble {
						border-bottom-left-radius: 0;
						margin-left: 0.5rem;
						background: #e0eee7;
						color: black;
					}

					.message__bubble:after {
						left: 0;
						border-top-color: #e0eee7;
						border-left: 0;
					}
				}
			}
		}

		.input {
			width: 100%;
		}
	}
</style>
