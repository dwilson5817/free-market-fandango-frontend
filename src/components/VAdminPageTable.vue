<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">{{ sentenceCase(keyName) }}</th>
        <th v-for="value in valueNames" scope="col">{{ sentenceCase(value) }}</th>
        <th>Actions</th>
      </tr>
    </thead>
    <Transition name="slide" mode="out-in">
      <tbody v-if="loading">
        <tr>
          <th class="align-content-center text-center py-4" :colspan="valueNames.length + 2">Loading...</th>
        </tr>
      </tbody>
      <tbody v-else-if="Object.keys(table).length === 0">
        <tr>
          <th class="align-content-center text-center py-4" :colspan="valueNames.length + 2">No {{ name }}s have been created yet!</th>
        </tr>
      </tbody>
      <TransitionGroup v-else name="slide" tag="tbody">
        <tr v-for="key in Object.keys(table)" :key="key">
          <th class="align-middle" scope="row"><span class="badge text-bg-primary font-monospace">{{ key }}</span></th>
          <td v-for="val in valueNames" class="align-middle">
            <span v-if="Array.isArray(table[key][val])">
              <span v-if="table[key][val].length === 0" class="badge rounded-pill text-bg-danger me-1">None</span>
              <span v-for="value in table[key][val]" class="badge rounded-pill text-bg-warning me-1">{{ value }}</span>
            </span>
            <span v-else>
              {{ table[key][val] }}
            </span>
          </td>
          <td>
            <transition name="fade" mode="out-in">
              <button v-if="table[key]['deleting']"  class="btn btn-outline-secondary" type="submit" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Deleting...
              </button>
                <button v-else @click.prevent="$emit('delete', key)" class="btn btn-outline-danger" :disabled="table[key]['deleting']">
                Delete
              </button>
            </transition>
          </td>
        </tr>
      </TransitionGroup>
    </Transition>
    <tfoot>
      <tr>
        <th class="align-middle" scope="row">
          <input v-model="newRow[keyName]" :placeholder="sentenceCase(keyName)" :aria-label="sentenceCase(keyName)" class="form-control" :disabled="creating">
        </th>
        <th v-for="valueName in valueNames" class="align-middle" scope="row">
          <input v-model="newRow[valueName]" :placeholder="sentenceCase(valueName)" :aria-label="sentenceCase(valueName)" class="form-control" :disabled="creating">
        </th>
        <td>
          <transition name="fade" mode="out-in">
            <button v-if="creating" class="btn btn-outline-secondary" type="submit" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Creating...
            </button>
              <button v-else @click.prevent="$emit('create', newRow)" class="btn btn-outline-success" type="submit" :disabled="creating">
              Create
            </button>
          </transition>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: "VAdminPageTable",
  props: [
      'name',
      'keyName',
      'valueNames',
      'table',
      'creating',
      'clearInput',
      'loading'
  ],
  methods: {
    sentenceCase(input) {
      const result = input.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
    }
  },
  watch: {
    clearInput: function () {
      if (this.clearInput) {
        for (const key in this.newRow)
          this.newRow[key] = '';
        this.$emit('cleared');
      }
    }
  },
  data() {
    return {
      newRow: {}
    }
  }
}
</script>

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