import { ref } from 'vue';
import { read, del, create, readById, update } from 'src/services/postService.js';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export function usePostOperations() {
  const posts = ref([]);
  const $q = useQuasar();
  const router = useRouter();


  const getPosts = async () => {
    posts.value = await read();
  }

  const getPostById = async (id) => {
    return await readById(id);
  }

  const editPost = async (id) => {

    router.push({ name: 'formPost', params: { id: id } })

  }


  const createOrUpdatePost = async (form) => {
    try {

      if (form.id) {
        await update(form.id, form);
        $q.notify({
          color: 'positive',
          message: 'Post updated successfully',
          position: 'top',
          timeout: 1000,
          actions: [{ icon: 'close', color: 'white' }]
        });
        router.push({ name: 'home' });
        return;
      }

      await create(form);
      $q.notify({
        color: 'positive',
        message: 'Post created successfully',
        position: 'top',
        timeout: 1000,
        actions: [{ icon: 'close', color: 'white' }]
      });
      router.push({ name: 'home' });

    } catch (error) {
      $q.notify({
        color: 'negative',
        message: 'Error creating post',
        position: 'top',
        timeout: 1000,
        actions: [{ icon: 'close', color: 'white' }]
      });
      console.log(error);
    }
  }

  const deletePost = async (id) => {
    try {
      $q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this post?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await del(id);
        $q.notify({
          color: 'positive',
          message: 'Post deleted successfully',
          position: 'top',
          timeout: 1000,
          actions: [{ icon: 'close', color: 'white' }]
        });
        getPosts();
      })

    } catch (error) {
      $q.notify({
        color: 'negative',
        message: 'Error deleting post',
        position: 'top',
        timeout: 1000,
        actions: [{ icon: 'close', color: 'white' }]
      });
      console.log(error);
    }
  }

  return { posts, getPosts, deletePost, createOrUpdatePost, editPost, getPostById };
}
