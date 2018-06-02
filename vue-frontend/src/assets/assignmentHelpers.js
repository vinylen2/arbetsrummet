import moment from 'moment';
moment.locale('sv');

export default {
  data() {
    return {
      assignment: '',
    };
  },
  computed: {
    hasGrade() {
      return (( _.has(this.assignment, 'grades') && this.assignment.grades.length > 0 ) ? this.assignment.grades[0] : null);
    },
    hasSubject() {
      return (( _.has(this.assignment, 'subjects') && this.assignment.subjects.length > 0 ) ? this.assignment.subjects[0] : null);
    },
    color() {
      if (this.hasSubject) {
        return this.assignment.subjects[0].color;
      }
      return 'grey';
    },
    author() {
      const author = (( _.has(this.assignment, 'authors') && this.assignment.authors.length > 0 ) ? this.assignment.authors[0] : null);
      if (author) {
        return author.fullName;
      }
      return 'Ingen författare';
    },
    hasColor() {
      if (this.hasSubject) {
        return this.assignment.subjects[0].color;
      }
      return 'grey';
    },
  },
  methods: {
    date(dateObject) {
      return moment(dateObject).format('D MMM YYYY');
    },
  },
}
