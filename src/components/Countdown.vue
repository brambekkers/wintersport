<template>
    <v-col cols="8">
        <v-card>
            <v-card-text id="countdown" class="pa-0">
                <div class="number primary--text primary--background">
                    <div class="topBar"></div>
                    <p>{{ daysToGo }}</p>
                </div>
                <div class="daysToGo ">
                    <p>days to go</p>
                </div>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script>
export default {
    computed: {
        daysToGo() {
            const countDownDay = [20, 2]; // 20th of February
            const today = new Date();
            const cday = new Date(today.getFullYear(), countDownDay[1] - 1, countDownDay[0]);
            if (today.getTime() > cday.getTime()) {
                cday.setFullYear(cday.getFullYear() + 1);
            }
            const diff = cday.getTime() - today.getTime();

            return Math.floor(diff / (1000 * 60 * 60 * 24));
        }
    }
};
</script>

<style lang="scss" scoped>
#countdown {
    display: flex;
    text-align: center;
    overflow: hidden;

    div {
        font-size: 2rem;
        font-weight: 600;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
            margin: 0;
        }
    }

    .number {
        position: relative;
        flex: 3;

        .topBar {
            position: absolute;
            height: 20%;
            width: 100%;
            background: #ed1b24;
        }
    }

    .daysToGo {
        flex: 4;
        background: #202028 !important;
        color: white;
    }
}
</style>
