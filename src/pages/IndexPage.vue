<script setup>
import { defineComponent, onMounted } from 'vue'
import { usePostOperations } from 'src/composables/usePostOperations.js';

const { posts, getPosts, deletePost, editPost } = usePostOperations();

const columns = [

  { name: 'title', field: 'title', label: 'Title', align: 'left', sortable: true },
  { name: 'author', field: 'author', label: 'Author', align: 'left', sortable: true },
  { name: 'description', field: 'description', label: 'Description', align: 'left', sortable: true },
  { name: 'actions', field: 'actions', label: 'Actions', align: 'right', sortable: false },

]
onMounted(async () => {
  getPosts();
})

defineComponent({
  name: 'IndexPage'
})

</script>

<template>
  <q-page padding>
    <q-table title="Posts" :rows="posts" :columns="columns" row-key="name">

      <template v-slot:top>
        <span class="text-h5"> Task List</span>
        <q-space />

        <q-btn color="primary" label="Add Post" :to="{ name: 'formPost' }" />

      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn color="positive" dense size="sm" icon="edit" @click="editPost(props.row.id)" />
          <q-btn color="negative" dense size="sm" icon="delete" @click="deletePost(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
