new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            { title: 'item 1'},
            { title: 'item 2'},
            { title: 'item 3'},
        ]
    },
    methods: {
        addItem: function() {
            this.total += 9.99;
        }
    }
});