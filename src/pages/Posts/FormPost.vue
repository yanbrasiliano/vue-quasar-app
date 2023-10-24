<script setup>
import { defineComponent, ref, onMounted } from 'vue';
import { usePostOperations } from 'src/composables/usePostOperations.js';
import { useRoute } from 'vue-router';




const { createOrUpdatePost, getPostById } = usePostOperations();
const route = useRoute();
const form = ref({
  title: '',
  description: '',
  author: ''
});

onMounted(async () => {
  if (route.params.id) {
    const post = await getPostById(route.params.id);
    form.value = post;
  }
});

const submitForm = () => {
  createOrUpdatePost(form.value);
};

defineComponent({
  name: 'FormPost'
});
</script>

<template>
  <q-page padding>
    <q-form @submit="submitForm">
      <q-input outlined :rules="[val => !!val || 'Title is required']" v-model="form.title" label="Title" />
      <q-input outlined :rules="[val => !!val || 'Author is required']" v-model="form.author" label="Author" />
      <q-input outlined :rules="[val => !!val || 'description is required']" v-model="form.description"
        label="Description" />

      <div class="col-12 q-my-lg float-right q-gutter-sm  ">
        <q-btn color="primary" type="submit" label="Submit" icon="save" />
        <q-btn :to="{ name: 'home' }" color="red" type="submit" label="Cancel" icon="cancel" />
      </div>
    </q-form>
  </q-page>
</template>
