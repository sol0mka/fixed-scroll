// Generated by CoffeeScript 1.6.2
(function() {
  var fixedScroll;

  fixedScroll = (function() {
    function fixedScroll() {
      this.$containers = $('.container-l');
      this.$bh = $('body');
      this.$w = $(window);
      this.elemI = 0;
      this.allowScroll = true;
      this.lastScrollTop = 0;
      this.listenToScroll();
    }

    fixedScroll.prototype.listenToScroll = function() {
      var newScroll;

      newScroll = $.throttle(500, this.scroll);
      return this.$w.on('scroll', $.proxy(newScroll, this));
    };

    fixedScroll.prototype.scroll = function() {
      var st;

      if (!this.allowScroll) {
        return;
      }
      st = this.$bh.scrollTop();
      if (st > this.lastScrollTop) {
        this.scrollDown();
      } else {
        this.scrollUp();
      }
      this.lastScrollTop = st;
      return false;
    };

    fixedScroll.prototype.scrollDown = function() {
      if (this.$bh.scrollTop() > this.$containers.eq(this.elemI).position().top) {
        this.elemI++;
        this.elemI > this.$containers.length - 1 && (this.elemI = this.$containers.length - 1);
        return this.scrollTo(this.$containers.eq(this.elemI).position().top);
      }
    };

    fixedScroll.prototype.scrollUp = function() {
      if (this.$bh.scrollTop() < this.$containers.eq(this.elemI).position().top) {
        this.elemI--;
        this.elemI < 0 && (this.elemI = 0);
        return this.scrollTo(this.$containers.eq(this.elemI).position().top);
      }
    };

    fixedScroll.prototype.scrollTo = function(position) {
      var _this = this;

      this.allowScroll = false;
      $('body').css({
        'overflow': 'hidden'
      });
      return this.$bh.stop().animate({
        'scrollTop': position
      }, 400, function() {
        return setTimeout(function() {
          $('body').css({
            'overflow': 'auto'
          });
          return _this.allowScroll = true;
        }, 200);
      });
    };

    return fixedScroll;

  })();

  new fixedScroll;

}).call(this);
