/*
 *  jQuery Typewrite - v0.1.0
 *  Type character by character the content of an HTML element.
 *  http://github.com/MathieuLoutre/jquery-typewrite/
 *
 *  Made by Mathieu Triay
 *  Under MIT License
 */
(function() {
  (function($) {
    $.fn.typewrite = function(settings, callback) {
      var options, tag, tags, type;
      if (settings == null) {
        settings = {};
      }
      options = {
        delay: 60,
        placeholder: '¶'
      };
      if (typeof settings === "function") {
        callback = settings;
      } else {
        $.extend(options, settings);
      }
      type = (function(_this) {
        return function() {
          var char, recursive, _base, _ref;
          if (((_ref = _this.data('content')) != null ? _ref.length : void 0) > 0) {
            char = _this.data('content')[0];
            recursive = false;
            if (char === options.placeholder) {
              char = _this.data('tags').shift();
              _this.data('tags', _this.data('tags'));
              recursive = true;
            }
            _this.data('content', _this.data('content').substr(1));
            _this.html(_this.html() + char);
            if (recursive) {
              return _this.children().last().typewrite(options, function() {
                return _this.data('timer', setTimeout(type, options.delay));
              });
            } else {
              return _this.data('timer', setTimeout(type, options.delay));
            }
          } else {
            clearTimeout(_this.data('timer'));
            if (typeof (_base = _this.data('callback')) === "function") {
              _base();
            }
            return _this.removeData(['content', 'timer', 'callback', 'tags']);
          }
        };
      })(this);
      this.data('callback', callback);
      tags = this.children().replaceWith(options.placeholder);
      tags = (function() {
        var _i, _len, _ref, _results;
        _ref = tags.get();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tag = _ref[_i];
          _results.push(tag.outerHTML);
        }
        return _results;
      })();
      this.data('tags', tags);
      this.data('content', $.trim(this.html()));
      this.html("");
      this.data('timer', setTimeout(type, options.delay));
      return this;
    };
    return $.fn.stopTypewrite = function(options) {
      var child, content, el, _base, _i, _j, _len, _len1, _ref, _ref1;
      if (options == null) {
        options = {};
      }
      if (options.placeholder == null) {
        options.placeholder = '¶';
      }
      clearTimeout(this.data('timer'));
      content = this.data('content');
      if (this.data('tags')) {
        _ref = this.data('tags');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          content = content.replace(options.placeholder, el);
        }
      }
      _ref1 = this.children();
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        child = _ref1[_j];
        if ($(child).data('content')) {
          $(child).stopTypewrite();
        }
      }
      this.html(this.html() + content);
      if (typeof (_base = this.data('callback')) === "function") {
        _base();
      }
      this.removeData(['content', 'timer', 'callback', 'tags']);
      return this;
    };
  })($);

}).call(this);
