let Imgur = {
    fetch: function(num) {
        let self = this;

        self.total = num;
        self.done = 0;
        self.failures = 0;
        self.start = +new Date;

        document.getElementById('images').innerHTML = '';

        for (let x = 0; x < num; x++) {
            self.hunt(function(id) {
                self.done++;

                const li = document.createElement('li');

                li.innerHTML = `<li><a href="https://imgur.com/${id}"><img src="https://i.imgur.com/${id}s.png" height="48" width="48" loading="eager"></a></li>`;

                document.getElementById('images').appendChild(li);

                self.update();
            });
        }
    },
    update: function() {
        let interval = new Date - this.start;

        function speed(v) {
            return (~~(v / interval * 1e5)) / 100;
        }
        document.getElementById('info').innerHTML = (this.done < this.total ? "Loading.. " + this.done + "/" + this.total + " (" + this.failures + " failures" + ") " : "Done. ") + "[" + speed(this.failures + this.done) + " req/s - " + speed(this.done) + " img/s]";
    },

    hunt: function(cb) {
        let self = this,
            id = self.random(5),
            img = new Image;
        self.update();
        img.src = "https://imgur.com/" + id + "s.png";
        img.onload = function() {
            if (img.width == 161 && img.height == 81) {
                // assume this is an imgur error image, and retry.
                fail();
            } else {
                cb(id);
            }
        }
        img.onerror = fail; // no escape.
        function fail() {
            self.failures++;
            self.update();
            self.hunt(cb);
        }
    },

    random: function(len) {
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        return len ? chars.charAt(~~(Math.random() * chars.length)) + this.random(len - 1) : "";
    }
};

document.getElementById('random').addEventListener('click', function(e) {
    Imgur.fetch(50);
});