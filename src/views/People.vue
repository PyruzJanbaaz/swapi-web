<template>
  <div class="container">
    <div class="card mt-5">
      <SWOverlay v-if="loading"/>
      <div class="card-header">
        <div class="row">
          <div class="col-8">
            <h4>
              <em class="ri-star-smile-fill"/>
              Star War Characters
            </h4>
          </div>
          <div class="col-4">
            <div class="input-group">
              <input type="text" class="form-control"
                     placeholder="Type a name to search..."
                     v-model="query"
                     @input="searchPeople">
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="col-12">
          <DataTable :fields="fields"
                     :items="searchResult.results"
                     :count="searchResult.count"
                     :sort-asc="searchResult.sortAsc"
                     :sorted-column="searchResult.sortedColumn"
                     @sorted="onSortChange"/>
          <SwPagination
              v-if="paginationVisibility"
              :total-pages="searchResult.totalPages"
              :total="searchResult.count"
              :per-page="10"
              :current-page="currentPage"
              @pageChanged="onPageChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SWOverlay from "@/components/Overlay";
import SwPagination from "@/components/Pagination";
import DataTable from "@/components/DataTable";
import {mapState} from "vuex";

export default {
  name: 'PeopleList',
  components: {SWOverlay, SwPagination, DataTable},
  data() {
    return {
      fields: [
        {key: 'name', text: 'Name'},
        {key: 'gender', text: 'Gender'},
        {key: 'birth_year', text: 'BirthYear'},
        {key: 'height', text: 'Height'},
        {key: 'mass', text: 'Mass'},
        {key: 'skin_color', text: 'Skin'},
        {key: 'eye_color', text: 'Eye'},
        {key: 'created', text: 'Created'},
      ],
      currentPage: 1,
      loading: false,
      paginationVisibility: false,
      query: '',
      ascending: false,
      sortColumn: '',
    }
  },
  created() {
    this.getPeople();
  },
  computed: {
    ...mapState('people', ['searchParams']),
    searchResult() {
      return this.$store.getters['people/getSearchResult'].data;
    },
  },
  methods: {
    getPeople() {
      this.loading = true;
      this.$store.dispatch('people/getPeople', this.searchParams).then(
          () => {
            this.loading = false;
            this.paginationVisibility = this.searchResult.count > 10;
          }
      );
    },
    searchPeople() {
      this.searchParams.pageNumber = 1;
      this.searchParams.search = this.query;
      this.currentPage = 1;
      this.getPeople();
    },
    onPageChange(page) {
      this.currentPage = page;
      this.searchParams.pageNumber = page;
      this.getPeople();
    },
    onSortChange(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }
      const ascending = this.ascending;
      this.searchResult.results.sort(function (a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1
        }
        return 0;
      });
      this.searchResult.sortAsc = this.ascending;
      this.searchResult.sortedColumn = col;
    },
  }
}
</script>

<style scoped>

</style>