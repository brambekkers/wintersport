<template>
	<v-container>
		<v-row>
			<v-col>
				<v-text-field prepend-icon="mdi-person" label="Name"></v-text-field>
				<v-file-input
					:rules="rules"
					accept="image/png, image/jpeg, image/bmp"
					placeholder="Pick an avatar"
					prepend-icon="mdi-camera"
					label="Avatar"
				></v-file-input>
			</v-col>
		</v-row>
	</v-container>
</template>
