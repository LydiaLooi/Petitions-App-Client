<template>
    <div>
        <navigation></navigation>

        <div class="general-wrapper">


        <section class="section is-paddingless">
            <div class="container min-width">
                <div class="card is-fullwidth">
                    <header class="card-header has-background-orange" v-on:click="showSearchFilters()">
                        <label class="card-header-icon ">
                            <p class="content is-large">
                                Search Petitions
                            </p>
                        </label>
                    </header>
                    <div class="card-content overflow-hidden" :class="{'is-hidden': searchDivVisible}">
                        <div class="content">
                            <label class="label">Search Petition Title</label>

                            <div class="field">
                                <div class="columns">
                                    <div class="column is-two-thirds">
                                        <div class="control">
                                            <input class="input" type="text" v-model="titleQuery" placeholder="Search title">
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="control">
                                            <a class="button is-orange is-fullwidth" v-on:click="searchPetitionTitle">
                                                Search Title Only
                                            </a>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <label class="label">Filter by Category</label>

                            <div class="field">

                                <div class="columns">
                                    <div class="column is-two-thirds">
                                        <div class="control is-expanded">
                                            <div class="select is-fullwidth">
                                                <select name="category" v-model="selectedCategory">
                                                    <option v-for="category in availableCategories"
                                                            v-bind:key="category.categoryId"
                                                            v-bind:value="category.categoryId">{{category.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="control">
                                            <a class="button is-orange is-fullwidth" v-on:click="searchPetitionCategory">
                                                Search Category Only
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <label class="label">Sort Petitions</label>

                            <div class="field">

                                <div class="columns">
                                    <div class="column is-two-thirds">
                                        <div class="control is-expanded">
                                            <div class="select is-fullwidth">
                                                <select name="sortBy" v-model="selectedSortBy">
                                                    <option v-for="sortBy in availableSortBys"
                                                            v-bind:key="sortBy.id"
                                                            v-bind:value="sortBy.queryName">{{sortBy.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div class="field" v-if="isLoggedIn">
                                <label class="checkbox">
                                    <input type="checkbox" v-model="isMyPetitions">
                                    Show only my petitions
                                </label>
                            </div>

                            <div class="columns">
                                <div class="column is-two-thirds">
                                    <div class="control">
                                        <a class="button is-orange is-fullwidth" v-on:click="searchPetitionsAll">
                                            Search Petitions
                                        </a>
                                    </div>
                                </div>
                            </div>





                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!----------------------------------------------- PAGINATION STUFF -------------------------------------------->

        <div class="paginate"  v-if="numberOfPages > 10">
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <a class="pagination-previous button is-orange" :class="{'is-static':isFirstPage}" v-on:click="backPage()">Previous</a>
                <a class="pagination-next button is-orange" :class="{'is-static':isLastPage}" v-on:click="nextPage()">Next page</a>
                <ul class="pagination-list">
<!--                    <li>Temp placeholder pagination stuff and things</li>-->
                    <li><a class="pagination-link" :class="{'is-hidden':isFirstPage}" v-on:click="firstPage">1</a></li>
                                    <li><span class="pagination-ellipsis" :class="{'is-hidden':isFirstPage}">&hellip;</span></li>



                    <li><a class="pagination-link is-current">{{currentPage + 1}}</a></li>

                                    <li><span class="pagination-ellipsis" :class="{'is-hidden':isLastPage}">&hellip;</span></li>
                    <li><a class="pagination-link" :class="{'is-hidden':isLastPage}" v-on:click="lastPage">{{numberOfPages}}</a></li>
                </ul>
            </nav>
        </div>

        <div class="paginate less-than-10" v-if="numberOfPages <= 10">
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <a class="pagination-previous button is-orange" :class="{'is-static':isFirstPage}" v-on:click="backPage()" v-if="petitionsList.length > 0">Previous</a>
                <a class="pagination-next button is-orange" :class="{'is-static':isLastPage}" v-on:click="nextPage()" v-if="petitionsList.length > 0">Next page</a>
                <ul class="pagination-list">

                    <li><label class="has-text-white" v-if="petitionsList.length < 1">No matching petitions</label></li>

                    <li v-for="number in numberOfPages" v-bind:key="number"><a class="pagination-link" :class="{'is-current': number === currentPage + 1}" v-on:click="changePage(number)">{{number}}</a></li>

                </ul>
            </nav>
        </div>

        <!-------------------------------------------- PAGINATION STUFF ABOVE ----------------------------------------->

        <div class="tile is-ancestor">
            <div class="tile">
                <div class="tile is-parent is-vertical">


                    <petition-panel
                            v-for="petition in visiblePetitions"
                            v-bind:key="petition.petitionId"
                            v-bind:petition-id="petition.petitionId"
                            v-bind:title="petition.title"
                            v-bind:author-name="petition.authorName"
                            v-bind:category="petition.category"
                            v-bind:signature-count="petition.signatureCount"
                            v-on:petitionclicked="viewPetitionPage(petition.petitionId)"
                    ></petition-panel>
                </div>
            </div>
        </div>


        <!----------------------------------------------- PAGINATION STUFF -------------------------------------------->

        <div class="paginate"  v-if="numberOfPages > 10 && petitionsList.length > 1">
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <a class="pagination-previous button is-orange" :class="{'is-static':isFirstPage}" v-on:click="backPage()">Previous</a>
                <a class="pagination-next button is-orange" :class="{'is-static':isLastPage}" v-on:click="nextPage()">Next page</a>
                <ul class="pagination-list">
                    <!--                    <li>Temp placeholder pagination stuff and things</li>-->
                    <li><a class="pagination-link" :class="{'is-hidden':isFirstPage}" v-on:click="firstPage">1</a></li>
                    <li><span class="pagination-ellipsis" :class="{'is-hidden':isFirstPage}">&hellip;</span></li>

                    <li><a class="pagination-link is-current">{{currentPage + 1}}</a></li>

                    <li><span class="pagination-ellipsis" :class="{'is-hidden':isLastPage}">&hellip;</span></li>
                    <li><a class="pagination-link" :class="{'is-hidden':isLastPage}" v-on:click="lastPage">{{numberOfPages}}</a></li>
                </ul>
            </nav>
        </div>

        <div class="paginate less-than-10" v-if="numberOfPages <= 10  && petitionsList.length > 1">
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <a class="pagination-previous button is-orange" :class="{'is-static':isFirstPage}" v-on:click="backPage()">Previous</a>
                <a class="pagination-next button is-orange" :class="{'is-static':isLastPage}" v-on:click="nextPage()">Next page</a>
                <ul class="pagination-list">


                    <li v-for="number in numberOfPages" v-bind:key="number"><a class="pagination-link" :class="{'is-current': number === currentPage + 1}" v-on:click="changePage(number)">{{number}}</a></li>

                </ul>
            </nav>
        </div>

        <!-------------------------------------------- PAGINATION STUFF ABOVE ----------------------------------------->


    </div>
    </div>
</template>

<script>

    import PetitionPanel from "../Components/PetitionPanel";
    import {ApiClient} from "@/api";
    import Navigation from "@/Components/Navigation";

    export default {
        name: "Petitions",
        components: {Navigation, PetitionPanel},
        mounted() {
            this.api = new ApiClient();

            if (sessionStorage.getItem("token") !== null) {
                this.isLoggedIn = true;
            }

            this.getAllPetitions();
            this.getAvailableCategories();

        },
        data() {
            return {
                currentPage: 0,
                petitionsPerPage: 10,
                totalPetitions: 0,
                numberOfPages: 0,
                petitionsList: [],
                visiblePetitions: [],
                availableCategories: [
                    {
                        categoryId: -1,
                        name: "All"
                    }
                ],
                selectedCategory: -1,

                selectedSortBy: "ALPHABETICAL_ASC",
                availableSortBys: [
                    {
                        id:0,
                        queryName: "ALPHABETICAL_ASC",
                        name: "Alphabetically by title, A - Z"
                    },
                    {
                        id:1,
                        queryName: "ALPHABETICAL_DESC",
                        name: "Alphabetically by title, Z - A"
                    },
                    {
                        id:2,
                        queryName: "SIGNATURES_ASC",
                        name: "Number of signatures, from least to most"
                    },
                    {
                        id:3,
                        queryName: "SIGNATURES_DESC",
                        name: "Number of signatures, from most to least"
                    },
                ],

                searchDivVisible: false,
                titleQuery: "",
                visiblePageButtons: [],

                isMyPetitions: false,


                isFirstPage: true,
                isLastPage: false,

                isLoggedIn: false,


            }
        },
        methods: {

            showSearchFilters() {
                this.searchDivVisible ^= true;
            },

            backPage() {
                if (this.currentPage > 0) {
                    this.currentPage -= 1;
                    this.paginatePetitions();
                }

                this.isFirstPage = false;
                this.isLastPage = false;


                if (this.currentPage === 0) {
                    this.isFirstPage = true;
                }

                if (this.currentPage === this.numberOfPages - 1) {
                    this.isLastPage = true;
                }
            },

            nextPage() {
                if (this.currentPage + 1 < this.numberOfPages) {
                    this.currentPage += 1;
                    this.paginatePetitions();
                }

                this.isFirstPage = false;
                this.isLastPage = false;


                if (this.currentPage === 0) {
                    this.isFirstPage = true;
                }

                if (this.currentPage === this.numberOfPages - 1) {
                    this.isLastPage = true;
                }

            },


            firstPage() {
                this.currentPage = 0;
                this.isFirstPage = true;
                this.isLastPage = false;
                this.paginatePetitions();
            },

            lastPage() {
                this.currentPage = this.numberOfPages - 1;
                this.isFirstPage = false;
                this.isLastPage = true;
                this.paginatePetitions();

            },

            changePage(pageNumber) {
                this.currentPage = pageNumber - 1;
                this.paginatePetitions();

            },


            async getAllPetitions() {
                this.petitionsList = await this.api.getPetitions();
                this.numberOfPages = Math.ceil(this.petitionsList.length / this.petitionsPerPage);

                this.paginatePetitions();
            },

            paginatePetitions() {

                this.visiblePetitions = [];
                for (let i = this.currentPage * this.petitionsPerPage; i < (this.currentPage * this.petitionsPerPage) + this.petitionsPerPage; i++) {
                    if (this.petitionsList[i] != null) {
                        this.visiblePetitions.push(this.petitionsList[i]);

                    }
                }


            },

            async searchPetitionTitle() {
                this.petitionsList = await this.api.getPetitionsWithQueries({q: this.titleQuery});
                this.numberOfPages = Math.ceil(this.petitionsList.length / this.petitionsPerPage);
                this.currentPage = 0;
                this.paginatePetitions();
            },

            async searchPetitionCategory() {

                if (this.selectedCategory >= 0) {
                    this.petitionsList = await this.api.getPetitionsWithQueries({categoryId: this.selectedCategory});
                    this.numberOfPages = Math.ceil(this.petitionsList.length / this.petitionsPerPage);
                    this.currentPage = 0;

                    this.paginatePetitions();
                } else {
                    this.getAllPetitions();
                }


            },

            async searchPetitionsAll() {
                let query = {};
                if (this.titleQuery !== "") {
                    query["q"] = this.titleQuery;
                }

                if (this.selectedCategory >= 0) {
                    query["categoryId"] = this.selectedCategory;
                }

                if (this.isMyPetitions) {
                    query["authorId"] = sessionStorage.getItem("userId");
                }

                query["sortBy"] = this.selectedSortBy;

                this.petitionsList = await this.api.getPetitionsWithQueries(query);
                this.numberOfPages = Math.ceil(this.petitionsList.length / this.petitionsPerPage);
                this.currentPage = 0;

                this.paginatePetitions();
            },

            async getAvailableCategories() {
                let categories = await this.api.getAvailableCategories()
                for (let id in categories) {
                    this.availableCategories.push(categories[id]);
                }
            },

            viewPetitionPage(petitionId) {
                this.$router.push({name:"ViewPetition", params: {"petitionId": petitionId}});
            }



        },
    }
</script>

<style scoped>

    .general-wrapper {
        margin: 4em auto auto;
        max-width: 60%;
    }

    .button.is-orange {
        background-color: #fea94f;
        border-color: transparent;
    }

    .button.is-orange:hover, .button.is-orange.is-hovered {
        background-color: #fe8a3f;
        border-color: transparent;
    }

    .button.is-orange:focus, .button.is-orange.is-focused {
        border-color: transparent;
    }

    .button.is-orange:focus:not(:active), .button.is-orange.is-focused:not(:active) {
        box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
    }

    .button.is-orange, .button.is-orange.is-active {
        background-color: #fea94f;
        border-color: transparent;
    }

    .paginate {
        margin-top: 1em;
        margin-bottom: 1em;

    }

    .pagination-link {
        background-color: white !important;

    }

    .is-current {
        background-color: #fe8a3f !important;
        border-color: #c35e40 !important;
        /*color: #fff;*/
    }

    .is-static {
        background-color: #c35e40 !important;
        color: #1d0900 !important;

    }

    .has-background-orange {
        background-color: #fea94f !important;
    }

    .card-header.has-background-orange:hover {
        background-color: #fe8a3f !important;
        cursor: pointer;
    }

    .overflow-hidden {
        overflow: hidden;
    }

    .pagination-link {
        border-bottom-left-radius: 0.5em;
        border-top-right-radius: 0.5em;
    }



</style>
