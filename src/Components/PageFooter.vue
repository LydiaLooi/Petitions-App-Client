<template>
    <div class="page-footer">
        <p id="scrollTop" v-on:click="scrollToTop">Back to top</p>
    </div>
</template>

<script>
    export default {
        name: "PageFooter",
        methods: {
            scrollToTop() {

                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });

            }
        },
    }
</script>

<style scoped>
    .page-footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;

        text-align: center;
        background-color: white;
        color: #909090;
        font-size: smaller;
        /*margin: 0;*/
        /*padding: 0.5em;*/
        /*text-align: center;*/
        /*position: fixed;*/
    }

    .page-header p{
        margin: 0;
    }

    #scrollTop {
        cursor: pointer;
    }


</style>
