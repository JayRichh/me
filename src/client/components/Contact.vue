<template>
  <div class="vue-component scene-item contact-card">
    <h1>Contact Me</h1>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="name" placeholder="Your Name" required />
      <input type="email" v-model="email" placeholder="Your Email" required />
      <textarea v-model="message" placeholder="Your Message" required></textarea>
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'ContactComponent',
  setup() {
    const name = ref('');
    const email = ref('');
    const message = ref('');

    const isFormValid = computed(() => {
      return name.value && email.value && message.value;
    });

    const submitForm = () => {
      if (isFormValid.value) {
        console.log(`Name: ${name.value}, Email: ${email.value}, Message: ${message.value}`);
      }
    };

    return {
      name,
      email,
      message,
      submitForm,
    };
  },
});
</script>

<style scoped>
.contact-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 16px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}
</style>
