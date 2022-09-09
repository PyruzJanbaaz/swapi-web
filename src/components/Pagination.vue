<template>
  <nav aria-label="Page navigation ">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <button
            class="page-link"
            type="button"
            @click="firstPageHandler"
            :disabled="isInFirstPage"
            aria-label="Go to first page">
          First
        </button>
      </li>
      <li class="page-item">
        <button
            class="page-link"
            type="button"
            @click="previousPageHandler"
            :disabled="isInFirstPage"
            aria-label="Go to previous page">
          Prev
        </button>
      </li>
      <li v-for="page in pages" :key="page" class="page-item">
        <button
            class="page-link"
            type="button"
            @click="pageHandler(page.name)"
            :disabled="page.isDisabled"
            :class="{ active: isPageActive(page.name) }"
            :aria-label="`Go to page number ${page.name}`">
          {{ page.name }}
        </button>
      </li>
      <li class="page-item">
        <button
            class="page-link"
            type="button"
            @click="nextPageHandler"
            :disabled="isInLastPage"
            aria-label="Go to next page">
          Next
        </button>
      </li>
      <li class="page-item">
        <button
            class="page-link"
            type="button"
            @click="lastPageHandler"
            :disabled="isInLastPage"
            aria-label="Go to last page">
          Last
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "SW-Pagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    firstPageHandler() {
      this.$emit('pageChanged', 1);
    },
    previousPageHandler() {
      this.$emit('pageChanged', this.currentPage - 1);
    },
    pageHandler(page) {
      this.$emit('pageChanged', page);
    },
    nextPageHandler() {
      this.$emit('pageChanged', this.currentPage + 1);
    },
    lastPageHandler() {
      this.$emit('pageChanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  }
};
</script>
