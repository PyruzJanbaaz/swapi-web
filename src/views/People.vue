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
                     @input="reloadPeople"
                     v-on:keyup.enter="searchPeople">
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
              :per-page="pageSize"
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
      pageSize: 10
    }
  },
  created() {
    this.getPeople();
  },
  computed: {
    ...mapState('people', ['searchParams']),
    searchResult() {
      return this.$store.getters['people/getSearchResult'];
    },
  },
  methods: {
    getPeople() {
      this.loading = true;
      this.$store.dispatch('people/getPeople', this.searchParams).then(
          () => {
            this.loading = false;
            this.paginationVisibility = this.searchResult.count > this.pageSize;
            if (this.sortColumn !== '') {
              this.sort(this.searchResult.results, this.sortColumn);
            }
          }
      );
    },
    searchPeople() {
      this.resetOptions();
      this.getPeople();
    },
    reloadPeople() {
      if (this.query === '') {
        this.resetOptions();
        this.getPeople();
      }
    },
    resetOptions() {
      this.searchParams.pageNumber = 1;
      this.searchParams.search = this.query;
      this.currentPage = 1;
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
      this.sort(this.searchResult.results, col);
    },
    sort(arr, col) {
      const ascending = this.ascending;
      const sorter = (a, b) => {
        const isNumber = (v) => (+v).toString() === v;
        const aPart = a[col].replace(/-/g, '').replace(/:/g, '').replace(/,/g, '').match(/\d+|\D+/g);
        const bPart = b[col].replace(/-/g, '').replace(/:/g, '').replace(/,/g, '').match(/\d+|\D+/g);
        let i = 0;
        let len = Math.min(aPart.length, bPart.length);
        while (i < len && aPart[i] === bPart[i]) {
          i++;
        }
        if (i === len) {
          return aPart.length - bPart.length;
        }
        if (isNumber(aPart[i]) && isNumber(bPart[i])) {
          return ascending ? bPart[i] - aPart[i] : aPart[i] - bPart[i];
        }
        return ascending ? aPart[i].localeCompare(bPart[i]) : bPart[i].localeCompare(aPart[i]);
      };
      arr.sort(sorter);
      this.searchResult.sortAsc = this.ascending;
      this.searchResult.sortedColumn = col;
    }
  }
}
</script>