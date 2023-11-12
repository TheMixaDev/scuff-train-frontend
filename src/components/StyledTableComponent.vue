<template>
    <div class="table-container">
        <table class="styled-table">
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        headers: Array
    }
}
</script>
<style>
.table-container {
  border-radius: 20px;
  min-height: 100px;
  max-height: 50vh;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #FBB199 transparent;
}
.table-container::-webkit-scrollbar {
  width: 12px;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #FBB199;
  border-radius: 20px;
}

.table-container::-webkit-scrollbar-track {
  background-color: transparent;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  font-size: 1em;
  font-family: 'Arial', sans-serif;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.styled-table th {
  background-color: #f2f2f2;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.styled-table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}
.styled-table tbody tr:hover {
  background-color: #f5f5f5;
}
</style>