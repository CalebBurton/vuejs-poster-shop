new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            // { id: 1, title: 'item 1', price: 9.99},
            // { id: 2, title: 'item 2', price: 9.98},
            // { id: 3, title: 'item 3', price: 9.97},
        ],
        cart: [],
        new_search: 'poster',
        last_search: '',
        loading: false
    },
    methods: {
        addItem: function(index) {
            let item = this.items[index];
            this.total += item.price;
            let found = false;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    found = true;
                    this.cart[i].qty++;
                    break;
                }
            }
            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    qty: 1
                });
            }
        },
        onSubmit: function() {
            this.items = [];
            this.loading = true;
            this.$http
            .get(`/search/${this.new_search}`)
            .then(function({data}){
                this.items = data;
                this.items.map(item => {
                    item.price = (Math.random()*10) + (Math.random()*10);
                    return item;
                })
                this.last_search = this.new_search;
                this.loading = false;
            });
        },
        inc: function(item) {
            item.qty++;
            this.total += item.price;
        },
        dec: function(item) {
            item.qty--;
            this.total -= item.price;
            if (item.qty <= 0) {
                for (let i = 0; i < this.cart.length; i++){
                    if (this.cart[i].id === item.id) {
                        this.cart.splice(i, 1);
                        break;
                    }
                }
            }
        }
    },
    filters: {
        currency: function(price) {
            return `$${price.toFixed(2)}`;
        }
    },
    mounted: function() {
        this.onSubmit();
    }
});