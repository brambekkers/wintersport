<template>
    <v-col cols="8">
        <v-card elevation="4">
            <v-card-text id="countdown" class="pa-0">
                <div class="number primary--text ">
                    <span class="hanger hanger-left"></span>
                    <span class="hanger hanger-right"></span>
                    <span class="topBar"></span>
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

    div {
        font-size: 2rem;
        font-weight: 600;
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
        color: #202028 !important;
        flex-direction: column;
        min-height: 90px;
        justify-content: flex-start;

        p {
            padding: 1rem;
            min-height: 50% !important;
        }

        .topBar {
            min-height: 30% !important;
            width: 100%;
            background: #ed1b24;
        }

        .hanger {
            position: absolute;
            top: -8%;
            height: 20%;
            width: 6%;
            border-radius: 25%;
            z-index: 10;
            background: #202028 !important;
        }

        .hanger-left {
            left: 20%;
        }
        .hanger-right {
            right: 20%;
        }
    }

    .daysToGo {
        padding: 1rem;
        flex: 4;
        background: #202028 !important;
        color: white;
        line-height: 1.5rem;
        border-radius: 0 4px 4px 0;
    }
}
</style>
