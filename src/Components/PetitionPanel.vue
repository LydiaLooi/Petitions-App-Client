<template>

  <div class="box min-width" v-on:click="viewPetition">


    <div class="columns ">
      <div class="column is-one-third cover-image">
        <img :src="getImage" class="object-fit-image" onerror="this.onerror=null;this.src='https://cdn.discordapp.com/attachments/474461177309691904/711766530827878490/default.png';">

      </div>
      <div class="column is-paddingless">
        <section class="">

          <div class="card-header has-background-orange">
            <h2 class="header-content content is-medium">
              {{title}}
              <span class="float-right">
                {{category}}
              </span>
            </h2>
          </div>


        <div class="card-content">

          <div class="">
            <label class="content is-medium">{{authorName}}</label>
          </div>

          <label class="content is-medium">{{'Signatures: ' + signatureCount}}</label>

        </div>
        </section>

      </div>

    </div>



<!--      <img class="image" src="https://cdn.discordapp.com/emojis/709444569003065395.gif?v=1">-->
<!--      <img :src="getImage">-->
<!--      <label>{{'Title: ' + title}}</label><br>-->
<!--      <label>{{'Author: ' + authorName}}</label><br>-->
<!--      <label></label><br>-->




  </div>

</template>

<script>
  import {ApiClient} from "@/api";

  export default {
    name: "PetitionPanel",
    props: {
      petitionId: {
        type: Number,
        default: -1
      },
      title: {
        type: String,
        default: "title"
      },
      authorName: {
        type: String,
        default: "name"
      },
      category: {
        type: String,
        default: "category"
      },
      signatureCount: {
        type: Number,
        default: -1
      },
      heroImage: {
        type: Image,
        default: null
      }

    },
    data() {
      return {
        getImage: ""
      }
    },
    mounted() {
      this.api = new ApiClient();
      this.getImage = this.api.getPetitionImage(this.petitionId);
    },
    methods: {
      viewPetition() {
        this.$emit("petitionclicked");
      }
    }
  }
</script>

<style scoped>
  .petition-panel {
    /*background-color: #406395;*/
    /*!*max-width: 800px;*!*/
    /*!*min-width: 300px;*!*/
    /*margin: 1em;*/
    /*padding: 1em;*/
    /*border-radius: 1em;*/
    min-width: 300px;

  }

  .cover-image {

    /*background-image: url("https://media.discordapp.net/attachments/590189070156693505/704481012918255626/image0.jpg?width=507&height=676");*/
    background-size: cover;
    border-bottom-left-radius: 2em;
    min-height: 200px;
    min-width: 100px;
    border-top-right-radius: 2em;
    overflow: auto;

  }

  .object-fit-image {
    display: block;
    /*width: 100vw;*/
    /*min-width: 12em;*/
    width: 100%;
    max-height: 12em;
    /*height: 100vh;*/
    /*object-fit: cover;*/
    object-fit: cover;
    /*overflow: hidden;*/
    border-bottom-left-radius: 2em;
    border-top-right-radius: 2em;

  }

  .card-header {
    border-top-right-radius: 2em;
    border-bottom-left-radius: 2em;

  }

  .box {
    border-bottom-left-radius: 2em;
    border-top-right-radius: 2em;

  }

  .column {
    overflow: hidden;
  }

  .has-background-orange {
    background-color: #fea94f !important;
  }

  .box:hover .card-header.has-background-orange {
    background-color: #fe8a3f !important;
    cursor: pointer;
  }

  .float-right {
    float: right;
  }

  .header-content {
    background-color: transparent;
    padding: 1.5rem;
    width: 100%;
  }

  .min-width {
    min-width: 300px;
  }

</style>
