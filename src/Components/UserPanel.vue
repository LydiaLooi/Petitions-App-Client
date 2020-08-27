<template>
    <div class="box">
        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img :src="getImage" alt="Avatar" onerror="this.onerror=null;this.src='https://cdn.discordapp.com/attachments/474461177309691904/711913897820422195/defaultUser.png';">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>{{name}}</strong> {{country}}<span v-if="city !== null">, {{city}}</span>
                    </p>
                    Signed: {{(new Date(Date.parse(signedDate))).toDateString()}}


                </div>
            </div>
        </article>

<!--        <img :src="getImage" :alt="name + '\'s image'"><br>-->

<!--        {{signatoryId}}<br>-->
<!--        {{name}}<br>-->
<!--        {{city}}<br>-->
<!--        {{country}}<br>-->
<!--        {{signedDate}}<br>-->
    </div>

</template>

<script>
    import {ApiClient} from "@/api";

    export default {
        name: "UserPanel",
        props: {
            signatoryId: {
                type: Number,
                default: -1
            },
            name: {
                type: String,
                default: ""
            },
            city: {
                type: String,
                default: ""
            },
            country: {
                type: String,
                default: ""
            },
            signedDate: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                getImage: ""
            }
        },
        mounted() {
            this.api = new ApiClient();
            this.getImage = this.api.getUserImage(this.signatoryId);
        }

    }
</script>

<style scoped>

</style>
