<template>
    <div class="">
        <div class="centered">
<!--            <div class="field">-->
<!--                <h3 class="content is-medium">Share this petition!</h3>-->

<!--            </div>-->

            <div class="field is-grouped">
                <img class="image is-32x32 pointer" alt="Share on Facebook!" src="https://cdn.discordapp.com/attachments/474461177309691904/712466905683984475/mail.png" v-on:click="shareEmail">
                <img class="image is-32x32 pointer" alt="Share on Facebook!" src="https://cdn.discordapp.com/attachments/474461177309691904/712464512384499752/1384053.png" v-on:click="shareFacebook">
                <img class="image is-32x32 pointer" alt="Share on Twitter!" src="https://cdn.discordapp.com/attachments/474461177309691904/712464466456871022/733579.png" v-on:click="shareTwitter">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "ShareButtons",
        methods: {
            shareEmail() {
                window.open(
                    'mailto:' +
                    this.objectToGetParams(
                        {
                        subject: "Check out this petition!",
                        body: "Check out this petition: https://canterbury.ac.nz" + this.$route.fullPath
                    }),
                    '__blank'
                );
            },

            shareFacebook() {
                window.open(
                    `https://www.facebook.com/sharer/sharer.php` +
                    this.objectToGetParams({
                        u: "https://canterbury.ac.nz" + this.$route.fullPath
                    }),
                    '__blank'
                );
            },

            shareTwitter() {
                window.open(
                    'https://www.twitter.com/share' +
                    this.objectToGetParams({
                        url: "https://canterbury.ac.nz" + this.$route.fullPath,
                        text: "Check out this petition!"
                    }),
                    '__blank'
                );            },

            // from https://vuejsexamples.com/vue-component-for-social-sharing-of-links/ source
            objectToGetParams(object) {
                return (
                    '?' +
                    Object.keys(object)
                        .filter(key => !!object[key])
                        .map(key => `${key}=${encodeURIComponent(object[key])}`)
                        .join('&')
                );
            }
        },
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
        margin-right: 1em;
    }

    .centered {
        max-width: fit-content;
        margin: auto;
    }

</style>
