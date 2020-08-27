<template>
    <div>
        <!--    <h1>Amazing Petitions Site</h1>-->

        <!--    <h3>Welcome!</h3>-->
        <navigation></navigation>
        <div class="columns">
            <div class="column"></div>
            <div class="column is-8-widescreen">
                <h1 class="title top-center">Page not found... What are you trying to do? :(</h1>
                <h1 class="custom-button is-orange center is-large" v-on:click="goHome">Take me back home</h1>
            </div>
            <div class="column"></div>
        </div>


    </div>
</template>

<script>
    import Navigation from "@/Components/Navigation";

    export default {
        name: "PageNotFound",
        components: {Navigation},
        methods: {
            goHome() {
                this.$router.push({name:"Home"});
            }
        }
    }
</script>

<style scoped>
    .title {
        color: white;
        text-align: center;
        margin-top: 5em;
    }

    .centered {
        margin: auto;
    }

    .is-orange {
        background-color: #fea94f;
        border-color: transparent;
    }

    .is-orange:hover, .button.is-orange.is-hovered {
        background-color: #fe8a3f;
        border-color: transparent;
    }

    .is-orange:focus, .button.is-orange.is-focused {
        border-color: transparent;
    }

    .is-orange:focus:not(:active), .button.is-orange.is-focused:not(:active) {
        box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
    }

    .is-orange, .button.is-orange.is-active {
        background-color: #fea94f;
        border-color: transparent;
    }

    .custom-button {
        max-width: 15em;
        text-align: center;
        padding: 1em;
        margin: auto;
        font-size: large;
        border-bottom-left-radius: 2em;
        border-top-right-radius: 2em;
        cursor: pointer;
    }
</style>
