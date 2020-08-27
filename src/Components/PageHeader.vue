<template>
    <div>
        <div class="page-header">
    <!--    <div>-->
            <h1>
                <span id="title" class="button" v-on:click="backHome">
                    <h1 class="content is-large">
                                        Ultimate Petitions Site
                    </h1>
                </span>

            </h1>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Header",
        methods: {
            backHome() {
                if (this.$route.name !== "Home") {
                    this.$router.push({name: "Home"});
                }
            }
        },
    }
</script>

<style scoped>
    .page-header {
        background-color: white;
        margin: 0;
        padding: 1em;
        text-align: center;
        overflow: hidden;
    }

    .page-header h1 {
        margin: 0;
    }

    .float-right {
        float: right;
    }

    #title {
        border-color: transparent;
    }

</style>
