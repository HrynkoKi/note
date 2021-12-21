const App = {
  data() {
    return {
      input: {
        value: '',
        placeholder: 'Type your note'
      },
      notes: []
    }
  },
  watch: {
    notes: {
      handler(updatedList) {
        localStorage.setItem('notes', JSON.stringify(updatedList));
      },
      deep: true
    }
  },
  methods: {
    getNotes() {
      const localList = JSON.parse(localStorage.getItem('notes'));

      if (localList) this.notes = localList;
    },
    onSubmit() {
      this.notes.push({
        id: this.notes.length,
        desc: this.input.value,
        edit: false
      });

      this.input.value = '';
    },
    remove(index) {
      this.notes.splice(index, 1);
    },
    editText(id) {
      this.notes.find(note => {
        if (note.id === id && !note.edit) {
          note.edit = true;
        } else {
          note.edit = false;
        }
      });
    }
  },
  mounted() {
    this.getNotes();
  }
};

Vue.createApp(App).mount('#app');