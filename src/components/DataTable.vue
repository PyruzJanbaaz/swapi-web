<template>
  <table class="table table-striped">
    <caption v-if="count === 0" class="text-center">No Data Found!</caption>
    <thead>
    <tr>
      <th v-for="th in fields" :key="th">
        <span @click="sort(th.key)">
          <em class="ri-arrow-up-s-line" v-if="th.key === sortedColumn && sortAsc"/>
          <em class="ri-arrow-down-s-line" v-if="th.key === sortedColumn && !sortAsc"/>
          {{ th.text }}
        </span>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="td in items" :key="td">
      <td v-for="th in fields" :key="th">
        <span v-if="td[th.key] === null">
          -
        </span>
        <span v-else-if="th.key === 'created'">
          {{ td[th.key].replace('T', ' ').split('.')[0] }}
        </span>
        <span v-else>
          {{ td[th.key] }}
        </span>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    fields: {
      type: Array,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    sortAsc: {
      type: Boolean,
      required: false
    },
    sortedColumn: {
      type: String,
      required: false
    }
  },
  methods: {
    sort(key) {
      this.$emit('sorted', key);
    },
  }
}
</script>

<style scoped>
table thead th, table tbody td {
  text-align: center;
}
table thead th span:hover{
  cursor: pointer;
  color: var(--swapi-grey);
}
</style>