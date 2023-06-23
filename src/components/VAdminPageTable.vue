<script setup>
import {Button, Input} from "flowbite-vue";
import {ref, watch} from "vue";

const emit = defineEmits(['create', 'delete', 'cleared'])

const props = defineProps([
    'keyName',
    'shape',
    'data',
    'clearInput',
    'creating',
    'loading'
])

const newRow = ref({});

watch(() => props.clearInput, async (oldValue, newValue) => {
  if (props.clearInput) {
    for (const key in newRow.value) newRow.value[key] = '';

    emit('cleared');
  }
})

function sentenceCase(input) {
  return input.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())
}
</script>

<template>
  <div class="max-w-screen-xl mx-auto">
    <div class="w-full p-6 pb-0">
      <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <slot name="header"></slot>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th v-for="(key, value) in shape" :key="key" class="px-6 py-3" scope="col">
                {{ sentenceCase(value) }}
              </th>
              <th class="px-6 py-3" scope="col">
                Actions
              </th>
            </tr>
            </thead>
            <tbody v-if="loading">
            <tr class="bg-white dark:bg-gray-900 dark:border-gray-700">
              <th :colspan="Object.keys(shape).length + 1" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  scope="row">
                Loading...
              </th>
            </tr>
            </tbody>
            <tbody v-else-if="Object.keys(data).length === 0">
            <tr class="bg-white dark:bg-gray-900 dark:border-gray-700">
              <th :colspan="Object.keys(shape).length + 1" class="px-6 py-4 text-lg font-semibold text-gray-900 whitespace-nowrap dark:text-white text-center" scope="row">
                <slot name="none"></slot>
              </th>
            </tr>
            </tbody>
            <TransitionGroup v-else name="slide" tag="tbody">
              <tr v-for="row in data" :key="row[keyName]" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td v-for="(shape_name, shape_key) in shape" class="px-6 py-4">
                          <span v-for="value in row[shape_key]" v-if="Array.isArray(row[shape_key])"
                                class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                            {{ value.hasOwnProperty('value') ? value.value : value.tag.name }}
                          </span>
                  <span v-else>
                            {{ row[shape_key] }}
                          </span>
                </td>
                <td class="px-6 py-4">
                  <slot name="actions" :row="row"></slot>
                </td>
              </tr>
            </TransitionGroup>
            <tfoot>
            <tr class="bg-white dark:bg-gray-900 dark:border-gray-700">
              <td v-for="(shape_name, shape_key) in shape" :key="shape_key" class="px-6 py-4">
                <Input v-model="newRow[shape_key]" :disabled="creating" :placeholder="sentenceCase(shape_name)"/>
              </td>
              <td class="px-6 py-4">
                <transition
                    mode="out-in"
                    name="fade"
                >
                  <Button v-if="creating" color="green" disabled loading>
                    Creating...
                  </Button>
                  <Button v-else :disabled="creating" color="green" @click.prevent="$emit('create', newRow)">
                    Create
                  </Button>
                </transition>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>